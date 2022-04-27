import { useState, useEffect } from 'react';
import { shuffle, ICard } from './utils/shuffle';
import { Card } from './components/Card';



const App = () => {
  const [cards, setCards] = useState(shuffle);
  const [firstPick, setFirstPick] = useState<ICard | null>(null);
  const [secondPick, setSecondPick] = useState<ICard | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [wins] = useState(0);

  //handle card selection and check for a match
  const handleClick = (card: ICard) => {
    if (!disabled) {
      firstPick ? setSecondPick(card) : setFirstPick(card);
    }
  }

  // reset state when turn ends
  const handleTurn = () => {
    setFirstPick(null)
    setSecondPick(null)
  }
  
  // Used for selection and matching
  useEffect(() => {
    let pickTimer: NodeJS.Timeout
    
    if (firstPick && secondPick) {
      if (firstPick.image === secondPick.image) {
        setCards(prevState => prevState
          .map(card => {
            if (card.image === firstPick.image) {
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
        setDisabled(false)
      }
    } 
    return (() => {
      clearTimeout(pickTimer)
    })
  }, [cards, firstPick, secondPick])

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
              selected={card === firstPick || card === secondPick || matched}
              onClick={() => handleClick(card)}
            />
          )
        })}
      </div>
    </>
  );
}

export default App;
