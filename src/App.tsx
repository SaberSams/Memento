import { useState, useEffect } from 'react';
import { shuffle, ICard } from './utils/shuffle';
import { Card } from './components/Card';



const App = () => {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState<ICard | null>(null);
  const [pickTwo, setPickTwo] = useState<ICard | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);

  //handle card selection and check for a match
  const handleClick = (card: ICard) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  }

  // reset state when turn ends
  const handleTurn = () => {
    setPickOne(null)
    setPickTwo(null)
    setDisabled(false)
  }

  // Used for selection and matching
  useEffect(() => {
    let pickTimer: NodeJS.Timeout

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards(prevState => prevState
          .map(card => {
            if (card.image === pickOne.image) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        )
      } else {
        setDisabled(true)
        pickTimer = setTimeout(() => {
          handleTurn()
        }, 1000)
      }
    } 

    return (() => {
      clearTimeout(pickTimer)
    })
  }, [cards, pickOne, pickTwo])

  return (
    <>
      <h3>Wins: {wins} </h3>
      <div className='grid'>
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          )
        })}
      </div>
    </>
  );
}

export default App;
