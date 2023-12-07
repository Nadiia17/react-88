import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Quizlist } from './Quizlist/Quizlist';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';
import { Layout } from './Layout';
import { createQuiz, deleteQuizById, fetchQuizzes } from './api';

export class App extends Component {
  state = {
    quizItems: [],
    loading: false,
    error: false,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  async componentDidMount() {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      this.setState({
        filters: JSON.parse(savedFilters),
      });
    }

    try {
      this.setState({ loading: true, error: false });
      const quizzes = await fetchQuizzes();
      toast.success('We found quizzes');
      this.setState({ quizItems: quizzes });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
    }
  }

  deleteQuizItem = async quizId => {
    try {
      this.setState({ loading: true, error: false });
      const deletedQuiz = await deleteQuizById(quizId);
      this.setState(prevState => ({
        quizItems: prevState.quizItems.filter(
          quiz => quiz.id !== deletedQuiz.id
        ),
      }));
      toast.success('Quiz deleted!');
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  changeFilter = (key, value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }));
  };

  resetFilters = () => {
    this.setState({
      filters: {
        topic: '',
        level: 'all',
      },
    });
  };

  getVisibleItems = () => {
    const { quizItems, filters } = this.state;

    return quizItems.filter(quiz => {
      const topicFilter = filters.topic.toLowerCase();
      const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);
      if (filters.level === 'all') {
        return hasTopic;
      }
      return hasTopic && quiz.level === filters.level;
    });
  };

  // changeTopicFilter = newTopic => {
  //   this.setState(prevState => ({
  //     filters: {
  //       ...prevState.filters,
  //       topic: newTopic,
  //     },
  //   }));
  // };

  // changeLevelFilter = newLevel => {
  //   this.setState(prevState => ({
  //     filters: {
  //       ...prevState.filters,
  //       level: newLevel,
  //     },
  //   }));
  // };

  addQuiz = async newQuiz => {
    try {
      this.setState({ loading: true, error: false });
      const quiz = await createQuiz(newQuiz);
      this.setState(prevState => ({
        quizItems: [...prevState.quizItems, quiz],
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, filters, error } = this.state;

    const visibleItems = this.getVisibleItems();

    return (
      <Layout>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          filters={filters}
          // onChangeTopic={this.changeTopicFilter}
          // onChangeLevel={this.changeLevelFilter}
          onchangeFilter={this.changeFilter}
          onResetFilter={this.resetFilters}
        />

        {loading && <b>Loading quiz items ...</b>}
        {error && <b>Something went wrong. Try reload the page...</b>}
        {visibleItems.length > 0 && (
          <Quizlist items={visibleItems} onDelete={this.deleteQuizItem} />
        )}
        <Toaster position="top-right" />
      </Layout>
    );
  }
}
