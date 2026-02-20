"use client";
import styles from "./SearchBar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postData } from "../services/FetchNodeServices";

export default function SearchBar() {

  const [search,setSearch]= useState("");  // ✅ string
  const router = useRouter();

  const handleSearch = async () => {

    if (!search.trim()) return;

    const response = await postData("users/search_fooditem_by_name", {
      name: search,
    });

    

    if(response.data){
      router.push(`/productdetailcomponent/${response.data.fooditemid}`);
    } else {
      alert("Item not found");
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <Image
          src="/images/search.png"
          width={14}
          height={14}
          alt=""
          className={styles.icon}
        />

        <input
          type="text"
          placeholder="Search"
          value={search}
          className={styles.searchInput}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <div className={styles.separator}></div>

       <button style={{ backgroundColor: "#2563eb", 
        color: "white",
         padding: "6px 20px", 
         border: "none",
          borderRadius: "7px",
           fontSize: "15px", 
           fontWeight: "500",
            cursor: "pointer", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)", transition: "all 0.3s ease" }}
             onMouseOver={(e) => e.target.style.backgroundColor = "#1e40af"} 
             onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
              onClick={handleSearch} > Search </button>

      </div>
    </div>
  );
}