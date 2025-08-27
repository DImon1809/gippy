import React, { useMemo, useState } from "react";
import { ArrowDownUp, ArrowUpDown, Download } from "lucide-react";

import styles from "./style.module.scss";

const headers = ["Type", "Amount", "Token", "Network", "Status"];

const transactions = [
  {
    id: "tx_001",
    type: "Transfer",
    amount: 15,
    token: "USDT",
    network: "Ethereum",
    status: "success",
    timestamp: new Date(),
    fee: 0.003,
    hash: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    id: "tx_002",
    type: "Transfer",
    amount: 25.5,
    token: "USDT",
    network: "Polygon",
    status: "failed",
    timestamp: new Date(),
    fee: 0.001,
    hash: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
  {
    id: "tx_003",
    type: "Transfer",
    amount: 100,
    token: "USDT",
    network: "Tron",
    status: "success",
    timestamp: new Date(),
    fee: 0.5,
    hash: "0x567890abcdef1234567890abcdef1234567890ab",
  },
  {
    id: "tx_004",
    type: "Transfer",
    amount: 50.75,
    token: "USDT",
    network: "TON",
    status: "pending",
    timestamp: new Date(),
    fee: 0.1,
    hash: "0xdef1234567890abcdef1234567890abcdef12345",
  },
  {
    id: "tx_005",
    type: "Swap",
    amount: 120,
    token: "ETH",
    network: "Ethereum",
    status: "success",
    timestamp: new Date(),
    fee: 0.025,
    hash: "0x234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "tx_006",
    type: "Transfer",
    amount: 75.25,
    token: "BTC",
    network: "Bitcoin",
    status: "success",
    timestamp: new Date(),
    fee: 0.0002,
    hash: "0x789abc123def456789abc123def456789abc123d",
  },
  {
    id: "tx_007",
    type: "Swap",
    amount: 200,
    token: "BNB",
    network: "BSC",
    status: "failed",
    timestamp: new Date(),
    fee: 0.005,
    hash: "0xabc123def456789abc123def456789abc123def4",
  },
  {
    id: "tx_008",
    type: "Transfer",
    amount: 35.8,
    token: "ADA",
    network: "Cardano",
    status: "pending",
    timestamp: new Date(),
    fee: 0.17,
    hash: "0x456789abc123def456789abc123def456789abc1",
  },
];

type SortType = "min" | "max";

export const TransactionsTable = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);

  const hanldeSort = () => {
    if (!sortType) return setSortType("max");

    if (sortType === "max") return setSortType("min");

    setSortType("max");
  };

  const tableData = useMemo(() => {
    if (sortType === "max") return transactions.sort((left, right) => right.amount - left.amount);

    if (sortType === "min") return transactions.sort((left, right) => left.amount - right.amount);

    return transactions;
  }, [sortType, transactions]);

  return (
    <table className={styles.transactions__table}>
      <thead className={styles.table__head}>
        <tr>
          {headers.map((head, i) => (
            <td
              key={i}
              className={`${head === "Amount" && styles.amount__wrapper} ${
                head === "Status" && styles.status
              }`}
              onClick={hanldeSort}
            >
              {head}{" "}
              {head === "Amount" ? (
                <div>
                  {sortType === "min" ? <ArrowUpDown size={16} /> : <ArrowDownUp size={16} />}
                </div>
              ) : null}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {tableData.map((data, i) => (
          <tr key={i}>
            <td>{data.type}</td>
            <td>{data.amount}</td>
            <td>{data.token}</td>
            <td>{data.network}</td>
            <td>
              {data.status === "failed" ? (
                <div className={styles.failed}></div>
              ) : data.status === "success" ? (
                <div className={styles.success}></div>
              ) : (
                <div className={styles.pending}></div>
              )}
            </td>
            <td>
              <div className={styles.download__wrapper}>
                <Download size={14} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
