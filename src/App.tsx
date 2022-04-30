import { useState, useEffect } from 'react';
import { shuffle, ICard } from './utils/shuffle';
import { Card } from './components/Card';
import { Header } from './components/Header';

const levels:Array<[number, number]> = [
  [2,2],
  [3,4],
  [4,4],
  [4,5],
]


const App: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState(shuffle(levels[level]));
  const [picks, setPicks] = useState<ICard[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(100);
  const [wins, setWins] = useState(0);

  //handle card selection and check for a match
  const handleClick = (card: ICard) => {
    if (disabled) return;
    // only 2 cards should be selected at a time
    if (picks.length >= 2) return;
    // if the user spam clicks they can sometimes get the same card twice, so we need to check for that
    if (picks.length === 1 && card.id === picks[0].id) return

    // update the picks array
    setPicks([...picks, card])
  }

  const reset = () => {
    setPicks([])
    setCards(shuffle(levels[level]))
    setDisabled(false)
  }

  // Used for selection and matching
  useEffect(() => {
    // only run if there are 2 cards selected
    if (picks.length < 2) return;
    
    let pickTimer: NodeJS.Timeout
    const [pickOne, pickTwo] = picks

    // if the cards match update the cards array
    if (pickOne.image === pickTwo.image) {
      setPicks([])
      setCards(prevState => prevState
        .map(card => {
          if (card.image === pickOne.image) {
            setScore(score => score + 20)
            return { ...card, matched: true }
          } else {
            return card;
          }
        })
      )
    } else {
      // disable the UI so the cards have time to flip back over
      setDisabled(true)
      pickTimer = setTimeout(() => {
        setScore(score => score - 10)
        setPicks([])
        setDisabled(false)
      }, 1000)
    }
    return (() => {
      clearTimeout(pickTimer)
    })
  }, [cards, picks, score])

  // check if the user beat the level
  useEffect(() => {
    let winTimer: NodeJS.Timeout
    // check if all cards have been matched
    if (cards.every(card => card.matched)) {
      const nextLevel = level >= 4 ?  4 : level + 1
      winTimer = setTimeout(() => {
      setDisabled(true)
      setLevel(level => level = nextLevel)
      setWins(wins => wins + 1)
      setPicks([])
      setDisabled(false);
      setCards(shuffle(levels[nextLevel]))
    }, 1000)
  }
  return (() => {
      clearTimeout(winTimer)
    })
  },[cards, level])

  //TODO: Extract the grid to its own component

  return (
    <>
      <Header wins={wins} score={score} reset={reset}></Header>
      <div className={`grid m-12 gap-2 grid-cols-${levels[level][0]}`}>
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === picks[0] || card === picks[1] || matched}
              onClick={() => handleClick(card)}
            />
          )
        })}
      </div>
    </>
  );
}

export default App;
