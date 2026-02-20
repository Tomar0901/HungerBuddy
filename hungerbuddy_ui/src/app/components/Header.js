"use client"
import CategoryComponent from "./CategoryComponent";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import User from "./User"
import { useState,useEffect } from "react";
import { getData } from "../services/FetchNodeServices";
import { useSelector } from "react-redux";

export default function Header({dataRef,foodList,setFoodList}) {
 const [categoryList,setCategoryList]=useState([])
  var cart=useSelector((state)=>state.cart)
  var totalItems=Object.keys(cart)
  var total=totalItems?.length
  console.log("Total:",total)
  const fetchAllCategory = async () => {
    var response = await getData("users/fetch_all_category");

    setCategoryList(response.data);
  };
  

  useEffect(function () {
    fetchAllCategory();
  }, []);
  return (
    <div className={styles.maincontainer}>
      <div className={styles.stylebar}>
        <div className={styles.styletext}>
          <div className={styles.styleone}>HungerBuddy in</div>

          <div className={styles.styletwo}>20 minutes</div>
          <div>
            <span className={styles.stylethree}>Home</span> -{" "}
            <span className={styles.stylename}>Jackie Thomas</span>
          </div>

    </div>     
    <User totalItems={total} />
    </div>
    
      <div style={{display:'flex',justifyContent:'center',width:'100%',alignItems:'center',marginBottom:40}}>
       <SearchBar/>
      </div>
              
    
    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
    <CategoryComponent dataRef={dataRef} data={categoryList} foodList={foodList} setFoodList={setFoodList}/>
    </div>
    </div>
  );
}
