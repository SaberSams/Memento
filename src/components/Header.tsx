export const Header = ({ wins, score, reset }: { wins: number, score: number, reset: any }) => {
  return (
    <div className={"header"}>
      <h4> Wins: {wins} </h4>
      <h4> Score: {score} </h4>
      <button onClick={reset}> <h4>New Game</h4> </button>
    </div>
  )
}
