import { Component } from 'react';
import { Quizlist } from './Quizlist/Quizlist';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  deleteQuizItem = id => {
    this.setState(prevState => ({
      quizItems: prevState.quizItems.filter(quiz => quiz.id !== id),
    }));
  };

  changeFilter = (key, value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }));
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

  addQuiz = newQuiz => {
    console.log(newQuiz);
    this.setState(prevState => ({
      quizItems: [...prevState.quizItems, { ...newQuiz, id: nanoid() }],
      newQuiz,
    }));
  };

  render() {
    const { quizItems, filters } = this.state;

    const visibleItems = this.getVisibleItems();
    return (
      <div>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          filters={filters}
          // onChangeTopic={this.changeTopicFilter}
          // onChangeLevel={this.changeLevelFilter}
          onchangeFilter={this.changeFilter}
        />
        <Quizlist items={visibleItems} onDelete={this.deleteQuizItem} />
      </div>
    );
  }
}
