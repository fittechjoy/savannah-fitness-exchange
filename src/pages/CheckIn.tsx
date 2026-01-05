import { useParams } from "react-router-dom";
import { useMembers } from "../context/MembersContext";
import { useEffect, useState } from "react";

export default function CheckIn() {
  const { memberId } = useParams();
  const { members, checkInMember } = useMembers();
  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const member = members.find((m) => m.id === memberId);

    if (!member) {
      setStatus("error");
      return;
    }

    checkInMember(member.id);
    setStatus("success");
  }, [memberId]);

  if (status === "loading") {
    return <p>Checking in...</p>;
  }

  if (status === "error") {
    return (
      <p className="text-red-600">
        Invalid QR code
      </p>
    );
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Check-In Successful
      </h1>
      <p className="mt-2">
        Welcome to Savannah Fitness Exchange 💪
      </p>
    </div>
  );
}
