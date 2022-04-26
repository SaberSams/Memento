import React from 'react';
import shuffle from './utils/shuffle';
import { Card } from './components/Card';

function App() {
  const [cards, setCards] = React.useState(shuffle);

  return (
    <div className='grid'>
      {cards.map((card) => {
        const { image, id } = card;

        return (
          <Card
            key={id}
            image={image}
            selected={false}
            onClick={() => {}}
          />
        )
      })}
    </div>
  );
}

export default App;
