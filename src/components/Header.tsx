export const Header = ({ wins, reset }: { wins: number, reset: any }) => {
  return (
    <div className={"header"}>
      <h4> Wins: {wins} </h4>
      <div></div>
      <button onClick={reset}> <h4>New Game</h4> </button>
    </div>
  )
}
