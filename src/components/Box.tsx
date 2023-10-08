import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};

export const Box = ({ children, title }: Props) => (
  <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
    <h2>{title}</h2>
    {children}
  </div>
);
