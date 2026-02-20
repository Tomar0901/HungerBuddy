"use client";

import { useState } from "react";
import { ChevronLeft, UserPen } from "lucide-react";
import { Typography, Avatar, Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

const AccountDetails = () => {
  const router = useRouter();

  const [userData] = useState(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("USER"));
      return Object.values(user || {})[0];
    }
    return null;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 6,
      }}
    >
      <Box
        sx={{
          width: 420,
          bgcolor: "#fff",
          borderRadius: 4,
          p: 3,
          boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
            fontSize: 18,
            cursor: "pointer",
            mb: 3,
            color: "#1e293b",
          }}
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} /> My Account
        </Typography>

        {/* Avatar Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#6366f1",
              fontSize: 36,
              fontWeight: 600,
              boxShadow: "0 8px 20px rgba(99,102,241,0.4)",
            }}
          >
            <UserPen />
          </Avatar>

          <Typography variant="h6" sx={{ mt: 1.5, fontWeight: 600 }}>
            {userData?.studentname || "User"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          <InfoRow label="Phone" value={userData?.mobileno} />
          <InfoRow label="Email" value={userData?.emailid} />
          <InfoRow
            label="Address"
            value={`${userData?.current_address || ""} - ${
              userData?.current_pincode || ""
            }`}
          />
        </Box>
      </Box>
    </Box>
  );
};

const InfoRow = ({ label, value }) => (
  <Box>
    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
      {label}
    </Typography>
    <Typography sx={{ fontWeight: 500, color: "#111827" }}>
      {value || "-"}
    </Typography>
  </Box>
);

export default AccountDetails;