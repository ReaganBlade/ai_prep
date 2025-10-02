"use client";

import { Button } from "@/components/ui/button";
import { clientSignOut } from "@/lib/session-utils";

const LogoutButton = () => {
  const handleLogout = async () => {
    await clientSignOut();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="text-red-600 border-red-600 hover:bg-red-50"
    >
      Sign Out
    </Button>
  );
};

export default LogoutButton;
