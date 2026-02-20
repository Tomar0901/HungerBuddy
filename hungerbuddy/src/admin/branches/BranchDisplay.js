import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData ,postDatabranch,postData, getDate,getTime} from "../../services/FetchNodeServices";
import {IconButton, Button, Grid, TextField,Dialog,DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";

import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";

const useStyle=makeStyles(()=>({
       root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },

    box: {
        width: '70%',
        height: 'auto',
        padding:10
      
    },

    heading: {
        width: '100%',
        height: 'auto',
        background: 'linear-gradient(90deg, hsla(321,41%,24%,1) 0%, hsla(330,53%,77%,1) 100%)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
          display: "flex",
    flexDirection: "row",

    },

    tittleStyle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 24,

    },

     subtittlestyle: {
        fontWeight: 700,
        color: '#fff',
        fontSize: 16,

    },

    tittlebox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '30%',
        padding: 10
    }
}))


export default function BranchDisplay({refresh,setRefresh}){
     const classes=useStyle()
     /*************************************** *********************/
     const[branchId,setbranchId]=useState('')
      const [branchlist,setBranchList]=useState([])
    const [open,setOpen]=useState(false)
       const [branchName,setbranchName]=useState('')
        const [Address,setAddress]=useState('')
        const [Latlong,setLatlong]=useState('')
        const [State,setState]=useState('')
         const [City,setCity]=useState('')
        const [StateList,setStateList]=useState([])
        const [CityList,setCityList]=useState([])
        const [EmailId,setEmailId]=useState('')
        const [contactNumber,setContactNumber]=useState('')
        const [contactPerson,setContactPerson]=useState('')
        const [error,setError]=useState('')

    /* state city */
     const fetchAllState=async()=>{
                var res=await getData('statecity/fetch_states')
                setStateList(res.data)
            } 
    
             useEffect(function() {
                fetchAllState()
            },[])
    
              const fetchAllCity=async(sid)=>{
                var res=await postData('statecity/fetch_cities',{stateid:sid})
                setCityList(res.data)
            } 
    
    
             const handleStateChange=(e)=>{
            setState(e.target.value)
            fetchAllCity(e.target.value)
        }
    
           const fillStates=()=>{
               return StateList.map((item)=>{
                 return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
               })
             }
    
              const fillCities=()=>{
               return CityList.map((item)=>{
                 return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
               })
             }
    

    /* **************      *******************************/
    


          useEffect(()=>{
          fetchAllBranch()
  },[refresh])

        const handleError=(label,message)=>{
            setError((prev)=>({...prev,[label]:message}))
             
             
        }

        const validation=()=>{
            var isError=false

             if(branchName.length===0)
         {
              setError((prev)=>({...prev,'branchName':'Pls Input Branch Name...'}))
                 isError=true
         }

              if(Address.length===0)
         {
              setError((prev)=>({...prev,'Address':'Pls Input Address...'}))
                 isError=true
         }

            if(Latlong.length===0)
         {
              setError((prev)=>({...prev,'Latlong':'Pls Input Latlong...'}))
                 isError=true
         }

             if(State.length===0)
         {
              setError((prev)=>({...prev,'State':'Pls Input State...'}))
                 isError=true
         }

             if(City.length===0)
         {
              setError((prev)=>({...prev,'City':'Pls Input City...'}))
                 isError=true
         }

          if(EmailId.length===0)
         {
              setError((prev)=>({...prev,'EmailId':'Pls Input EmailID...'}))
                 isError=true
         }

         if(contactNumber.length===0)
         {
              setError((prev)=>({...prev,'contactNumber':'Pls Input contactNumber...'}))
                 isError=true
         }
         if(contactPerson.length===0)
         {
              setError((prev)=>({...prev,'contactPerson':'Pls Input contactPerson...'}))
                 isError=true
         }
    return isError
        }



         const handleClick=async()=>{
            var err=validation()
           if(err===false){
        var body={branchid: branchId,branchname:branchName,address:Address,latlong:Latlong,stateid:State,cityid:City,emailid:EmailId,contactnumber:contactNumber,contactperson:contactPerson,createddate:getDate(),createdtime:getTime(),userid: "xxxxx"}
         var response=await postDatabranch('branch/edit_branch',body)
        if(response.status){
             Swal.fire({
                      position: "center",
                      icon: "success",
                      title: response.message,
                      showConfirmButton: false,
                      timer: 3000,
                      toast: true,
                    });
            
                    setOpen(false);
                    fetchAllBranch();
            
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
    

     const showBranchInterFace=()=>{
    return (
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.tittlebox}>
                                <div className={classes.tittleStyle}> HungerBuddy</div>
                                <div className={classes.subtittlestyle}>New Food Category</div>
                            </div>
                             <div style={{ marginLeft: "auto" }}>
                                          <IconButton onClick={handleCloseDialog}>
                                            <CloseIcon style={{ color: "#ffff" }} />
                                          </IconButton>
                             </div>
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setbranchId(e.target.value)} value={branchId} label='Branch Id' fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setbranchName(e.target.value)} value={branchName} label='Branch Name' fullWidth helperText={error?.branchName} error={error?.branchName} onFocus={()=>handleError('branchName',null)} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setAddress(e.target.value)} value={Address} label='Address' fullWidth helperText={error?.Address} error={error?.Address} onFocus={()=>handleError('Address',null)} ></TextField>
                        </div>
                    </Grid>

                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                    <FormControl size="small" fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select label="State" value={State} onChange={handleStateChange}>
                        <MenuItem>-Select State-</MenuItem>
                        {fillStates()}
                    </Select>
                     </FormControl>
                            {/* <TextField onChange={(e) => setState(e.target.value)} value={State} label='State' fullWidth helperText={error?.State} error={error?.State} onFocus={()=>handleError('State',null)} ></TextField> */}
                        </div>
                    </Grid>

                    <Grid size={6} >
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <FormControl size="small" fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select label="City" value={City} onChange={(e)=>setCity(e.target.value)} >
                        <MenuItem>-Select City-</MenuItem>
                        {fillCities()}
                    </Select>
                     </FormControl>
                            {/* <TextField onChange={(e) => setCity(e.target.value)} value={City} label='City' fullWidth helperText={error?.City} error={error?.City} onFocus={()=>handleError('City',null)} ></TextField> */}
                        </div>
                    </Grid>

                    <Grid size={6}>
                         <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setLatlong(e.target.value)} value={Latlong} label='latitude longitude' fullWidth helperText={error?.Latlong} error={error?.Latlong} onFocus={()=>handleError('Latlong',null)}></TextField>
                        </div>
                      
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setEmailId(e.target.value)} value={EmailId} label='Email ID' fullWidth helperText={error?.EmailId} error={error?.EmailId} onFocus={()=>handleError('EmailId',null)} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} label='Contact Number' fullWidth helperText={error?.contactNumber} error={error?.contactNumber} onFocus={()=>handleError('ContactNumber',null)}></TextField>
                        </div>
                    </Grid>

                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setContactPerson(e.target.value)}value={contactPerson} label='Contact Person' fullWidth helperText={error?.contactPerson} error={error?.contactPerson} onFocus={()=>handleError('contactPerson',null)} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button onClick={handleClick} style={{background:'hsla(321,41%,24%,1)'}} variant="contained" fullWidth>
                            Save
                        </Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button  style={{background:'hsla(321,41%,24%,1)'}} variant="contained" fullWidth>
                            Clear
                        </Button>
                        </div>
                    </Grid>
                </Grid>

    )
  }


     /*************************************** *********************/
   

    const fetchAllBranch=async()=>{
         var response=await getData('branch/fetch_all_branch')
         setBranchList(response.data)
       }

        useEffect(function(){
            fetchAllBranch()
          },[])
           
         const handleOpenDialog=(rowData)=>{
          fetchAllCity(rowData.stateid)
          setbranchId(rowData.branchid)
          setbranchName(rowData.branchname)
          setAddress(rowData.address)
          setLatlong(rowData.latlong)
          setState(rowData.stateid)
          setCity(rowData.cityid)
          setEmailId(rowData.emailid)
          setContactNumber(rowData.contactnumber)
          setContactPerson(rowData.contactperson)
              setOpen(true)
         }

         const handleCloseDialog=()=>{
          setOpen(false)
         }

          const showDialog=()=>{
                return(
                   <Dialog open={open} 
                   onClose={handleCloseDialog}>
                    
                      <DialogContent>
                       {showBranchInterFace()}
                      </DialogContent>
                   </Dialog>
                )
          } 


                       const handleDelete = async (bid) => {
                           Swal.fire({
                             title: "Do you want to delete the selected Branch?",
                             showCancelButton: true,
                             confirmButtonText: "Delete",
                           }).then(async (result) => {
                             /* Read more about isConfirmed, isDenied below */
                             if (result.isConfirmed) {
                               var response = await postDatabranch("branch/delete_branch", {
                                 branchid: bid,
                               });
                               Swal.fire(response.message);
                               fetchAllBranch();
                             } else if (result.isDenied) {
                               Swal.fire("Changes are not saved", "", "info");
                             }
                           });
                         };


          const displayBranch=()=>{
                  return(
                      <div style={{display:'flex',maxWidth:'100%',justifyContent:'center'}}>
                        <div style={{width:'100%'}}>
                          <MaterialTable
                          title='List of All Branches'
                        columns={[
                          {title:'Branch ID',field:'branchid'},
                        { title:'Branch Name',field:'branchname'},
                        { title:'Address',field:'address'},
                        { title:'Latitude-Longitude',field:'latlong'},
                        { title:'City',field:'cityname'},
                        { title:'State',field:'statename'},
                        { title:'EmailId',field:'emailid'},
                        { title:'ContactNumber',field:'contactnumber'},
                        { title:'ContactPerson',field:'contactperson'},
                                     
                                           
                        ]}
                      data={branchlist} 
                      actions={[
                        {
                        icon:'edit',
                        tooltip:'Edit',
                        onClick:(event,rowData)=>handleOpenDialog(rowData)
                        },
                         {
                                 icon: "delete",
                                tooltip: "Delete",
                                onClick: (event, rowData) => handleDelete(rowData.branchid)
          },
                      ]}
                          />
                          </div>
                      </div>
                  )
              }
              return(
                  <div >
                     {displayBranch()}
                     {showDialog()}
                  </div>
              )
}