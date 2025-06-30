// components/StyledLink.tsx
"use client";

import Link, { LinkProps } from "next/link";

export default function StyledLink({ children, ...props }: LinkProps & {children: React.ReactNode}) {
  return (
    <Link
      {...props}
      className="font-grotesk text-[22px] underline underline-offset-8 decoration-2 transition hover:no-underline"
    >
      {children}
    </Link>
  )
}