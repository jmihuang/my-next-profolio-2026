"use client";

import { Button } from "antd";
import { signOut } from "next-auth/react";

export default function AdminSignOut() {
  return (
    <Button type="text" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
      登出
    </Button>
  );
}
