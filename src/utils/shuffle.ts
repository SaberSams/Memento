export interface ICard {
  id: number;
  image: string;
  matched: boolean;
}

export const shuffle = ([rows, cols]: [
  rows: number,
  colums: number
]): ICard[] => {
  const assets = [
    { image: "/assets/btc.png" },
    { image: "/assets/eth.png" },
    { image: "/assets/link.png" },
    { image: "/assets/doge.png" },
    { image: "/assets/ada.png" },
    { image: "/assets/avax.png" },
    { image: "/assets/xrp.png" },
    { image: "/assets/sol.png" },
  ];

  let amount = rows * cols;

  return [...assets.slice(0,amount/2), ...assets.slice(0,amount/2)]
    .sort(() => 0.5 - Math.random())
    .map((card) => ({
      ...card,
      id: Math.random(),
      matched: false,
    }));
};
