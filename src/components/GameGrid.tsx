type Props = {
  rows: number;
  cols:number;
  children?: React.ReactNode[] | React.ReactNode;
};

export const GameGrid: React.FC<Props> = ({rows, cols, children}) => {
  return (
  <div className={`grid m-3 gap-2 grid-cols-${rows} md:grid-cols-${cols} md:m-12`}>
    {children}
  </div>)
}