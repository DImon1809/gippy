import React from "react";
import { X } from "lucide-react";

import style from "./style.module.scss";

type Props = {
  className?: string;
  handler: () => void;
};

export const XButton = ({ className, handler }: Props) => {
  return (
    <div className={`${className} ${style.xbutton}`} onClick={handler}>
      <X />
    </div>
  );
};
