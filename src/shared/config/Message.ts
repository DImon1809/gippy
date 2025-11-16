export type Message = {
  id: number;
  role: "user" | "assistant" | "transaction";
  content: string;
  sent_at: Date;
  isVoice?: boolean;
  transaction?: {
    transactionId?: string;
    amount?: number;
    recipient?: string;
    status: "pending" | "processing" | "success" | "failed";
  };
};
