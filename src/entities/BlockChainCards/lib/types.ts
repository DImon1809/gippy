export type Coin = {
  id: string;
  name: string;
  symbol: string;
  avatar: string;
  address: string;
  balance: string;
  usdValue?: string;
};

export type Blockchain = {
  id: string;
  name: string;
  icon: string;
  coins: Coin[];
};
