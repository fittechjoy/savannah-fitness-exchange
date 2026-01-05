import React, { createContext, useContext, useState } from "react";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import { mockMembers } from "../data/mockMembers";
import { membershipPlans } from "../data/membershipPlans";
import { isExpired, daysUntilExpiry } from "../utils/dateUtils";
import type { CheckIn } from "../types/checkin";


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
interface MembersContextType {
  members: Member[];
  payments: Payment[];
  checkIns: CheckIn[];
  addMember: (member: Omit<Member, "id" | "expiryDate">) => void;
  renewMembership: (
    memberId: string,
    planId: string,
    amount: number
  ) => void;
  checkInMember: (memberId: string) => void;
}


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

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

const checkInMember = (memberId: string) => {
  const now = new Date();

  const newCheckIn: CheckIn = {
    id: crypto.randomUUID(),
    memberId,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5),
  };

  setCheckIns((prev) => [newCheckIn, ...prev]);
};


  /* -------- Derived members (status + daysLeft) -------- */

  const membersWithStatus: Member[] = members.map((member) => {
    if (isExpired(member.expiryDate)) {
      return {
        ...member,
        status: "inactive",
      };
    }

    const daysLeft = daysUntilExpiry(member.expiryDate);

    return {
      ...member,
      status: "active",
      daysLeft,
    };
  });

  return (
    <MembersContext.Provider
  value={{
    members: membersWithStatus,
    payments,
    checkIns,
    addMember,
    renewMembership,
    checkInMember,
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
