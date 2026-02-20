import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { getData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import EditIconComponents from "../../components/EditIconComponent";
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
import ClearIcon from "@mui/icons-material/Clear";
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
 subtittlestyle: {
        fontWeight: 700,
        color: '#fff',
        fontSize: 16,

    },
}));
export default function DisplaySection({ refresh, setRefresh }) {
  const classes = useStyles();
  const [sectionList, setSectionList] = useState([]);
  const [branchList, setBranchList] = useState([]);
    const [batchList, setBatchList] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchallsection();
  }, [refresh]);

  /*************************batch content**************************************/
const [branchId, setBranchId] = useState("");  
  const [batchId, setBatchId] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [createdtime, setCreatedtime] = useState("");
  const [createddate, setCreateddate] = useState("");
  const [userid, setUserid] = useState("xxxxx");
  const [error, setError] = useState({ fileError: null });
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const fetchAllBranch = async () => {
    var res = await getData("section/fetch_branch");
    setBranchList(res.data);
  };
  const fetchAllbatch = async () => {
    var res = await getData("section/fetch_batch");
    setBatchList(res.data);
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
    if (batchId.length == 0) {
      setError((prev) => ({
        ...prev,
        batchId: "Pls Input Batch Name...",
      }));
      isError = true;
    }

    if (sectionName.length == 0) {
      setError((prev) => ({
        ...prev,
        sectionName: "Pls Input Section...",
      }));
      isError = true;
    }

    return isError;
  };

  const handleClick = async () => {
    if (!validation()) {
      var body = {
        sectionid: sectionId,
        branchid: branchId,
        batchid: batchId,
        sectionname: sectionName,

        createddate: getDate(),
        createdtime: getTime(),

        userid: "xxxx-xxxx",
      };
    }

    var response = await postData("section/edit_section", body);
    if (response.status) {
        fetchallsection()
        handleCloseDialog()
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
        position: "center",
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
    setRefresh(!refresh);
  };

  useEffect(function () {
    fetchAllBranch();
    fetchAllbatch();
  }, []);
  const fillbranch = () => {
    return branchList.map((item) => {
      return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
    });
  };

  const fillbatch = () => {
    return batchList.map((item) => {
      return <MenuItem value={item.batchid}>{item.batchname}</MenuItem>;
    });
  };

  
  const showSectionInterface = () => {
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div   className={classes.subtittlestyle}>New Section</div>
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
                onFocus={() => handleError("branchId", null)
                }
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
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingLeft: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.batchId}
                error={error?.batchId}
                onFocus={() => handleError("batchId", null)}
              >
                <InputLabel>Batch</InputLabel>
                <Select
                  label="Batch"
                  onChange={(e) => setBatchId(e.target.value)}
                    value={batchId}
                >
                  <MenuItem>-Select Batch-</MenuItem>
                  {fillbatch()}
                </Select>
              </FormControl>
            </div>
          </Grid>

          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setSectionName(e.target.value)}
                label="Section Name"
                fullWidth
                helperText={error?.sectionName}
                error={error?.sectionName}
                onFocus={() => handleError("sectionName", null)}
                size="small"
                value={sectionName}
              />
            </div>
          </Grid>

          <Grid size={6}>
            <div
              style={{
                padding: "0px 5px 0px 5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            <div
              style={{
                padding: "0px 5px 0px 5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
  const fetchallsection = async () => {
    var result = await getData("section/fetch_section");
    if (result.status) {
      setSectionList(result.data);
    }
  };

  useEffect(function () {
    fetchallsection();
  }, []);

  const handleOpenDialog = (rowData) => {
    setSectionId(rowData.sectionid);
    setBatchId(rowData.batchid);
    setBranchId(rowData.branchid);
    setSectionName(rowData.sectionname);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handelDelete = async (sid) => {
    Swal.fire({
      title: "Do you want to delete the selected section?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await postData("section/delete_section", {
          sectionid: sid,
        });
        fetchallsection();

        Swal.fire(response.message);
      } else if (result.isDenied) {
        Swal.fire(response.message);
      }
    });
  };

  const showDialog = () => {
    return (
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>{showSectionInterface()}</DialogContent>
      </Dialog>
    );
  };

  const displaysection = () => {
    return (
      <div>
        <MaterialTable
          title="List of sections"
          columns={[
            { title: "Branch ID", field: "branchname" },
            { title: "Batch Name", field: "batchname" },
            { title: "Section", field: "sectionname" },
          ]}
          data={sectionList}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Section",
              onClick: (event, rowData) => handleOpenDialog(rowData, "data"),
            },
            {
              icon: "delete",
              tooltip: "Delete Section",
              onClick: (event, rowData) => handelDelete(rowData.sectionid),
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.maincontainer}>
        {displaysection()}
        {showDialog()}
      </div>
    </div>
  );
}
