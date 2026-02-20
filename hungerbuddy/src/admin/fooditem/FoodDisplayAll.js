import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import {getDate,getTime,getData,serverURL,postData,} from "../../services/FetchNodeServices";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import burger from "../../assets/burger.png";
import EditIconComponent from "../../components/EditIconComponent";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {IconButton,Dialog,DialogTitle,DialogContent,Button,Grid,TextField,} from "@mui/material";
import { use } from "react";
import { useNavigate } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: "90%",
    height: "auto",

    padding: 10,
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    display: "flex",
    flexDirection: "row",
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
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));


export default function FoodDisplayAll({refresh,setRefresh}) {
  var classes=useStyle()
  var navigate=useNavigate()
  var branch=JSON.parse(localStorage.getItem('Branch'))
  const [FoodItemsList,setFoodItemsList]=useState([])
  const [open,setOpen]=useState(false)
//   Food Item View//
const [fooditemId,setFooditemId]=useState('')
 const [branchId,setBranchId]=useState('')
    const [branchName,setBranchName]=useState('')
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
    const [dialogState, setDialogState] = useState("");
    const [statusButton,setStatusButton]=useState(false)
    const [tempImage,setTempImage]=useState("");
    


useEffect(()=>{
    fetchAllFoodItems()
  },[refresh])


const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };


  const validation=()=>{
  var isError=false
  if(fooditemName.length==0){
    setError((prev)=>({...prev,FoodItemName:"food item Name is required"}))
    isError=true
  }
  if(category.length==0){
    setError((prev)=>({...prev,Category:"food item Category is required"}))
    isError=true
  }
  if(fooditemType.length==0){
    setError((prev)=>({...prev,FoodItemType:"food item Type is required"}))
    isError=true
  }
  if(fooditemTaste.length==0){
    setError((prev)=>({...prev,FoodItemTaste:"food item Taste is required"}))
    isError=true
  }

  if(ingredients.length==0){
    setError((prev)=>({...prev,Ingredients:"food item Ingredients is required"}))
    isError=true
  }
  if(fullPrice.length==0){
    setError((prev)=>({...prev,FullPrice:"food item Full Price is required"}))
    isError=true
  }
  if(halfPrice.length==0){
    setError((prev)=>({...prev,HalfPrice:"food item Half Price is required"}))
    isError=true
  }
  if(offerPrice.length==0){
    setError((prev)=>({...prev,OfferPrice:"food item Offer Price is required"}))
    isError=true
  }
  if(status.length==0){
    setError((prev)=>({...prev,Status:"food item Status is required"}))
    isError=true
  }

  return isError
}







       



const fetchAllCategories= async ()=>{
  var response=await getData('fooditem/fetch_category')
  setCategoryList(response.data)
}
 


  const handleCategoryChange=(e)=>{
  setCategory(e.target.value)
}
 
  const fillCategories=()=>{
    return categoryList.map((item)=>{
       return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
    })
    
  }
useEffect(function(){
  fetchAllCategories()
},[])



const handleClickEdit=async()=>{
   var err=validation()
    if(err==false){
      var body={
        fooditemid:fooditemId,
        branchid:branchId,
        categoryid:category,
        fooditemname:fooditemName,
        fooditemtype:fooditemType,
        fooditemtaste:fooditemTaste,
        ingredients:ingredients,
        fullprice:fullPrice,
        halfprice:halfPrice,
        offerprice:offerPrice,
        status:status,
        rating:"xxxxx",
        createddate: getDate(),
        createdtime: getTime(),
      }

      var response= await postData('fooditem/edit_fooditem',body)
      if (response.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        })
        setOpen(false)
        fetchAllFoodItems()
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
      }
   }
}



const handlePictureChange = (e) => {
    setPicture((prev)=>({...prev,
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    }));
    setStatusButton(true)
   
  };


const showFoodPictureInterface = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.titleStyle}>HungerBuddy</div>
                <div className={classes.subTitleStyle}>Edit Picture</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon style={{ color: "#ffff" }} />
                </IconButton>
              </div>
            </div>
          </Grid>

          <Grid size={6}>
            <img src={picture.fileName} style={{ width: 100,borderRadius:10 }} />
          </Grid>

          <Grid size={6} style={{display:'flex',alignItems:'center'}}>
            {statusButton?saveCancelButton():<></>}
          </Grid>
          
          <Grid size={12}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <Button
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                endIcon={<CloudUploadIcon />}
                fullWidth
                component="label"
                variant="contained"
              >
                picture
                <input onChange={handlePictureChange} type="file" hidden multiple />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };



  const showFoodInterface=()=>{
     return (
         <Grid container spacing={1}>
                 <Grid size={12}>
                   <div className={classes.heading}>
                     <div className={classes.titleBox}>
                       <div className={classes.titleStyle}>HungerBuddy</div>
                       <div className={classes.subTitleStyle}>Edit Category</div>
                     </div>
                     <div style={{ marginLeft: "auto" }}>
                       <IconButton onClick={handleCloseDialog}>
                         <CloseIcon style={{ color: "#ffff" }} />
                       </IconButton>
                     </div>
                   </div>
                 </Grid>
         
         
         
               <Grid size={6}>
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
         
                     <Grid size={6}>
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
         
                 <Grid size={6}>
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

                  <Grid size={6}>
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
                            
         
         
            <Grid size={6}>
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
                             
         
         
         
                        <Grid size={6}>
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
         
         
                        <Grid size={6}>
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
         
         
                        <Grid size={6}>
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
         
         
                        <Grid size={6}>
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
         
         
                        <Grid size={6}>
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
         
          
        <Grid size={6}>
                 <div style={{ padding: "0px 5px 0px 5px" }}>
                   <Button
                     onClick={handleClickEdit}
                     style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                     fullWidth
                     variant="contained"
                   >
                     Save
                   </Button>
                 </div>
               </Grid>
               <Grid size={6}>
                 <div style={{ padding: "0px 5px 0px 5px" }}>
                   <Button
                     style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                     fullWidth
                     variant="contained"
                   >
                     Clear
                   </Button>
                 </div>
               </Grid>
             </Grid>
           );
         };




  const fetchAllFoodItems= async ()=>{
  var response = await getData('fooditem/fetch_all_fooditems')
  setFoodItemsList(response.data)
}
useEffect(function(){
  fetchAllFoodItems()
}, [])



  const handleCancle=()=>{
  setPicture({fileName: tempImage,bytes:''})
  setStatusButton(false)
}       



const handleEditFoodPicture=async()=>{
  var formData = new FormData()
  formData.append("fooditemid",fooditemId)
  formData.append("picture",picture.bytes)
   formData.append('createddate',getDate())
    formData.append('createdtime',getTime())
    formData.append('rating',"xxxxxx")


  var response = await postData("fooditem/edit_picture", formData);
      if (response.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
        setOpen(false);
        fetchAllFoodItems();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
    
          }
        }




   const saveCancelButton=()=>{
          return <div style={{display:'flex',width:'80%',justifyContent:'space-between'}}>
         <Button onClick={handleEditFoodPicture}  style={{ background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Save</Button>
             <Button onClick={handleCancle}  style={{ background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Cancel</Button>
        
            </div>
          }

 const handleDelete = async(fid)=>{
       Swal.fire({
        title: "Do you want to delete the selected food item?",
       
        showCancelButton: true,
        confirmButtonText: "Delete",
       
      }).then(async(result) => {
       if (result.isConfirmed) {
          var response= await postData('fooditem/delete_fooditem',{fooditemid:fid})
          Swal.fire(response.message);
          fetchAllFoodItems()
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }

  const handleOpenDialog=(rowData,status)=>{
    setDialogState(status)
  setFooditemId(rowData.fooditemid)
  setBranchId(rowData.branchid)
  setBranchName(rowData.branchname)
  setCategory(rowData.categoryid)
  setFooditemName(rowData.fooditemname) 
  setFooditemType(rowData.fooditemtype)
  setFooditemTaste(rowData.fooditemtaste)
  setIngredients(rowData.ingredients)
  setFullPrice(rowData.fullprice)
  setHalfPrice(rowData.halfprice)
  setOfferPrice(rowData.offerprice)
  setStatus(rowData.status)
  setRating(rowData.rating)

  setPicture({ fileName: `${serverURL}/images/${rowData.picture}`, bytes: "" })
  setTempImage(`${serverURL}/images/${rowData.picture}`)
  setStatusButton(false)

  setOpen(true);
};


const handleCloseDialog=()=>{
  setOpen(false)
}

 const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogContent>
            {dialogState == "Data"?showFoodInterface(): showFoodPictureInterface()}
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  


const displayFoodItems=()=>{
  return(
     <MaterialTable style={{width:'100%'}}
        title={`List of food Items ${branch?.branchname}`}
        columns={[
            
            {title:'Category',field:'categoryname'},
            {title:'Food Name',render:(rowData)=>(<div>{rowData.fooditemname}/({rowData.fooditemtype})</div>)},
            {title:'Half/Full',render:(rowData)=>(<div>&#8377;{rowData.fullprice}/&#8377;{rowData.halfprice}</div>)},  
            {title:'Offer',render:(rowData)=>(<div>&#8377;{rowData.offerprice}</div>)},
            {title:'Status',field:'status'},
            {title:'Rating',field:'rating'},
            {
                title: "Icon",render: (rowData) => (<div onClick={() => handleOpenDialog(rowData, "Picture")}>
                  <EditIconComponent image={rowData.picture} />
                  </div>
                ),
              },
        ]}
        data={FoodItemsList}
        actions={[
            {icon: 'edit',
                tooltip: 'Edit',
                onClick:(event,rowData)=> handleOpenDialog(rowData,"Data")
            },

         
    
            {icon: 'delete',
                tooltip: 'Delete',
                onClick:(event,rowData)=> handleDelete(rowData.fooditemid)
            },
             {
          icon: 'add',
          tooltip: 'Add Food Items',
          isFreeAction: true,
          onClick: (event) =>navigate("/branchdashboard/fooditem")
        }
            
        ]}
        />
  )
}





return(<div className={classes.root}>
    <div className={classes.box}>
       {displayFoodItems()}
    </div>
   {showDialog()}
    
</div>
)
}














