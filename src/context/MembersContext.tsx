import React, { createContext, useContext, useState } from "react";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import { mockMembers } from "../data/mockMembers";
import { membershipPlans } from "../data/membershipPlans";
import { isExpired } from "../utils/dateUtils";

/* ------------------ Types ------------------ */

interface MembersContextType {
  members: Member[];
  payments: Payment[];
  addMember: (member: Omit<Member, "id" | "expiryDate">) => void;
  renewMembership: (
    memberId: string,
    planId: string,
    amount: number
  ) => void;
}

/* ------------------ Context ------------------ */

const MembersContext = createContext<MembersContextType | undefined>(
  undefined
);

/* ------------------ Helpers ------------------ */

function calculateExpiryDate(joinDate: string, planId: string): string {
  const plan = membershipPlans.find((p) => p.id === planId);
  if (!plan) return joinDate;

  const date = new Date(joinDate);
  date.setMonth(date.getMonth() + plan.durationMonths);

  return date.toISOString().split("T")[0];
}

/* ------------------ Provider ------------------ */

export function MembersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [payments, setPayments] = useState<Payment[]>([]);

  const addMember = (member: Omit<Member, "id" | "expiryDate">) => {
    const expiryDate = calculateExpiryDate(
      member.joinDate,
      member.planId
    );

    const newMember: Member = {
      id: crypto.randomUUID(),
      ...member,
      expiryDate,
    };

    setMembers((prev) => [...prev, newMember]);
  };

  const renewMembership = (
    memberId: string,
    planId: string,
    amount: number
  ) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== memberId) return member;

        const startDate = isExpired(member.expiryDate)
          ? new Date().toISOString().split("T")[0]
          : member.expiryDate;

        const newExpiry = calculateExpiryDate(startDate, planId);

        return {
          ...member,
          planId,
          expiryDate: newExpiry,
        };
      })
    );

    const payment: Payment = {
      id: crypto.randomUUID(),
      memberId,
      planId,
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    setPayments((prev) => [...prev, payment]);
  };

  const membersWithStatus: Member[] = members.map((member) => ({
    ...member,
    status: isExpired(member.expiryDate) ? "inactive" : "active",
  }));

  return (
    <MembersContext.Provider
      value={{
        members: membersWithStatus,
        payments,
        addMember,
        renewMembership,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

/* ------------------ Hook ------------------ */

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error(
      "useMembers must be used within MembersProvider"
    );
  }
  return context;
}
