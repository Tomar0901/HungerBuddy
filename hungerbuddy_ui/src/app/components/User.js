"use client"

import Image from "next/image";
import { useState } from "react";
import { Badge, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import AccountMenu from "../Account/MyAccount";

export default function User({ totalItems }) {

  const navigate = useRouter();

  // ✅ SSR Safe + No ESLint Error
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("USER");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userData = user ? Object.values(user)[0] : null;

  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
      }}
    >
      {/* 🛒 Cart */}
      <Badge badgeContent={totalItems} color="error">
        <div
          onClick={() => navigate.push("/cart")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#000",
          }}
        >
          <Image src="/images/cart.png" width={25} height={25} alt="cart" />
        </div>
      </Badge>

      {/* 👤 User Section */}
      {userData ? (
        <>
          <Avatar
            onClick={handleAvatarClick}
            sx={{
              background: "#4af71f",
              border: "1px solid seagreen",
              cursor: "pointer",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            {userData?.studentname?.charAt(0)?.toUpperCase()}
          </Avatar>

          <AccountMenu
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </>
      ) : (
        <div
          onClick={() => navigate.push("/signin?from=HP")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#000",
          }}
        >
          <Image src="/images/user.png" height={25} width={25} alt="user" />
        </div>
      )}
    </div>
  );
}