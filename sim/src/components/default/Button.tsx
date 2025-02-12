import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const { children, className, ...divProps } = props;
  return (
    <div
      className={
        className
      }
      {...divProps}
    >
      {children}
    </div>
  );
};