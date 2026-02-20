import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import {getDate,getTime,getData,serverURL,postData,} from "../../services/FetchNodeServices";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import {FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText} from "@mui/material"
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

export default function DeliveryDisplay(){
    var classes = useState()
     var branch = JSON.parse(localStorage.getItem('Branch'))

    const [branchId,setBranchId] = useState(branch?.branchid)
    const [branchName,setBranchName] = useState(branch?.branchname)
    const [branchNameList,setBranchNameList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
// ==========================================================//

  const [deliveryList,setDeliveryList]=useState([])
  const [open,setOpen]=useState(false)
  const [dialogState, setDialogState] = useState("");
  const [statusButton,setStatusButton]=useState(false)
  const [tempImage,setTempImage]=useState("");
//   ========================================================= //
    const [deliveryId,setDeliveryId] = useState("")
    const [deliveryName,setDeliveryName] = useState("")
    const [dob,setDob] = useState("");
    const [gender,setGender] = useState("");
    const [emailId, setEmailId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address,setAddress] = useState("")
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addharNo,setAddharNo] = useState("")
    const [status,setStatus] = useState("")
    const [vehicleNo,setVehicleNo] = useState("")
    const [photograph,setPhotograph] = useState({bytes:"",fileName:burger,})
    const [error, setError] = useState({ fileError: null });

     const handleError = (Label, message) => {
    setError((prev) => ({ ...prev, [Label]: message }));
  };

  const validation = () => {
    var iserror = false;

    if (deliveryName.length == 0) {
      setError((prev) => ({
        ...prev,
        deliveryName: "Delivery Name  is required",
      }));
      
      iserror = true;
    }

    if (dob.length == 0) {
      setError((prev) => ({
        ...prev,
        dob: "Date of Bitrth is required",
      }));
      
      iserror = true;
    }

    if (gender.length == 0) {
      setError((prev) => ({ ...prev, gender: "gender is required" }));
      
      iserror = true;
    }

    if (emailId.length == 0) {
      setError((prev) => ({ ...prev, emailId: "Email ID is required" }));
      
      iserror = true;
    }

    if (mobileNo.length == 0) {
      setError((prev) => ({ ...prev, mobileNo: "Mobile Number is required" }));
      
      iserror = true;
    }

    if (address.length == 0) {
      setError((prev) => ({
        ...prev,
        address: " Address is required",
      }));
      
      iserror = true;
    }

    if (state.length == 0) {
      setError((prev) => ({
        ...prev,
        state: "State is required",
      }));
      
      iserror = true;
    }

    if (city.length == 0) {
      setError((prev) => ({
        ...prev,
        city: "City is required",
      }));
    
      iserror = true;
    }

     if (addharNo.length == 0) {
      setError((prev) => ({
        ...prev,
        addharNo: "Addhar No is required",
      }));
    
      iserror = true;
    }

    if (status.length == 0) {
      setError((prev) => ({
        ...prev,
        status: "status is required",
      }));
    
      iserror = true;
    }
    if (vehicleNo.length == 0) {
      setError((prev) => ({
        ...prev,
        vehicleNo: "Vehicle No is required",
      }));
    
      iserror=true
    }

     

    if (photograph.bytes.length == 0) {
      setError((prev) => ({
        ...prev,
        photograph: "Photograph is required",
      }));
      iserror = true;
    }

    return iserror;
  };



const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var body = {

      branchid: branchId,
      deliveryname: deliveryName,
      emailid: emailId,
      dob: dob,
      gender: gender,
      mobileno: mobileNo,
      address: address,
      addharno: addharNo,
      status: status,
      vehicleno: vehicleNo,
      stateid: state,
      cityid: city,
      createddate: getDate(),
      createdtime: getTime(),
      }

      var response = await postData("delivery/edit_delivery_body", body);
            if (response.status) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 3000,
                toast: true,
              });
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
      
          
        };
      
      const clearValues = () => {
        setBranchId("");
        setDeliveryName("");
        setDob("");
        setGender("");
        setMobileNo("");
        setEmailId("");
        setAddress("");
        setCity("");
        setState("");
        setAddharNo("");
        setStatus("");
        setVehicleNo("");
        setPhotograph({ bytes: "", fileName: burger }); // default image
       
      }
      
       ////    picture change//
      
         const handleChange = (e) => {
          setPhotograph({ bytes: e.target.files[0],fileName: URL.createObjectURL(e.target.files[0]),});
          setError((prev) => ({ ...prev, fileError: null }));
        };
      
      
      //  Fetching branch,batch,section from their table//
        const fetchAllBranch = async () => {
          var response = await getData("branch/fetch_all_branch");
          setBranchNameList(response.data);
        };
      
      
      
        const handleBranchChange = (e) => {
          setBranchId(e.target.value);
          setBranchName(e.target.value);
        };
      
        useEffect(function () {
          fetchAllBranch();
        }, []);
      
        const fillBranch = () => {
          return branchNameList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
          });
        };
      
      
      
        
      
      
             const fetchAllState = async () => {
              var res = await getData('statecity/fetch_states');
              setStateList(res.data); 
          };
        
           
           const fetchAllCity = async (sid)=>{
             var res = await postData('statecity/fetch_cities',{stateid:sid})
             setCityList(res.data)
           
          }
        
           const handleStateChange=(e)=>{
              setState(e.target.value)
              fetchAllCity(e.target.value)
            }
        
          
            useEffect(function(){
              fetchAllState()
            },[])
        
            const fillState=()=>{
             
              return stateList.map((item)=>{
                return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
              })
            }
        
             const fillCity=()=>{
              
              return cityList.map((item)=>{
                return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
              })
            }
      
       const handlePictureChange = (e) => {
           setPhotograph((prev)=>({...prev,
           bytes: e.target.files[0],
           fileName: URL.createObjectURL(e.target.files[0]),
           }));
           setStatusButton(true)
   
  }

 const showDeliveryPictureInterface = () => {
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
              <img src={photograph.fileName} style={{ width: 100,borderRadius:10 }} />
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

    const showDeliveryInterface=()=>{
         return (
 <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div className={classes.heading}>
                <div className={classes.titleBox}>
                  <div className={classes.subTitleStyle}>
                    New Delivery Order in {branch?.branchname}
                  </div>
                </div>
              </div>
            </Grid>

    
        <Grid size={2.5}>
            <div style={{ paddingRight: "5px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                  label="State"
                  value={branchName}
                  onChange={handleBranchChange}>
                  <MenuItem>-Select Branch-</MenuItem>
                  {fillBranch()}
                </Select>
              </FormControl>
            </div>
          </Grid>

      
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setDeliveryName(e.target.value)}
              label="Delivery Name"
              fullWidth
              value={deliveryName}
              helperText={error?.deliveryName}
              error={error?.deliveryName}
              onFocus={() => handleError("deliveryName", "")}
              size="small"
            />
          </div>
        </Grid>

        
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              type="date"
              fullWidth
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              helperText={error?.dob}
              error={error?.dob}
              onFocus={() => handleError("dob", "")}
              size="small"
            />
          </div>
        </Grid>

        
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <FormControl component="fieldset" error={!!error?.gender}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel
                  value="Male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio size="small" />}
                  label="Female"
                />
              </RadioGroup>
              <FormHelperText>{error?.gender}</FormHelperText>
            </FormControl>
          </div>
        </Grid>

        
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setMobileNo(e.target.value)}
              label="Mobile No"
              fullWidth
              value={mobileNo}
              helperText={error?.mobileNo}
              error={error?.mobileNo}
              onFocus={() => handleError("mobileNo", "")}
              size="small"
            />
          </div>
        </Grid>

        
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setEmailId(e.target.value)}
              label="Email ID"
              fullWidth
              value={emailId}
              helperText={error?.emailId}
              error={error?.emailId}
              onFocus={() => handleError("emailId", "")}
              size="small"
            />
          </div>
        </Grid>

        
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              fullWidth
              value={address}
              helperText={error?.address}
              error={error?.address}
              onFocus={() => handleError("address", "")}
              size="small"
            />
          </div>
        </Grid>

        
      <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setAddharNo(e.target.value)}
              label="Addhar Number"
              fullWidth
              value={addharNo}
              helperText={error?.addharNo}
              error={error?.addharNo}
              onFocus={() => handleError("addharNo", "")}
              size="small"
            />
          </div>
        </Grid>


         <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setVehicleNo(e.target.value)}
              label="Vehicle Number"
              fullWidth
              value={vehicleNo}
              helperText={error?.vehicleNo}
              error={error?.vehicleNo}
              onFocus={() => handleError("vehicleNo", "")}
              size="small"
            />
          </div>
        </Grid>


        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
              fullWidth
              value={status}
              helperText={error?.status}
              error={error?.status}
              onFocus={() => handleError("status", "")}
              size="small"
            />
          </div>
        </Grid>



        <Grid size={6}>
          <div style={{ paddingLeft: "5px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                label="State"
                value={state}
                onChange={handleStateChange}>
                <MenuItem>-Select State-</MenuItem>
                {fillState()}
              </Select>
            </FormControl>
          </div>
        </Grid>

        
        <Grid size={6}>
          <div style={{ paddingLeft: "5px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}>
                <MenuItem>-Select City-</MenuItem>
                {fillCity()}
              </Select>
            </FormControl>
          </div>
        </Grid>

        
        {/* <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <IconButton
              style={{
                color: "hsla(321, 32%, 37%, 1.00)",
                display: "flex",
                flexDirection: "column",
              }}
              component="label">
              <CloudUploadIcon style={{ fontSize: 34 }} />
              <div style={{ fontSize: 12 }}>Upload</div>
              <input onChange={handleChange} type="file" hidden multiple />
            </IconButton>
          </div>
        </Grid>

        <Grid
          size={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
          <div style={{ padding: "0px 5px 0px 5px", marginRight: "50%" }}>
            <img src={photograph.fileName} style={{ width: 40 }} />
          </div>
          <div
            style={{
              color: "#d32f2f",
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              fontWeight: 400,
              fontSize: "0.75rem",
              lineHeight: "1.66rem",
            }}>
            {error?.fileError == null ? "" : error.fileError}
          </div>
        </Grid>*/}

        
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px", marginLeft: "10%" }}>
            <IconButton
              onClick={handleClick}
              style={{
                color: "hsla(321, 32%, 37%, 1.00)",
                display: "flex",
                flexDirection: "column",
                marginLeft: "190px",
              }}>
              <SaveIcon style={{ fontSize: 34 }} />
              <div style={{ fontSize: 12 }}>Save</div>
            </IconButton>
          </div>
        </Grid> 

        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <IconButton
              onClick={clearValues}
              style={{
                color: "hsla(321, 32%, 37%, 1.00)",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20%",
              }}>
              <DeleteForeverIcon style={{ fontSize: 34 }} />
              <div style={{ fontSize: 12 }}>Clear</div>
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
);

}
    

    const fetchAllDelivery = async ()=>{
        var response = await postData('delivery/fetch_all_delivery_body')
        setDeliveryList(response.data)
    }

    useEffect(function(){
        fetchAllDelivery()
    },[])

    const handleCancle = ()=>{
        setPhotograph({fileName:tempImage,bytes:''})
        setStatusButton(false)
    }

    const handleEditDeliveryPicture=async()=>{
              var formData = new FormData()
              formData.append("delivery_id",deliveryId)
              formData.append("photograph",photograph.bytes)
               formData.append('createddate',getDate())
                formData.append('createdtime',getTime())
            
            
              var response = await postData("delivery/edit_delivery_body_photograph", formData);
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
                    fetchAllDelivery();
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
                 <Button onClick={handleEditDeliveryPicture}  style={{ background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Save</Button>
                     <Button onClick={handleCancle}  style={{ background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Cancel</Button>
                
                    </div>
                  }


     const handleDelete = async(did)=>{
                   Swal.fire({
                    title: "Do you want to delete the selected food item?",
                   
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                   
                  }).then(async(result) => {
                   if (result.isConfirmed) {
                      var response= await postData('delivery/delete_delivery_body',{delivery_id:did})
                      Swal.fire(response.message);
                      fetchAllDelivery()
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
                }

    
    const handleOpenDialog=(rowData,status)=>{
        setDialogState(status)
        setDeliveryId(rowData.delivery_id)
        setBranchId(rowData.branchid)
        setBranchName(rowData.branchid)
        setDeliveryName(rowData.deliveryname)
        setDob(rowData.dob)
        setEmailId(rowData.emailid)
        setGender(rowData.gender)
        setMobileNo(rowData.mobileno)
        setAddharNo(rowData.addharno)
        setAddress(rowData.address)
        setCity(rowData.cityid)
        setState(rowData.stateid)
        setStatus(rowData.status)
        setVehicleNo(rowData.vehicleno)
        
        fetchAllBranch()
        fetchAllCity(rowData.stateid)
        setPhotograph({ fileName: `${serverURL}/images/${rowData.photograph}`, bytes: "" })
        setTempImage(`${serverURL}/images/${rowData.photograph}`)
        setStatusButton(false)
        setOpen(true)
    }


    const handleCloseDialog=()=>{
          setOpen(false)
        }
        
         const showDialog = () => {
            return (
              <div>
                <Dialog open={open} onClose={handleCloseDialog}>
                  <DialogContent>
                    {dialogState == "Data"?showDeliveryInterface(): showDeliveryPictureInterface()}
                  </DialogContent>
                </Dialog>
              </div>
            );
          };



          const displayDelivery=()=>{
                      return(
                         <MaterialTable style={{width:'100%'}}
                            title={`List of Employees in ${branch?.branchname}`}   // heading me name show karane ke liye//
                            columns={[
                                {title:'Branch Name',field:'branchname'},
                                {title:'Delivery Boy Name',field:'deliveryname'},
                                {title:'Email ID',field:'emailid'},
                                {title:'DOB',field:'dob'},
                                {title:'Gender',field:'gender'},
                                {title:'Mobile Number',field:'mobileno'},
                                {title:'Addhar No',field:'addharno'},
                                {title:'Address',field:'address'},
                                {title:'city Name',field:'cityname'},
                                {title:'State Name',field:'statename'},
                                {title:'Status',field:'status'},
                                {title:'Vehicle No',field:'vehicleno'},

                                {
                                    title: "Picture",render: (rowData) => (<div onClick={() => handleOpenDialog(rowData, "photograph")}>
                                      <EditIconComponent image={rowData.photograph} />
                                      </div>
                                    ),
                                  },
                            ]}
                            data={deliveryList}
                            actions={[
                                {icon: 'edit',
                                    tooltip: 'Edit',
                                    onClick:(event,rowData)=> handleOpenDialog(rowData,"Data")
                                },
                    
                             
                        
                                {icon: 'delete',
                                    tooltip: 'Delete',
                                    onClick:(event,rowData)=> handleDelete(rowData.delivery_id)
                                },
                                
                            ]}
                            />
                      )
                    }
                
                    return(<div className={classes.root}>
                    <div className={classes.box}>
                       {displayDelivery()}
                    </div>
                   {showDialog()}
                    
                </div>
                    
                    
                    )
                

    
      






}