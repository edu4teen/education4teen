"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User,
  BookOpen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Define types
type CourseItemProps = {
  title: string;
  description: string;
  isNew?: boolean;
  href: string;
};

type CourseCategory = {
  title: string;
  items: CourseItemProps[];
  viewAllHref: string;
};

// Define constants
const COURSE_CATEGORIES: CourseCategory[] = [
  {
    title: "Beginner",
    items: [
      {
        title: "Blockchain Basics",
        description:
          "Start where you're comfortable! Learn how blockchains work, smart...",
        href: "/courses/blockchain-basics",
      },
      {
        title: "Solidity Smart Contract Development",
        description:
          "If you're new to writing smart contracts, start here! Learn Solidity...",
        href: "/courses/solidity-basics",
      },
    ],
    viewAllHref: "/courses/beginner",
  },
  {
    title: "Intermediate",
    items: [
      {
        title: "Foundry Fundamentals",
        description:
          "Already know Solidity? Your next step is Foundry! Learn how to manage you...",
        href: "/courses/foundry-fundamentals",
      },
      {
        title: "Advanced Foundry",
        description:
          "Become a Foundry expert! Learn advanced techniques to develop,...",
        href: "/courses/advanced-foundry",
      },
    ],
    viewAllHref: "/courses/intermediate",
  },
  {
    title: "Advanced",
    items: [
      {
        title: "Smart Contract Security",
        description:
          "Start your career as a smart contract auditor! Learn the best practices for...",
        isNew: true,
        href: "/courses/smart-contract-security",
      },
      {
        title: "Assembly and Formal Verification",
        description:
          "The most advanced smart contract course you'll ever take. Learn the...",
        href: "/courses/assembly-verification",
      },
      {
        title: "Smart Contract DevOps",
        description:
          "In this course, we learn the basics of how to work with wallets from a...",
        href: "/courses/smart-contract-devops",
      },
      {
        title: "Uniswap V2",
        description:
          "Learn Uniswap v2 development on Cyfrin Updraft. Study math and graph...",
        href: "/courses/uniswap-v2",
      },
    ],
    viewAllHref: "/courses/advanced",
  },
];

const CourseItem: React.FC<CourseItemProps> = React.memo(
  ({ title, description, isNew = false, href }) => (
    <Link
      href={href}
      className="block mb-4 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200"
    >
      <h3 className="font-bold flex items-center text-white">
        {title}
        {isNew && (
          <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            New
          </span>
        )}
      </h3>
      <p className="text-sm text-gray-300 mt-1">{description}</p>
    </Link>
  )
);

CourseItem.displayName = "CourseItem";

const DropdownLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const Navbar: React.FC = React.memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleDropdown = (isOpen: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(isOpen);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => toggleDropdown(false), 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative bg-primarypurple shadow-md">
      <nav className="z-20 relative my-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-xl font-bold text-white">Logo</span>
            </Link>
            <div className="flex items-center space-x-6">
              <div
                className="relative"
                onMouseEnter={() => toggleDropdown(true)}
                onMouseLeave={handleMouseLeave}
              >
                <Button variant="ghost" className="text-white hover:none">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="h-5 w-5 mr-1" />
                    Courses
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                </Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatar.jpg" alt="User" />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-2">
                  <div className="flex flex-col space-y-1">
                    <DropdownLink
                      href="/dashboard"
                      icon={
                        <LayoutDashboard className="h-5 w-5 text-gray-500" />
                      }
                      label="Dashboard"
                    />
                    <DropdownLink
                      href="/profile"
                      icon={<User className="h-5 w-5 text-gray-500" />}
                      label="Profile"
                    />
                    <DropdownLink
                      href="/logout"
                      icon={<LogOut className="h-5 w-5 text-gray-500" />}
                      label="Logout"
                    />
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="text-xs text-gray-500 px-2 py-1">
                      dummy@email.com
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`absolute left-0 right-0 bg-primarypurple border-t border-primarybluegrey text-white shadow-lg z-10 transition-all duration-300 ease-in-out transform ${
          isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
        onMouseEnter={() => toggleDropdown(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-4 gap-8">
            {COURSE_CATEGORIES.map((category, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-blue-400 text-lg font-bold">
                  {category.title}
                </h2>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <CourseItem key={itemIndex} {...item} />
                  ))}
                </div>
                <Link
                  href={category.viewAllHref}
                  className="inline-block text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  View all {category.title.toLowerCase()} courses →
                </Link>
              </div>
            ))}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-white">
                Test Your Skills
              </h3>
              <p className="mb-4 text-gray-300">
                Join Cyfrin CodeHawks and compete for cash prizes!
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <Image
                  width={150}
                  height={150}
                  src="/codehawks-logo.png"
                  alt="CodeHawks"
                  className="w-full"
                />
              </div>
              <Link
                href="/codehawks"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Go to Cyfrin CodeHawks →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
