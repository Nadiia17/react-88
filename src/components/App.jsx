import { Component } from 'react';
import { Quizlist } from './Quizlist/Quizlist';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
  };
  render() {
    return (
      <div>
        <SearchBar />
        <Quizlist items={this.state.quizItems} />
      </div>
    );
  }
}
