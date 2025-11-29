export type Transaction = {
  to: string;
  from: string | null;
  value: string | null;
  data: string | null;
  gas: string | number | null;
  chainId: number | string | null;
  nonce: number | string | null;
  gasPrice: string | number | null;
};

export type ResponseSendMessage = {
  response: string;
  session_id: string;
  status: string;
  timestamp: string;
  tokenAddress: string | null;
  transaction: Transaction | null;
};
