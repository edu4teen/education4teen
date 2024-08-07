import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="bg-gray-800">
      <nav className="my-container">
        <div className="flex justify-between items-center pt-4 pb-4  text-white">
          <div className="text-lg font-bold">
            <Link href="/">Logo</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/about">About</Link>
            <Link href="/services">service</Link>
            <Link href="/contact">contact</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
