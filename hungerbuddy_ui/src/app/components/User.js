"use client"
import Image from "next/image";
import { useState,useEffect } from "react";
import { Badge, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Block } from "@mui/icons-material";
import AccountMenu from "../Account/MyAccount";


export default function User({ totalItems }) {
  var navigate = useRouter()
  // var user=useSelector((state)=>state.user)
  // var user = JSON.parse(localStorage.getItem("USER"))
  const [user, setUser] = useState(null)
 useEffect(() => {
    const storedUser =JSON.parse(localStorage.getItem("USER"))
    setUser(storedUser)
  }, [])
  var userData
  if (user == null) {
    userData = "Not Login"
  }
  else {
    userData = Object.values(user)[0]
  }

const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",          // aur space
        padding: "10px 20px",
      }}

    >


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

          <Image src="/images/cart.png" width={25} height={25} alt="" />
        </div>
      </Badge>
      <div style={{ position: "relative", }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 10,
            left: 2,
            position: "absolute",
            width: 45,
            height: 15,
            background: "#30336b",
            border: "0.5 solid #fff",
            borderRadius: 10,
          }}
        >
          <span style={{ color: "#fff", fontSize: 9, fontWeight: "bold" }}>
            &#8377;20
          </span>
        </div>
      </div>



      <div
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
        <Image src="/images/wallet.jpg" width={25} height={25} alt="" />
      </div>
      {userData !== "Not Login" ? (
         <>
          <Avatar onClick={handleAvatarClick}  sx={{ background: "#4af71f", border:"1px solid seagreen", cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  }, }}>
            {userData?.studentname?.charAt(0).toUpperCase()}
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
          <Image src="/images/user.png" height={25} width={25} alt="" />
        </div>
      )}

     
  
    </div>
     
    </>
  )
}

