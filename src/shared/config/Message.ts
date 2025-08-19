export type Message = {
  id: string;
  type: "user" | "ai" | "transaction";
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  transaction?: {
    transactionId: string;
    amount: number;
    recipient: string;
    status: "pending" | "processing" | "success" | "failed";
  };
};
