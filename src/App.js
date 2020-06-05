import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer';
import Grid from './components/Grid';
import ScoreBoard from './components/ScoreBoard';

import { shuffle } from './utils';

class App extends Component {
  /* This values are not stored in state because they do not affect rendering */

  id = 1; //TODO: add id property for list's key property

  // number of same cards in a deck
  same_cards = 2;
  // type of cards
  pool = '0123456789ABCDEF'.split('');
  // cards that are flipped (but not correct, yet)
  opened_cards = [];

  checkflag = false;

  state = {
    score: 0, // number of correct answers
    cards: [], // list of cards
  };

  initGame = () => {
    let cards = [];
    for (var i = 0; i < this.same_cards; i++) {
      cards = cards.concat(
        shuffle(this.pool).map((val) => {
          return {
            id: this.id++,
            value: val,
            flip: false,
          };
        })
      );
    }

    this.setState({
      score: 0,
      cards: cards,
    });
  };

  //TODO: implement me
  handleToggle = (select) => {
    const { cards } = this.state;
    if (this.checkflag) {
      this.setState({
        cards: cards.map((card) =>
          card.id === select.id ? { ...card, flip: false } : card
        ),
      });
    } else {
      this.setState({
        cards: cards.map((card) =>
          card.id === select.id ? { ...card, flip: true } : card
        ),
      });
      if (this.opened_cards.length === 0) {
        this.opened_cards.push({ id: select.id, value: select.value });
      } else {
        this.tempOpen(select.id, select.value);
      }
    }
  };

  //open upto same_cards to see if user's choice is correct or not
  tempOpen = async (id, value) => {
    this.checkflag = true;
    this.opened_cards.push({ id: id, value: value });

    // opened a wrong card :
    // since every card in opened_cards should have same value,
    // if the first card value !== last(just opened) value,
    // it means that the last card was wrong choice.
    console.log(
      this.opened_cards[0].value,
      this.opened_cards.slice(-1)[0].value
    );
    if (this.opened_cards[0].value !== this.opened_cards.slice(-1)[0].value) {
      await new Promise((r) => setTimeout(r, 700)); // show card briefly
      for (var x of this.opened_cards) {
        this.handleToggle(x); // return the temporary open cards to hidden position
      }
      //reset the open cards
      this.opened_cards = [];
      this.checkflag = false;
    } else if (this.opened_cards.length === this.same_cards) {
      // if we have chosen all the cards with certain value
      this.setState({
        score: this.state.score + this.opened_cards.length,
      });
      this.opened_cards = [];
      this.checkflag = false;
    }
  };

  render() {
    const { cards, score } = this.state;
    // the game is finished if score equals the number of cards
    const done = score === cards.length;
    console.log('done', done);
    return (
      <div className="App">
        <h3>Memory Game</h3>
        <Grid list={cards} onToggle={this.handleToggle} />{' '}
        {/* TODO: look at Grid.js to see which props to pass */}
        <ScoreBoard score={score} />{' '}
        {/* TODO: what should be passed to scoreBoard? */}
        <Timer running={!done} />
        {done && <button onClick={this.initGame}> Start </button>}
      </div>
    );
  }
}

export default App;
