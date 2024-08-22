"use client";

import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { data: accounts, isLoading } = useGetAccount();

  if (isLoading) {
    return <div>Is loading</div>;
  }
  return (
    <div>
      {accounts?.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
    </div>
  );
}
