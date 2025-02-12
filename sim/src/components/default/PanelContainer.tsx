import React from "react";

interface PanelContainerProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const PanelContainer = ({ title, children }: PanelContainerProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Modal Container */}
      <div className="relative flex flex-col items-center bg-blue-200 w-full max-w-[200px] p-6 rounded-lg shadow-md">
        {/* Title */}
        <div className="w-full text-center font-extrabold text-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg shadow-md uppercase tracking-wide">
  {title}
</div>

        {/* Body */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
