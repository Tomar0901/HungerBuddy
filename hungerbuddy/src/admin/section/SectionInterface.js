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
import {
  getDate,
  getTime,
  postData,
  getData,
} from "../../services/FetchNodeServices";
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
    color: "#fff",
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#000",
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
export default function SectionInterface({ refresh, setRefresh }) {
  var classes = useStyle();
  const [branchId, setBranchId] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [batchId, setBatchId] = useState("");
    const [batchList, setBatchList] = useState([]);
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
        branchid: branchId,
        batchid: batchId,
        sectionname: sectionName,

        createddate: getDate(),
        createdtime: getTime(),

        userid: "xxxx-xxxx",
      };
    }

    var response = await postData("section/submit_section", body);
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

  
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.subTitleStyle}>New Section</div>
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
