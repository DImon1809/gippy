import type { Blockchain } from "@/entities/BlockChainCards/lib/types";
import { Card } from "@/entities/BlockChainCards/ui/Card";

import styles from "./style.module.scss";

const defaultBlockchains: Blockchain[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "⟠",
    coins: [
      {
        id: "eth",
        name: "Ethereum",
        symbol: "ETH",
        avatar: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        address: "0x742d35Cc6634C0532925a3b8D4C0d4E5C8F8F8F8",
        balance: "2.45 ETH",
        usdValue: "$4,321.50",
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        avatar: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
        address: "0x742d35Cc6634C0532925a3b8D4C0d4E5C8F8F8F8",
        balance: "1,250.00 USDC",
        usdValue: "$1,250.00",
      },
      {
        id: "uni",
        name: "Uniswap",
        symbol: "UNI",
        avatar: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
        address: "0x742d35Cc6634C0532925a3b8D4C0d4E5C8F8F8F8",
        balance: "45.67 UNI",
        usdValue: "$312.89",
      },
      {
        id: "link",
        name: "Chainlink",
        symbol: "LINK",
        avatar: "https://cryptologos.cc/logos/chainlink-link-logo.png",
        address: "0x742d35Cc6634C0532925a3b8D4C0d4E5C8F8F8F8",
        balance: "123.45 LINK",
        usdValue: "$1,847.62",
      },
      {
        id: "aave",
        name: "Aave",
        symbol: "AAVE",
        avatar: "https://cryptologos.cc/logos/aave-aave-logo.png",
        address: "0x742d35Cc6634C0532925a3b8D4C0d4E5C8F8F8F8",
        balance: "8.92 AAVE",
        usdValue: "$678.43",
      },
    ],
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "₿",
    coins: [
      {
        id: "btc",
        name: "Bitcoin",
        symbol: "BTC",
        avatar: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        balance: "0.15 BTC",
        usdValue: "$6,450.00",
      },
      {
        id: "ltc",
        name: "Litecoin",
        symbol: "LTC",
        avatar: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
        address: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        balance: "5.67 LTC",
        usdValue: "$386.12",
      },
      {
        id: "bch",
        name: "Bitcoin Cash",
        symbol: "BCH",
        avatar: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
        address: "bitcoincash:qxy2kgdygjrsqtzq2n0yrf2493p83kkf",
        balance: "2.34 BCH",
        usdValue: "$504.87",
      },
      {
        id: "doge",
        name: "Dogecoin",
        symbol: "DOGE",
        avatar: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
        address: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
        balance: "1,500.00 DOGE",
        usdValue: "$118.50",
      },
      {
        id: "xrp",
        name: "XRP",
        symbol: "XRP",
        avatar: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
        address: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
        balance: "750.25 XRP",
        usdValue: "$412.64",
      },
    ],
  },
  {
    id: "solana",
    name: "Solana",
    icon: "◎",
    coins: [
      {
        id: "sol",
        name: "Solana",
        symbol: "SOL",
        avatar: "https://cryptologos.cc/logos/solana-sol-logo.png",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: "12.34 SOL",
        usdValue: "$1,234.56",
      },
      {
        id: "ray",
        name: "Raydium",
        symbol: "RAY",
        avatar: "https://cryptologos.cc/logos/raydium-ray-logo.png",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: "89.12 RAY",
        usdValue: "$167.45",
      },
      {
        id: "srm",
        name: "Serum",
        symbol: "SRM",
        avatar: "https://cryptologos.cc/logos/serum-srm-logo.png",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: "156.78 SRM",
        usdValue: "$89.32",
      },
      {
        id: "ftt",
        name: "FTX Token",
        symbol: "FTT",
        avatar: "https://cryptologos.cc/logos/ftx-token-ftt-logo.png",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: "23.45 FTT",
        usdValue: "$56.78",
      },
      {
        id: "mango",
        name: "Mango",
        symbol: "MNGO",
        avatar: "https://cryptologos.cc/logos/mango-mngo-logo.png",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: "567.89 MNGO",
        usdValue: "$34.67",
      },
    ],
  },
];

export const BlockChainCards = () => {
  return (
    <section className={styles.cards__wrapper}>
      {defaultBlockchains.map((blockChain, index) => (
        <Card blockChain={blockChain} key={index} />
      ))}
    </section>
  );
};
