export type Message = {
  id: number;
  role: "user" | "assistant" | "transaction";
  content: string;
  sent_at: Date;
  isVoice?: boolean;
  isHidden?: boolean;
  transaction?: {
    transactionId?: string;
    amount?: number;
    recipient?: string;
    status: "approve" | "pending" | "processing" | "success" | "failed";
  };
};
