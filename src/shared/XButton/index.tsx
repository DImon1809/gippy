import React from "react";
import { X } from "lucide-react";

import style from "./style.module.scss";

type Props = {
  handler: () => void;
};

export const XButton = ({ handler }: Props) => {
  return (
    <div className={style.xbutton} onClick={handler}>
      <X />
    </div>
  );
};
