import type { Address } from "viem";

export type SiweMessage = {
  domain: string;
  address: Address;
  statement: string;
  uri: string;
  version: "1";
  chainId: bigint;
  nonce: string;
  issuedAt: string;
  expirationTime: string;
  notBefore: string;
  requestId: string;
  resources: readonly string[];
};
