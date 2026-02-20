"use client"
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User ,LogOut} from 'lucide-react';
import { useRouter } from "next/navigation";

export default function AccountMenu({ anchorEl, handleClose }) {
    var navigate =useRouter()
  return (
    <Menu
      
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem onClick={()=>navigate.push("/Account")} style={{fontSize:"14px",fontFamily:"Poppins",gap:5}} > <User size={15} />My Account</MenuItem>
      <MenuItem onClick={()=>navigate.push("/Orders")} style={{fontSize:"14px",fontFamily:"Poppins"}}>My Orders</MenuItem>
      <MenuItem onClick={()=>{
        localStorage.clear()
        navigate.push("/homepage")
      }} style={{fontSize:"14px",fontFamily:"Poppins",color:"red",gap:5}}><LogOut size={15} /> Logout</MenuItem>
    </Menu>
  );
}
