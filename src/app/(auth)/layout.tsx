import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmmaTeam Auth",
  description: "register in yout OmmaTeam Profile",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
