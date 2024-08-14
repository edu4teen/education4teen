import React from "react";
import Image from "next/image";

interface LogoProps
  extends Omit<React.ComponentProps<typeof Image>, "src" | "alt"> {}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Image
      {...props}
      src="/image/simpleLogo.svg"
      width={100}
      height={1}
      alt="logo"
    />
  );
};

export default Logo;
