import { makeStyles } from "@mui/styles";
import { useState,useEffect } from "react";
import { TextField,Grid,Button,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { postDatabranch,getData,postData, getDate, getTime } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";



const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',

        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },

    box: {
        width:'70%',
        height: 'auto',
        border: '0.7px solid  hsla(321,41%,24%,1)',
        borderRadius: 5,
        margin: 10,
        paddingBottom:'10px'
    },

    heading: {
        width: '100%',
        height: 'auto',
        background: 'linear-gradient(90deg, hsla(321,41%,24%,1) 0%, hsla(330,53%,77%,1) 100%)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,


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




export default function BranchForm({refresh,setRefresh}) {
    var classes = useStyle()
   
    const [branchName,setbranchName]=useState('')
        const [Address,setAddress]=useState('')
        const [Latlong,setLatlong]=useState('')
        const [State,setState]=useState([])
        const [City,setCity]=useState([])
        const [StateList,setStateList]=useState([])
        const [CityList,setCityList]=useState([])
        const [EmailId,setEmailId]=useState('')
        const [contactNumber,setContactNumber]=useState('')
        const [contactPerson,setContactPerson]=useState('')
        const [error,setError]=useState('')

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
           
        const generatePassword = ()=>{
          var sp=['@','#','$','!','&','1','2','3','4','5','6','7','8','9','0']
          var pwd=''
           for(var i=0;i<=8;i++)
            {
                var j=sp[parseInt(Math.random()*14)]
                pwd+=j
            } 
            return pwd 
        }

         const handleClick=async()=>{
            var err=validation()
           if(err===false){
        var body={branchname:branchName,address:Address,latlong:Latlong,stateid:State,cityid:City,emailid:EmailId,contactnumber:contactNumber,contactperson:contactPerson,createddate:getDate(),createdtime:getTime(), userid: "xxxxx",password:generatePassword()}

         var response=await postDatabranch('branch/submit_branch',body)
        if(response.status){
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
     setRefresh(!refresh)
    }
     
   

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.tittlebox}>
                                
                                <div className={classes.subtittlestyle}>New Food Category</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setbranchName(e.target.value)} label='Branch Name' size="small" fullWidth helperText={error?.branchName} error={error?.branchName} onFocus={()=>handleError('branchName',null)} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setAddress(e.target.value)} label='Address' size="small" fullWidth helperText={error?.Address} error={error?.Address} onFocus={()=>handleError('Address',null)} ></TextField>
                        </div>
                    </Grid>

                    <Grid size={2}>
                        <div style={{ paddingRight:"5px"}}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select label="State" value={State} onChange={handleStateChange}>
                                <MenuItem>-Select State-</MenuItem>
                                {fillStates()}
                                </Select>
                            </FormControl>
                           {/* <TextField onChange={(e) => setState(e.target.value)} size="small" label='State' fullWidth helperText={error?.State} error={error?.State} onFocus={()=>handleError('State',null)} ></TextField> */}
                        </div>
                    </Grid>

                    <Grid size={2} >
                        <div style={{ paddingLeft: '5px' }}>
                             <FormControl size="small" fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select label="City" value={City} onChange={(e)=>setCity(e.target.value)}>
                                <MenuItem>-Select City-</MenuItem>
                                {fillCities()}
                                </Select>
                            </FormControl>
                            {/* <TextField onChange={(e) => setCity(e.target.value)} size="small" label='City' fullWidth helperText={error?.City} error={error?.City} onFocus={()=>handleError('City',null)} ></TextField> */}
                        </div>
                    </Grid>
                     <Grid size={2}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button onClick={handleClick} style={{background:'hsla(321,41%,24%,1)'}} variant="contained" fullWidth>
                            Save
                        </Button>
                        </div>
                    </Grid>

                    <Grid size={2}>
                         <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setLatlong(e.target.value)} size="small" label='latitude longitude' fullWidth helperText={error?.Latlong} error={error?.Latlong} onFocus={()=>handleError('Latlong',null)}></TextField>
                        </div>
                      
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setEmailId(e.target.value)} size="small" label='Email ID' fullWidth helperText={error?.EmailId} error={error?.EmailId} onFocus={()=>handleError('EmailId',null)} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={2}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setContactNumber(e.target.value)} size="small" label='Contact Number' fullWidth helperText={error?.contactNumber} error={error?.contactNumber} onFocus={()=>handleError('ContactNumber',null)}></TextField>
                        </div>
                    </Grid>

                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField onChange={(e) => setContactPerson(e.target.value)} size="small" label='Contact Person' fullWidth helperText={error?.contactPerson} error={error?.contactPerson} onFocus={()=>handleError('contactPerson',null)} ></TextField>
                        </div>
                    </Grid>
                   
                    <Grid size={2}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button  style={{background:'hsla(321,41%,24%,1)'}} variant="contained" fullWidth>
                            Clear
                        </Button>
                        </div>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}