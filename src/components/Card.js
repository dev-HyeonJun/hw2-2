import React, { Component } from 'react';
import './Card.css';
class Card extends Component {
  handleClick = (e) => {
    const { card, onToggle } = this.props;
    onToggle(card);
  };
  render() {
    //TODO: implement me
    const { card } = this.props;
    return (
      <div className="Card" onClick={this.handleClick}>
        {card.flip ? card.value : '?'}
      </div>
    );
  }
}
export default Card;
