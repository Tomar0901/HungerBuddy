import { Button, Grid, TextField,IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import {FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText} from "@mui/material"
import {postData ,getData,getTime,getDate,serverURL} from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/burger.png";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Refresh } from "@mui/icons-material";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
   // height: "100%",
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

export default function DeliveryInterface(){
    var classes = useStyle()
   

    const [branchId,setBranchId] = useState('')
    const [branchName,setBranchName] = useState('')
    const [branchNameList,setBranchNameList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
// ==========================================================//
    const [deliveryName,setDeliveryName] = useState("")
    const [dob,setDob] = useState("");
    const [gender,setGender] = useState("");
    const [emailId, setEmailId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address,setAddress] = useState("")
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addharNo,setAddharNo] = useState("")
    const [status,setStatus] = useState("Available")
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

const generatePassword=()=>{
  var sp=['@','#','$','!','&','1','2','3','4','5','6','7','8','9']
  var pwd=''
  for(var i=1;i<=8;i++)
  {
    var j=sp[parseInt(Math.random(14))]
    pwd+=j

  }
  return pwd
}

const handleClick = async () => {
 
    var err = validation();
    
    if (err == false) {
    
      var pwd = generatePassword()
      var formData = new FormData();
      
    
      formData.append("branchid", branchId)
      formData.append("deliveryname", deliveryName);
      formData.append("emailid", emailId);
      formData.append("dob",dob);
      formData.append("gender",gender);
      formData.append("mobileno", mobileNo);
      formData.append("address", address);
      formData.append("addharno",addharNo);
      formData.append("status",status);
      formData.append("vehicleno", vehicleNo);
      formData.append("stateid", state);
      formData.append("cityid", city);
      formData.append("photograph", photograph.bytes);
      formData.append("password",pwd);
      formData.append("createddate", getDate())
      formData.append("createdtime", getTime())
      
      var response = await postData("delivery/submit_delivery_body", formData);
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




      return (
  <div className={classes.root}>
    <div className={classes.box}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className={classes.heading}>
            <div className={classes.titleBox}>
              <div className={classes.subTitleStyle}>
                 {/* {branch?.branchname}  */}
                New Delivery Person 
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

        
        <Grid size={6}>
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
        </Grid>

        
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