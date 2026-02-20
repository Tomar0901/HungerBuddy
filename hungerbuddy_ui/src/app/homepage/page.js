'use client'
import AdvertisementComponent from "../components/AdvertisementComponent"
import DrinksComponent from "../components/DrinksComponent"
import FoodItemCard from "../components/FoodItemCard"
import FooterComponent from "../components/FooterComponent"
import Header from "../components/Header"
import {useRef, useState,useEffect } from "react"
import SnacksComponent from "../components/SnacksComponent"
import { getData,postData,serverURL } from "../services/FetchNodeServices"
import ScrollProductList from "../purchaseinterface/ScrollProductList"

export default function HomePage()

{
   const [loading, setLoading] = useState(true);
 const aboutRef = useRef(null);
    const [snacksList,setSnacksList]=useState([])
    const [drinkList,setDrinkList]=useState([])
    const [foodList,setFoodList]=useState([])
   

      const fetchAllFood = async (cn) => {
        try{
            var response = await postData("users/fetch_all_fooditems_by_category",{categoryname:cn});
        if(cn=='Snacks')
        setSnacksList(response.data);
        else if(cn=="Drinks")
        setDrinkList(response.data) 
        }catch(error){
          console.error("Error fetching items", error);
        }finally{
          setLoading(false);
        }
          

      };
      

      const fetchAllFoodItems = async () => {
        var response = await getData("users/fetch_all_fooditems");
     
        setFoodList(response.data);
     
      };

      
    
      useEffect(function () {
        fetchAllFood('Snacks');
        fetchAllFood('Drinks')
        fetchAllFoodItems()
      }, []);
      if (loading) return <h3>Loading...</h3>;
    return(

    <div>
        <div>
        <Header dataRef={aboutRef} foodList={foodList} setFoodList={setFoodList}/>
        </div>
        
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <SnacksComponent data={snacksList}/>        
        </div> 

        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <DrinksComponent data={drinkList} />
        </div> 

        
        <div  ref={aboutRef}>
            <FoodItemCard  data={foodList}/>
        </div>
        <div style={{width:'20%'}}>
          <ScrollProductList  />
        </div>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <AdvertisementComponent />
        </div>

        <FooterComponent/>  

    </div>

    )
}