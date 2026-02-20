import {
  IconButton,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/fast-food.png";
import { useState, useEffect } from "react";
import { getDate, getTime, postData,getData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: "70%",
    height: "auto",
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: 10,
  },
  heading: {
    width: "100%",
    height: "auto",
    background:"linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#000",
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
  },
  titleBox: {
    display: "flex",
    // justifyContent: "center",
    //alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));
export default function BatchInterface({ refresh, setRefresh }) {
    var classes = useStyle();
  const [branchId, setBranchId] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [session, setSession] = useState("");
  const [createdtime, setCreatedtime] = useState("");
  const [createddate, setCreateddate] = useState("");
  const [userid, setUserid] = useState("xxxxx");
  const [error, setError] = useState({ fileError: null });
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const fetchAllBranch = async () => {
    var res = await getData("batch/fetch_branch");
    setBranchList(res.data);
  };

  const validation = () => {
    var isError = false;
    if (branchId.length == 0) {
      setError((prev) => ({
        ...prev,
        branchId: "Pls Input Branch Name...",
      }));
      isError = true;
    }
    if (batchName.length == 0) {
      setError((prev) => ({
        ...prev,
        batchName: "Pls Input Batch Name...",
      }));
      isError = true;
    }

    if (session.length == 0) {
      setError((prev) => ({
        ...prev,
        session: "Pls Input Session...",
      }));
      isError = true;
    }
   

    return isError;
  };

  
  
    const handleClick = async () => {
       if (!validation()) {
      
       var body = {
         branchid: branchId,
            batchname: batchName,
            session: session,
          
         createddate: getDate(),
         createdtime: getTime(),
         
         userid: "xxxx-xxxx",

       };
     };
   
       var response = await postData("batch/submit_batch", body);
       if(response.status){
             Swal.fire({
               position: 'center',
               icon: 'success',
               title: (response.message),
               showConfirmButton: false,
               timer: 3000,
               toast: true
             })
           }
           else{
             Swal.fire({
               position: 'center',
               icon: 'error',
               title: (response.message),
               showConfirmButton: false,
               timer: 3000,
               toast: true
             })
           }
           setRefresh(!refresh);
     };

  useEffect(function () {
    fetchAllBranch();
  }, []);
  const fillbranch = () => {
    return branchList.map((item) => {
      return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
    });
  };

  
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.subTitleStyle}>New Batch</div>
              </div>
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingLeft: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.branchId}
                error={error?.branchId}
                onFocus={() => handleError("branchId", null)}
              >
                <InputLabel>Branch</InputLabel>
                <Select
                  label="Branch"
                  onChange={(e) => setBranchId(e.target.value)}
                >
                  <MenuItem>-Select Branch-</MenuItem>
                  {fillbranch()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setBatchName(e.target.value)}
                label="Batch Name"
                fullWidth
                helperText={error?.batchName}
                error={error?.batchName}
                onFocus={() => handleError("batchName", null)}
                size="small"
              />
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingLeft: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.session}
                error={error?.session}
                onFocus={() => handleError("session", null)}
              >
                <InputLabel>Session</InputLabel>
                <Select
                  label="Session"
                  onChange={(e) => setSession(e.target.value)}
                >
                  <MenuItem>-Select Session-</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                  <MenuItem value="2029">2029</MenuItem>
                  <MenuItem value="2030">2030</MenuItem>
                  <MenuItem value="2031">2031</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
         
          <Grid size={6}>
            <div style={{ padding: "0px 5px 0px 5px" ,display: "flex", justifyContent: "center", alignItems: "center" }}>
              <IconButton
                onClick={handleClick}
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SaveIcon style={{ fontSize: 34 }} />
                <div style={{ fontSize: 12 }}>Save</div>
              </IconButton>
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ padding: "0px 5px 0px 5px" ,display: "flex", justifyContent: "center", alignItems: "center"  }}>
              <IconButton
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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

