import React, { ReactNode } from "react";

type Level = "experiment" | "case";

type Props = {
  children: ReactNode;
  title?: string;
  level?: Level;
};

const STYLES: Record<Level, object> = {
  experiment: {
    border: "2px solid black",
    padding: "10px",
    margin: "5px",
  },
  case: {
    border: "1px dashed black",
    padding: "10px",
    margin: "5px",
  },
};

export const Box = ({ children, title, level = "experiment" }: Props) => (
  <div style={STYLES[level]}>
    <h2>{title}</h2>
    {children}
  </div>
);
