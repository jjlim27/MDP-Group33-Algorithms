import React from "react";

interface MainContainerProps {
  title: string;
  children: React.ReactNode;
}

export const MainContainer = (props: MainContainerProps) => {
  const { title, children } = props;

  return (
    <div className="flex flex-col justify-center items-center my-6">
      <div className="font-bold text-[24px] mb-2">- {title} -</div>
      <div>{children}</div>
    </div>
  );
};
