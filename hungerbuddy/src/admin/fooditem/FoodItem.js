import { Button, Grid, TextField,IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import {postData ,getData,getTime,getDate,serverURL} from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/burger.png";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    // height: "100vh",
  },
  box: {
    width: "70%",
    height: 'auto',
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: 10,
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
  },
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));

export default function FoodItem(){
    var classes = useStyle()
var branch=JSON.parse(localStorage.getItem('Branch'))
    
    const [branchId,setBranchId]=useState(branch?.branchid)
    const [branchName,setBranchName]=useState(branch?.branchname)
    const [category,setCategory]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [fooditemName,setFooditemName]=useState('')
    const [fooditemType,setFooditemType]=useState('')
    const [fooditemTaste,setFooditemTaste]=useState('')
    const [ingredients,setIngredients]=useState('')
    const [fullPrice,setFullPrice]=useState('')
    const [halfPrice,setHalfPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [status,setStatus]=useState('')
    const [rating,setRating]=useState('')
    const [picture,setPicture]=useState({ bytes: "",fileName: burger, })
    const [error,setError]=useState({fileError:null})




    

const handleError=(Label,message)=>{
    setError((prev)=>({...prev,[Label]:message}))
}
const validation=()=>{
    var iserror=false
      
    if(fooditemName.length==0){
      setError((prev)=>({...prev,fooditemName:"Food Item Name is required"}))
      iserror=true
    }
    if(fooditemType.length==0){
      setError((prev)=>({...prev,fooditemType:"Food Item Type is required"}))
      iserror=true
    }

    if(ingredients.length==0){
      setError((prev)=>({...prev,ingredients:"Ingredients is required"}))
      iserror=true
    }
    
    if(fullPrice.length==0){
      setError((prev)=>({...prev,fullPrice:"Full Price is required"}))
      iserror=true
    }

    if(halfPrice.length==0){
      setError((prev)=>({...prev,halfPrice:"Half Price is required"}))
      iserror=true
    }

    if(offerPrice.length==0){
      setError((prev)=>({...prev,offerPrice:"Offer Price is required"}))
      iserror=true
    }

    if(status.length==0){
      setError((prev)=>({...prev,status:"Status is required"}))
      iserror=true
    }
    if(picture.bytes.length==0){
      setError((prev)=>({...prev,picture:"Picture is required"}))
      iserror=true
    }
    return iserror
  }


   const handleClick= async ()=>{
        var err=validation()
        if(err==false)
        {
var formData=new FormData()

formData.append("branchid",branchId)
formData.append("categoryid",category)
formData.append("fooditemname",fooditemName)
formData.append("fooditemtype",fooditemType)
formData.append("fooditemtaste",fooditemTaste)
formData.append("ingredients",ingredients)
formData.append("fullprice",fullPrice)
formData.append("halfprice",halfPrice)
formData.append("offerprice",offerPrice)
formData.append("status",status)
formData.append("rating", 5)
formData.append("picture",picture.bytes)
formData.append("createddate", getDate())
formData.append("createdtime", getTime())


var response = await postData('fooditem/submit_fooditem',formData)
if(response.status)
    {
      Swal.fire({
  position: "center",
  icon: "success",
  title: response.message,
  showConfirmButton: false,
  timer: 3000,
  toast:true
});
    }
   else
    {
      Swal.fire({
  position: "top-end",
  icon: "error",
  title: response.message,
  showConfirmButton: false,
  timer: 3000,
  toast:true
});
    } 
        }

      }







////    picture change
   const handleChange = (e) => {
    setPicture({bytes: e.target.files[0],fileName: URL.createObjectURL(e.target.files[0]),
    });
    setError((prev)=>({...prev,'fileError':null}))
  };
  

  const clearValues=()=>{
    
   
    setFooditemName('')
    setFooditemType('')
    setFooditemTaste('')
    setIngredients('')
    setFullPrice('')
    setHalfPrice('')
    setOfferPrice('')
    setStatus('')
    setRating('')
    setPicture({bytes: "",fileName: burger,});
  }




const fetchCategory= async ()=>{
  try{
    var response = await getData('fooditem/fetch_category')
    setCategoryList(response.data)
  }catch(error){
    console.log(error)
  }
}

const handleCategoryChange=(e)=>{
  setCategory(e.target.value)
}
 
useEffect(function(){
  fetchCategory()
},[])

const fillCategories=()=>{
  
  return categoryList.map((item)=>{
     return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
  })
  
}


    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div className={classes.heading}>
                <div className={classes.titleBox}>
                  <div className={classes.subTitleStyle}>New Food Category in {branch?.branchname}</div>
                </div>
              </div>
            </Grid>



      <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setBranchId(e.target.value)}
                label="Branch Name"
                value={branchName}
                fullWidth
                size="small"
              />
            </div>
          </Grid>

            <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
             
             
              <FormControl size="small" fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select label="Category" value={category} onChange={handleCategoryChange}>
                                     <MenuItem>-Select Category-</MenuItem>
                                     {fillCategories()}
                                    </Select>
                                   </FormControl>
             
             
             
             
             
             
              {/* <TextField
                onChange={(e) => setFoodcategoryId(e.target.value)}
                label="Food Category ID"
                value={foodcategoryId}
                fullWidth
                helperText={error?.foodcategoryId}
                error={error?.foodcategoryId}
                onFocus={()=>handleError('foodcategoryId','')}
                size="small"
              />*/}
            </div>
          </Grid>

        <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                      <TextField
                        onChange={(e) => setFooditemName(e.target.value)}
                        label="Food Item Name"
                        fullWidth
                        value={fooditemName}
                        helperText={error?.fooditemName}
                        error={error?.fooditemName}
                        onFocus={()=>handleError('fooditemName','')}
                        size="small"
                      />
                    </div>
                  </Grid>
                  
         <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                      
                     
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Food Type</InputLabel>
                                    <Select label="Food Type" value={fooditemType} onChange={(e) => setFooditemType(e.target.value)}>
                                     <MenuItem>-Select Food Type-</MenuItem>
                                     <MenuItem value={'Veg'}>Veg</MenuItem>
                                     <MenuItem value={'Non-Veg'}>Non-Veg</MenuItem>
                                    </Select>
                                   </FormControl>
                    
                       </div>
                  </Grid>
                      
                      {/* <TextField
                        onChange={(e) => setFooditemType(e.target.value)}
                        label="Food Item Type"
                        fullWidth
                        value={fooditemType}
                        helperText={error?.fooditemType}
                        error={error?.fooditemType}
                        onFocus={()=>handleError('fooditemType','')}
                        size="small"
                      /> */}
                   


   <Grid size={3}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
           <FormControl size="small" fullWidth>
           <InputLabel>Food Taste</InputLabel>
          <Select label="Food Taste" value={fooditemTaste} onChange={(e) => setFooditemTaste(e.target.value)}>
          <MenuItem>-Select Food Taste-</MenuItem>
            <MenuItem value={'Spicy'}>Spicy</MenuItem>
             <MenuItem value={'Non Spicy'}>Non Spicy</MenuItem>
             </Select>
              </FormControl>
                     
                  </div>
                  </Grid>   
                      {/* <TextField
                        onChange={(e) => setFooditemTaste(e.target.value)}
                        label="Food Item Taste"
                        fullWidth
                        value={fooditemTaste}
                        helperText={error?.fooditemTaste}
                        error={error?.fooditemTaste}
                        onFocus={()=>handleError('fooditemTaste','')}
                        size="small"
                      /> */}
                    



               <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                      <TextField
                        onChange={(e) => setIngredients(e.target.value)}
                        label="Ingredients"
                        fullWidth
                        value={ingredients}
                        helperText={error?.ingredients}
                        error={error?.ingredients}
                        onFocus={()=>handleError('ingredients','')}
                        size="small"
                      />
                    </div>
                  </Grid>


               <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                      <TextField
                        onChange={(e) => setFullPrice(e.target.value)}
                        label="Full Price"
                        fullWidth
                        value={fullPrice}
                        helperText={error?.fullPrice}
                        error={error?.fullPrice}
                        onFocus={()=>handleError('fullPrice','')}
                        size="small"
                      />
                    </div>
                  </Grid>


               <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                      <TextField
                        onChange={(e) => setHalfPrice(e.target.value)}
                        label="Half Price"
                        fullWidth
                        value={halfPrice}
                        helperText={error?.halfPrice}
                        error={error?.halfPrice}
                        onFocus={()=>handleError('halfPrice','')}
                        size="small"
                      />
                    </div>
                  </Grid>


               <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                      <TextField
                        onChange={(e) => setOfferPrice(e.target.value)}
                        label="Offer Price"
                        fullWidth
                        value={offerPrice}
                        helperText={error?.offerPrice}
                        error={error?.offerPrice}
                        onFocus={()=>handleError('offerPrice','')}
                        size="small"
                      />
                    </div>
                  </Grid>


               <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                    
                    
                <FormControl size="small" fullWidth>
           <InputLabel>Status</InputLabel>
          <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem>-Select Status-</MenuItem>
            <MenuItem value={'Available'}>Avl</MenuItem>
             <MenuItem value={'Unavailable'}>Non-Avl</MenuItem>
             </Select>
              </FormControl>
                         
                    
                    
                    
                    
                    
                      {/* <TextField
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                        fullWidth
                        value={status}
                        helperText={error?.status}
                        error={error?.status}
                        onFocus={()=>handleError('status','')}
                        size="small"
                      /> */}
                    </div>
                  </Grid>

   <Grid size={2} style={{ display: "flex", alignItems:'center',justifyContent:'center',flexDirection:'column' }}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <img src={picture.fileName} style={{ width: 40 }} />
              </div>
  
              <div style={{color:'#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif",fontWeight:400,fontSize:'0.75rem',lineHeight:'1.66rem'}}>{error?.fileError==null?'':error.fileError}</div>
            </Grid>
          
            <Grid size={2}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <IconButton
                  style={{ color: "hsla(321, 32%, 37%, 1.00)",display:"flex",flexDirection:'column', }}
                  component="label"
                >
                  <CloudUploadIcon style={{fontSize:34}} />
                  <div style={{fontSize:12}}>Upload</div>
                  <input onChange={handleChange} type="file" hidden multiple />
                </IconButton>
              </div>
            </Grid>

<Grid size={1}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <IconButton
                onClick={handleClick}
                  style={{ color: "hsla(321, 32%, 37%, 1.00)",display:"flex",flexDirection:'column',  }}
                  
                  
                >
                  <SaveIcon  style={{fontSize:34}} />
                  <div style={{fontSize:12}}>Save</div>
                  
                </IconButton>
              </div>
            </Grid>
            <Grid size={1}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <IconButton
                onClick={clearValues}
                  style={{ color: "hsla(321, 32%, 37%, 1.00)",display:"flex",flexDirection:'column', }}
                  
                  
                >
                  <DeleteForeverIcon style={{fontSize:34}}/>
                  <div style={{fontSize:12}}>Clear</div>
                </IconButton>
              </div>
            </Grid>

          </Grid>
        </div>
      </div>
    );
}