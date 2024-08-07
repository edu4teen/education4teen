import React from "react";

import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex w-full">
      <div className="w-full">
        <Navbar />
        <div>
          <div className="my-container">{children}</div>
          <div className="container-2">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
