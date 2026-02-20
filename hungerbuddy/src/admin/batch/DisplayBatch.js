import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { getData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import EditIconComponents from "../../components/EditIconComponent"
import {
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Button,
  IconButton,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getDate, getTime, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from '@mui/icons-material/Clear';
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    fontFamily: "'Exo 2'",
  },
  maincontainer: {
    width: "70%",
    height: "auto",

    borderRadius: 10,
    paddingBottom: 10,
  },
  headcontainer: {
    height: 70,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: "white",
    fontFamily: "'Exo 2'",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: "1px",
    padding: "5px 0px 0px 30px",
  },
  fields: {
    padding: "0px 10px 0px 10px",
  },
}));
export default function DisplayBatch({ refresh, setRefresh }) {
  const classes = useStyles();
  const [batchList, setBatchList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [open, setOpen] = useState(false);

    useEffect(() => {
      fetchallbatch();
    }, [refresh]);

  /*************************batch content**************************************/
 

  const [branchId, setBranchId] = useState("");
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
          batchid: batchId,

       };
     };
   
       var response = await postData("batch/edit_batch", body);
       if(response.status){
        fetchallbatch();
        handleCloseDialog();
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

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, fileError: null }));
  };
 const showBatchInterface = () => {
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={handleCloseDialog}>
                          <ClearIcon />
                        </IconButton>
                      </div>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.subTitleStyle}>New Batch</div>
              </div>
            </div>
          </Grid>
          <Grid size={6} className={classes.fields}>
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
                  value={branchId}
                >
                  <MenuItem>-Select Branch-</MenuItem>
                  {fillbranch()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={6}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setBatchName(e.target.value)}
                label="Batch Name"
                fullWidth
                helperText={error?.batchName}
                error={error?.batchName}
                onFocus={() => handleError("batchName", null)}
                size="small"
                value={batchName}
              />
            </div>
          </Grid>
          <Grid size={6} className={classes.fields}>
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
                  value={session}
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



  /****************************************************************************************/
  const fetchallbatch = async () => {
    var result = await getData("batch/fetch_batch");
    if (result.status) {
      setBatchList(result.data);
    }
  };

  useEffect(function () {
    fetchallbatch();
  }, []);

  const handleOpenDialog = (rowData) => {
    setBatchId(rowData.batchid);
    setBranchId(rowData.branchid);
    setBatchName(rowData.batchname);
    setSession(rowData.session);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handelDelete = async (bid) => {
    Swal.fire({
      title: "Do you want to delete the selected batch?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await postData("batch/delete_batch", {
          batchid:bid,
        });
        fetchallbatch();

        Swal.fire(response.message);
      } else if (result.isDenied) {
        Swal.fire(response.message);
      }
    });
  };

  const showDialog = () => {
    return (
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          {showBatchInterface()}
        </DialogContent>
      </Dialog>
    );
  };

  const displaybatch = () => {
    return (
      <div>
        <MaterialTable
          title="List of batches"
          columns={[
            { title: "Branch ID", field: "branchname" },
            { title: "Batch Name", field: "batchname" },
            { title: "Session", field: "session" },

            
          ]}
          data={batchList}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Batch",
              onClick: (event, rowData) => handleOpenDialog(rowData, "data"),
            },
            {
              icon: "delete",
              tooltip: "Delete Category",
              onClick: (event, rowData) => handelDelete(rowData.batchid),
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.maincontainer}>
        {displaybatch()}
        {showDialog()}
      </div>
    </div>
  );
}

