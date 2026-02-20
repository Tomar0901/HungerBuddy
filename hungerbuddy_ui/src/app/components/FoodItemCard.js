'use client'
import Image from 'next/image';
import styles from './FoodItemCard.module.css';
import { serverURL } from '../services/FetchNodeServices';
import { useRouter } from 'next/navigation';
export default function FoodItemCard({data}) {
var mycolor=["#ffeaa7","#fab1a0","#dff9fb","#686de0","#22a6b3","#78e08f","#fa983a","#6a89cc","#f8c291"]
   
var navigate=useRouter()

const showFood=()=>{
return data.map((item)=>{
var percent=(item.fullprice-item.offerprice)/item.fullprice*100

return ( <div className={styles.card} onClick={()=>navigate.push(`/productdetailcomponent/${item.fooditemid}`)} >
      <div className={styles.imageContainer} style={{background:`${mycolor[parseInt(Math.random()*9)]}`}}>
        <div className={styles.imageStyle}>
        <img
          src={`${serverURL}/images/${item.picture}`}
          alt=""
        style={{width:'100%',height:'100'}}
        />
        </div>
        <div className={styles.discountBadge}>
          {item.offerprice==0?<></>:<>{percent.toFixed(0)}% OFF UPTO ₹{item.fullprice-item.offerprice}</>}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{item.fooditemtype=='Veg'?<img src={`${serverURL}/images/veg.png`} width='16'/>:<img src={`${serverURL}/images/nonveg.png`} width='16'/>} <span style={{marginLeft:'2%'}}> {item.fooditemname}</span><span style={{marginLeft:'4%'}}>{item.fooditemtaste=='Spicy'?<img src={`${serverURL}/images/spicy.png`} width={16}/>:<></>}</span> </h3>
        
        <div className={styles.ratingContainer}>
          <img src={`${serverURL}/images/star.png`} alt='' width={20} height={20} />
          <span className={styles.rating}>{item.rating.toFixed(1)}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.deliveryTime}>30-35 mins</span>
        </div>
        <p className={styles.location}>{item.offerprice==0?<span style={{fontWeight:'bold',color:'#000'}}>₹{item.fullprice}</span>:<><span style={{fontWeight:'bold',marginRight:'2%',color:'#000'}}>₹{item.offerprice}</span> <s>₹{item.fullprice}</s></>}</p>
       
        <p className={styles.cuisine}>North Indian</p>
        
      </div>
    </div>)


})

}


  return (<div style={{width:'100%', marginTop:40}}>
    <div style={{fontSize:20,fontWeight:'bold',marginBottom:10,marginLeft:'6%'}}>Today's Menu</div>
    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
    {showFood()}
    </div>
  </div>
    );
}

