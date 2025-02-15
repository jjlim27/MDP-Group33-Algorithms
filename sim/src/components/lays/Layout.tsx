import React from "react";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";


interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
          <Toaster />
      <div className="flex flex-col p-4 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 text-blue-900">
        {/* Header Section */}
        <Header />

        {/* Content Section */}
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};
