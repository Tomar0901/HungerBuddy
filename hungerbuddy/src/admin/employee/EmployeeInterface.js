import {
  TextField,
  IconButton,
  Button,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import employee from "../../assets/employee.png";
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
    width: "60%",
    height: "auto",
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
    // justifyContent: "center",
    //alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));
export default function EmployeeInterface() {
  var classes = useStyle();
  const [employeename, setEmployeename] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [permanentCityList, setPermanentCityList] = useState([]);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [emailid, setEmailid] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [otherno, setOtherno] = useState("");
  const [department, setDepartment] = useState("");
  const [current_address, setCurrent_address] = useState("");
  const [current_state, setCurrent_state] = useState("");
  const [current_city, setCurrent_city] = useState("");
  const [current_pincode, setCurrent_pincode] = useState("");
  const [permanent_address, setPermanent_address] = useState("");
  const [permanent_state, setPermanent_state] = useState("");
  const [permanent_city, setPermanent_city] = useState("");
  const [permanent_pincode, setPermanent_pincode] = useState("");

  const [employee_picture, setEmployee_picture] = useState({
    bytes: "",
    fileName: employee,
  });

  const fetchAllBranch = async () => {
    var res = await getData("employee/fetch_branch");
    setBranchList(res.data);
  };
  const fetchAllState = async () => {
    var res = await getData("statecity/fetch_states");
    setStateList(res.data);
  };
  const fetchAllCity = async (stateid) => {
    var body = { stateid: stateid };
    var res = await postData("statecity/fetch_cities", body);
    setCityList(res.data);
  };
  const fetchAllPermanentCity = async (stateid) => {
    var body = { stateid: stateid };
    var res = await postData("statecity/fetch_cities", body);
    setPermanentCityList(res.data);
  };

  const [error, setError] = useState({ fileError: null });
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validation = () => {
    var isError = false;
    
    if (branchId.length == 0) {
      setError((prev) => ({
        ...prev,
        branchId: "Pls Select Branch...",
      }));
      isError = true;
    }
    if (employeename.length == 0) {
      setError((prev) => ({
        ...prev,
        employeename: "Pls Input Employee Name...",
      }));
      isError = true;
    }
    if (dob.length == 0) {
      setError((prev) => ({
        ...prev,
        dob: "Pls Input Date of Birth...",
      }));
      isError = true;
    }
    if (gender.length == 0) {
      setError((prev) => ({
        ...prev,
        gender: "Pls Input Gender...",
      }));
      isError = true;
    }
    if (emailid.length == 0) {
      setError((prev) => ({
        ...prev,
        emailid: "Pls Input Email ID...",
      }));
      isError = true;
    }
    if (mobileno.length == 0) {
      setError((prev) => ({ ...prev, mobileno: "Pls Input Mobile No..." }));
      isError = true;
    }
    if (otherno.length == 0) {
      setError((prev) => ({
        ...prev,
        otherno: "Pls Input Other's Contact No...",
      }));
      isError = true;
    }
    if (department.length == 0) {
      setError((prev) => ({
        ...prev,
        department: "Pls Select Department...",
      }));
      isError = true;
    }
    if (current_address.length == 0) {
      setError((prev) => ({
        ...prev,
        current_address: "Pls Input Current Address...",
      }));
      isError = true;
    }
    if (current_state.length == 0) {
      setError((prev) => ({
        ...prev,
        current_state: "Pls Select Current State...",
      }));
      isError = true;
    }
    if (current_city.length == 0) {
      setError((prev) => ({
        ...prev,
        current_city: "Pls Select Current City...",
      }));
      isError = true;
    }
    if (current_pincode.length == 0) {
      setError((prev) => ({
        ...prev,
        current_pincode: "Pls Input Current Pincode...",
      }));
      isError = true;
    }
    if (permanent_address.length == 0) {
      setError((prev) => ({
        ...prev,
        permanent_address: "Pls Input Permanent Address...",
      }));
      isError = true;
    }
    if (permanent_state.length == 0) {
      setError((prev) => ({
        ...prev,
        permanent_state: "Pls Select Permanent State...",
      }));
      isError = true;
    }
    if (permanent_city.length == 0) {
      setError((prev) => ({
        ...prev,
        permanent_city: "Pls Select Permanent City...",
      }));
      isError = true;
    }
    if (permanent_pincode.length == 0) {
      setError((prev) => ({
        ...prev,
        permanent_pincode: "Pls Input Permanent Pincode...",
      }));
      isError = true;
    }

    if (employee_picture.bytes.length == 0) {
      setError((prev) => ({
        ...prev,
        fileError: "Pls Upload Employee Picture...",
      }));
      isError = true;
    }

    return isError;
  };

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var formData = new FormData();
      formData.append("branchid", branchId);
      formData.append("employeename", employeename);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("emailid", emailid);
      formData.append("mobileno", mobileno);
      formData.append("otherno", otherno);
      formData.append("department", department);
      formData.append("current_address", current_address);
      formData.append("current_state", current_state);
      formData.append("current_city", current_city);
      formData.append("current_pincode", current_pincode);
      formData.append("permanent_address", permanent_address);
      formData.append("permanent_state", permanent_state);
      formData.append("permanent_city", permanent_city);
      formData.append("permanent_pincode", permanent_pincode);
      formData.append("employee_picture", employee_picture.bytes);
      formData.append("createddate", getDate());
      formData.append("createdtime", getTime());
      formData.append("userid", "xxxxx");

      //var body={categoryid:categoryIcon,categoryname:categoryName}
      var response = await postData("employee/submit_employee", formData);
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

      var body = {employeeid:response.employeeid, points: 0}
      var response = await postData("wallet/submit_employee_wallet", body);
    }

    // var body = { enrollmentno: enrollmentno, points: 0 };
    // var response = await postData("wallet/submit_student_wallet", body);
  };

  useEffect(function () {
    fetchAllBranch();
  }, []);
  const fillbranch = () => {
    return branchList?.map((item) => {
      return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
    });
  };
  
  useEffect(function () {
    fetchAllState();
  }, []);
  const fillstate = () => {
    return stateList?.map((item) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllCity();
  }, []);
  const fillcity = () => {
    return cityList?.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllPermanentCity();
  }, []);
  const fillPermanentCity = () => {
    return permanentCityList?.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>;
    });
  };

  const handleStateChange = (e) => {
    setCurrent_state(e.target.value);
    fetchAllCity(e.target.value);
  };
  const handlePermanentStateChange = (e) => {
    setPermanent_state(e.target.value);
    fetchAllPermanentCity(e.target.value);
  };

  const handleChange = (e) => {
    setEmployee_picture({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setError((prev) => ({ ...prev, fileError: null }));
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.subTitleStyle}>New Employee</div>
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
                onChange={(e) => setEmployeename(e.target.value)}
                label="Employee Name"
                fullWidth
                size="small"
                helperText={error?.employeename}
                error={error?.employeename}
                onFocus={() => handleError("employeename", null)}
              />
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setDob(e.target.value)}
                label="Date of Birth"
                fullWidth
                size="small"
                helperText={error?.dob}
                error={error?.dob}
                onFocus={() => handleError("dob", null)}
              />
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <FormControl>
                <FormLabel
                  typeof="legend"
                  id="demo-row-radio-buttons-group-label"
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setEmailid(e.target.value)}
                label="Email ID"
                fullWidth
                size="small"
                helperText={error?.emailid}
                error={error?.emailid}
                onFocus={() => handleError("emailid", null)}
              />
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setMobileno(e.target.value)}
                label="Mobile No"
                fullWidth
                size="small"
                helperText={error?.mobileno}
                error={error?.mobileno}
                onFocus={() => handleError("mobileno", null)}
              />
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setOtherno(e.target.value)}
                label="Other's Contact No"
                fullWidth
                size="small"
                helperText={error?.otherno}
                error={error?.otherno}
                onFocus={() => handleError("otherno", null)}
              />
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingRight: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.fdepartment}
                error={error?.department}
                onFocus={() => handleError("department", null)}
              >
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <MenuItem>-Select Department-</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Faculty">Faculty</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>

          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setCurrent_address(e.target.value)}
                label="Current Address"
                fullWidth
                size="small"
                helperText={error?.current_address}
                error={error?.current_address}
                onFocus={() => handleError("current_address", null)}
              />
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingRight: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.current_state}
                error={error?.current_state}
                onFocus={() => handleError("current_state", null)}
              >
                <InputLabel>current State</InputLabel>
                <Select label="Current State" onChange={handleStateChange}>
                  <MenuItem>-Select State-</MenuItem>
                  {fillstate()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingRight: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.current_city}
                error={error?.current_city}
                onFocus={() => handleError("current_city", null)}
              >
                <InputLabel>Current City</InputLabel>
                <Select
                  label="Current City"
                  onChange={(e) => setCurrent_city(e.target.value)}
                >
                  <MenuItem>-Select City-</MenuItem>
                  {fillcity()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setCurrent_pincode(e.target.value)}
                label="Current Pincode"
                fullWidth
                size="small"
                helperText={error?.current_pincode}
                error={error?.current_pincode}
                onFocus={() => handleError("current_pincode", null)}
              />
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setPermanent_address(e.target.value)}
                label="Permanent Address"
                fullWidth
                size="small"
                helperText={error?.permanent_address}
                error={error?.permanent_address}
                onFocus={() => handleError("permanent_address", null)}
              />
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingRight: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.permanent_state}
                error={error?.permanent_state}
                onFocus={() => handleError("permanent_state", null)}
              >
                <InputLabel>Permanent State</InputLabel>
                <Select
                  label="Permanent State"
                  onChange={handlePermanentStateChange}
                >
                  <MenuItem>-Select State-</MenuItem>
                  {fillstate()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={4} className={classes.fields}>
            <div style={{ paddingRight: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={error?.permanent_city}
                error={error?.permanent_city}
                onFocus={() => handleError("permanent_city", null)}
              >
                <InputLabel>Permanent City</InputLabel>
                <Select
                  label="Permanent City"
                  onChange={(e) => setPermanent_city(e.target.value)}
                >
                  <MenuItem>-Select City-</MenuItem>
                  {fillPermanentCity()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={4}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setPermanent_pincode(e.target.value)}
                label="Permanent Pincode"
                fullWidth
                size="small"
                helperText={error?.permanent_pincode}
                error={error?.permanent_pincode}
                onFocus={() => handleError("permanent_pincode", null)}
              />
            </div>
          </Grid>

          <Grid
            size={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <img src={employee_picture.fileName} style={{ width: 40 }} />
            </div>

            <div
              style={{
                color: "#d32f2f",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: "1.66rem",
              }}
            >
              {error?.fileError == null ? "" : error.fileError}
            </div>
          </Grid>

          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <IconButton
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 70,
                }}
                component="label"
              >
                <CloudUploadIcon style={{ fontSize: 34 }} />
                <div style={{ fontSize: 12 }}>Upload</div>
                <input onChange={handleChange} type="file" hidden />
              </IconButton>
            </div>
          </Grid>

          <Grid size={6}>
            <div
              style={{
                padding: "0px 5px 0px 5px",
                display: "flex",
                justifyContent: "center",
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
            <div style={{ padding: "0px 5px 0px 5px", display: "flex", justifyContent: "center" }}>
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
