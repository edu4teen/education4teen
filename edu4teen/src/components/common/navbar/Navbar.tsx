"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User,
  BookOpen,
  Search,
  Menu,
  Home,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "../Logo";

// Define types
type CourseItemProps = {
  title: string;
  description: string;
  isNew?: boolean;
  href: string;
  icon?: React.ElementType;
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
        icon: Home,
      },
      {
        title: "Solidity Smart Contract Development",
        description:
          "If you're new to writing smart contracts, start here! Learn Solidity...",
        href: "/courses/solidity-basics",
        icon: BookOpen,
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
        icon: Settings,
      },
      {
        title: "Advanced Foundry",
        description:
          "Become a Foundry expert! Learn advanced techniques to develop,...",
        href: "/courses/advanced-foundry",
        icon: LayoutDashboard,
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
        icon: HelpCircle,
      },
      {
        title: "Assembly and Formal Verification",
        description:
          "The most advanced smart contract course you'll ever take. Learn the...",
        href: "/courses/assembly-verification",
        icon: User,
      },
    ],
    viewAllHref: "/courses/advanced",
  },
];

const CourseItem: React.FC<CourseItemProps> = React.memo(
  ({ title, description, isNew = false, href, icon: Icon }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden"
    >
      <Link
        href={href}
        className="block mb-4 bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <div className="flex items-center mb-3">
          {Icon && <Icon className="h-6 w-6 text-blue-400 mr-3" />}
          <h3 className="font-bold text-lg text-white">{title}</h3>
          {isNew && (
            <Badge variant="destructive" className="ml-2 animate-pulse">
              New
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-300">{description}</p>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-500 to-purple-500 opacity-20 rounded-tl-full" />
      </Link>
    </motion.div>
  )
);

CourseItem.displayName = "CourseItem";

type DropdownLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const DropdownLink: React.FC<DropdownLinkProps> = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-all duration-300 transform hover:scale-105"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleDropdown = (isOpen: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(isOpen);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => toggleDropdown(false), 300);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement actual dark mode logic here
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const SidebarLink: React.FC<{
    href: string;
    icon: React.ElementType;
    label: string;
  }> = ({ href, icon: Icon, label }) => (
    <Link
      href={href}
      className="flex items-center space-x-4 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-300"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );

  const Sidebar: React.FC = () => (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 bg-gray-900 text-white p-4 z-50 w-full overflow-y-auto"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <Button variant="ghost" onClick={toggleSidebar}>
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
        <nav className="flex-grow space-y-4">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/courses" icon={BookOpen} label="Courses" />
          <SidebarLink
            href="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
          />
        </nav>
        <div className="mt-auto space-y-4">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800 rounded-lg">
            <Avatar className="h-10 w-10 ring-2 ring-blue-500">
              <AvatarImage src="/avatar.jpg" alt="User" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium">Ahmad Tahir</span>
              <p className="text-xs text-gray-400">ahmadtahir1499</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              /* Implement logout logic */
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`relative ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-r from-primarypurple to-indigo-900"
      } shadow-lg`}
    >
      <nav className="z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <Logo />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div
                className="relative"
                onMouseEnter={() => toggleDropdown(true)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="ghost"
                  className="text-white hover:bg-purple-700"
                >
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
                    <Avatar className="h-10 w-10 ring-2 ring-white">
                      <AvatarImage src="/avatar.jpg" alt="User" />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[290px] p-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/avatar.jpg" alt="User" />
                        <AvatarFallback>AT</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Ahmad Tahir</h3>
                        <p className="text-sm text-gray-500">ahmadtahir1499</p>
                      </div>
                    </div>
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
                      href="/settings"
                      icon={<Settings className="h-5 w-5 text-gray-500" />}
                      label="Settings"
                    />
                    <div className="border-t border-gray-200 my-2 pt-2"></div>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={() => {
                        /* Implement logout logic */
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2 " />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                className="text-white"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="absolute left-0 right-0 bg-gray-900 border-t border-gray-800 text-white shadow-xl z-10 hidden md:block"
            onMouseEnter={() => toggleDropdown(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Test Your Skills
                  </h3>
                  <p className="mb-4 text-gray-300">
                    Join Edu4teen and compete for cash prizes!
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
                    Go to CodeHawks →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
    </div>
  );
};

export default Navbar;
