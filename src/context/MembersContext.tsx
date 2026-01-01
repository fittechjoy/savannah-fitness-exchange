import { createContext, useContext, useState } from "react";
import type { Member } from "../types/member";
import { mockMembers } from "../data/mockMembers";

interface MembersContextType {
  members: Member[];
  addMember: (member: Omit<Member, "id">) => void;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>(mockMembers);

  const addMember = (member: Omit<Member, "id">) => {
    const newMember: Member = {
      id: crypto.randomUUID(),
      ...member,
    };

    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <MembersContext.Provider value={{ members, addMember }}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used within MembersProvider");
  }
  return context;
}
