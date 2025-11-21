import React from "react";
import { Check } from "lucide-react";

import type { TariffsCard } from "@/entities/Modals/TariffsModal";

import styles from "./style.module.scss";

type Props = {
  tariff: TariffsCard;
};

export const Card = ({ tariff }: Props) => {
  return (
    <div>
      <header>
        {tariff.isPopular && <div>Популярный</div>}
        <div>
          <h4>{tariff.title}</h4>
        </div>
      </header>
      <div>
        {tariff.items.map((item, i) => (
          <div key={i}>
            <Check />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div>
        <div>{`${tariff.status === "active" ? "Активно" : "Попробовать"}`}</div>
      </div>
    </div>
  );
};
