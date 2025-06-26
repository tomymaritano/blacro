// components/ui/AppLink.tsx
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function AppLink({ children, className = "", ...props }: AppLinkProps) {
  return (
    <Link className={`font-familjen ${className}`} {...props}>
      {children}
    </Link>
  );
}