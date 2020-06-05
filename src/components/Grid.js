import React, { Component } from 'react';
import Card from './Card';
import { chunk } from '../utils';

class Grid extends Component {
  render() {
    const { list, onToggle } = this.props;
    console.log('list', list);

    return (
      <div className="Grid">
        {/* split the list into lists with 8 elements each for better view */}
        {chunk(list, 8).map((l, index) => {
          return (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {l.map((card) => (
                <Card key={card.id} card={card} onToggle={onToggle}></Card>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
