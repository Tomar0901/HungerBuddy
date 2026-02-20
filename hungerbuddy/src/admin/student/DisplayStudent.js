import MaterialTable from "@material-table/core";
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
  Dialog,
  DialogContent,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import student from "../../assets/student.png";
import { useState, useEffect } from "react";
import {
  getDate,
  getTime,
  postData,
  getData,
  serverURL
} from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";

import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import EditIconComponents from "../../components/EditIconComponent";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    fontFamily: "'Exo 2'",
  },
  maincontainer: {
    width: "95%",
    height: 400,

    borderRadius: 10,
    paddingBottom: 10,
  },
  headcontainer: {
    height: 70,
    width: "100%",
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
export default function DisplayStudent() {
  const classes = useStyles();

  const [branchId, setBranchId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [open, setOpen] = useState(false);

  /*************************student content*********************************************/
  const [enrollmentno, setEnrollmentno] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [permanentCityList, setPermanentCityList] = useState([]);
  const [studentname, setStudentname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [fathername, setFathername] = useState("");
  const [mothername, setMothername] = useState("");
  const [emailid, setEmailid] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [fathercontactno, setFathercontactno] = useState("");
  const [mothercontactno, setMothercontactno] = useState("");
  const [current_address, setCurrent_address] = useState("");
  const [current_state, setCurrent_state] = useState("");
  const [current_city, setCurrent_city] = useState("");
  const [current_pincode, setCurrent_pincode] = useState("");
  const [permanent_address, setPermanent_address] = useState("");
  const [permanent_state, setPermanent_state] = useState("");
  const [permanent_city, setPermanent_city] = useState("");
  const [permanent_pincode, setPermanent_pincode] = useState("");
     const [tempImage, setTempImage] = useState("");
      const [dialogstate, setDialogState] = useState("");
         const [statusButton, setStatusButton] = useState(false);

  const [student_picture, setStudent_picture] = useState({
    bytes: "",
    filename: student,
  });

  const fetchAllBranch = async () => {
    var res = await getData("student/fetch_branch");
    setBranchList(res.data);
  };
  const fetchAllBatch = async () => {
    var res = await getData("student/fetch_batch");
    setBatchList(res.data);
  };
  const fetchAllSection = async () => {
    var res = await getData("student/fetch_section");
    setSectionList(res.data);
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
    if (enrollmentno.length == 0) {
      setError((prev) => ({
        ...prev,
        enrollmentno: "Pls Input Enrollment No...",
      }));
    }
    if (branchId.length == 0) {
      setError((prev) => ({
        ...prev,
        branchId: "Pls Select Branch...",
      }));
      isError = true;
    }
    if (batchId.length == 0) {
      setError((prev) => ({
        ...prev,
        batchId: "Pls Select Batch...",
      }));
      isError = true;
    }
    if (sectionId.length == 0) {
      setError((prev) => ({
        ...prev,
        sectionId: "Pls Select Section...",
      }));
      isError = true;
    }
    if (studentname.length == 0) {
      setError((prev) => ({
        ...prev,
        studentname: "Pls Input Student Name...",
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
    if (fathername.length == 0) {
      setError((prev) => ({
        ...prev,
        fathername: "Pls Input Father's Name...",
      }));
      isError = true;
    }
    if (mothername.length == 0) {
      setError((prev) => ({
        ...prev,
        mothername: "Pls Input Mother's Name...",
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
    if (fathercontactno.length == 0) {
      setError((prev) => ({
        ...prev,
        fathercontactno: "Pls Input Father's Contact No...",
      }));
      isError = true;
    }
    if (mothercontactno.length == 0) {
      setError((prev) => ({
        ...prev,
        mothercontactno: "Pls Input Mother's Contact No...",
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

    return isError;
  };

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
    var body={
      enrollmentno:enrollmentno,
      branchid:branchId,
      batchid:batchId,
      sectionid:sectionId,
      studentname:studentname,
      dob:dob,
      gender:gender,
      fathername:fathername,
      mothername:mothername,
      emailid:emailid,
      mobileno:mobileno,
      fathercontactno:fathercontactno,
      mothercontactno:mothercontactno,
      current_address:current_address,
      current_state:current_state,
      current_city:current_city,
      current_pincode:current_pincode,
      permanent_address:permanent_address,
      permanent_state:permanent_state,
      permanent_city:permanent_city,
      permanent_pincode:permanent_pincode,
      createddate:getDate(),
      createdtime:getTime(),
      userid:"xxxxx"
    };
      var response = await postData("student/edit_student", body);
      if (response.status) {
        fetchstudent();
        handleCloseDialog();
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
    }
  };
  const saveCancelButton = () => {
      return (
        <div
          style={{
            display: "flex",
            width: "70%",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <Button onClick={handleEditPicture}
            style={{ background: "hsla(321, 41%, 24%, 1) 0%", width: 100 }}
            variant="contained"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            style={{ background: "hsla(321, 41%, 24%, 1) 0%", width: 100 }}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      );
    };

    
  const handleCancel = () => {
    setStudent_picture({ filename: tempImage, bytes: "" });
    setStatusButton(false);
  };


  const handleEditPicture=async()=>{
  var formData =new FormData()
      formData.append('enrollmentno',enrollmentno)
     formData.append('student_picture',student_picture.bytes)
     formData.append('createddate',getDate())
     formData.append('createdtime', getTime())
      formData.append('userid', "xxxxx")


      var response = await postData("student/edit_picture", formData);
        if (response.status) {
          fetchstudent();
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
          });
          setOpen(false);
          fetchstudent();
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
      }



  const showPictureInterface = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid item size={12}>
            <div className={classes.headcontainer}>
              <div
                style={{
                  marginLeft: "auto",
                  height: 0,
                }}
              >
                <IconButton onClick={handleCloseDialog}>
                  <ClearIcon style={{ color: "white" }} />
                </IconButton>
              </div>
              <div className={classes.headingText}>HungerBuddy</div>
              <div
                className={classes.headingText}
                style={{ fontSize: 15, fontWeight: 700 }}
              >
               Edit Student Picture
              </div>
            </div>
          </Grid>
          <Grid size={6}>
            <img
              src={student_picture.filename}
              style={{ width: 200, borderRadius: 10 }}
            />
          </Grid>
          <Grid size={6} style={{ display: "flex", alignItems: "center" }}>
            {statusButton ? saveCancelButton() : <></>}
          </Grid>
        </Grid>
        <Grid item size={12} className={classes.fields}>
          <Button
            fullWidth
            endIcon={<CloudUploadIcon />}
            component="label"
            variant="contained"
            style={{ background: "hsla(321, 41%, 24%, 1) 0%" }}
          >
            Student Picture
            <input onChange={handleChange} type="file" hidden multiple />
          </Button>
        </Grid>
      </div>
    );
  };

  useEffect(function () {
    fetchAllBranch();
  }, []);
  const fillbranch = () => {
    return branchList.map((item) => {
      return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllBatch();
  }, []);
  const fillbatch = () => {
    return batchList.map((item) => {
      return <MenuItem value={item.batchid}>{item.batchname}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllSection();
  }, []);
  const fillsection = () => {
    return sectionList.map((item) => {
      return <MenuItem value={item.sectionid}>{item.sectionname}</MenuItem>;
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
    setStudent_picture({
      bytes: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
    setStatusButton(true);
    setError((prev) => ({ ...prev, fileError: null }));
  };


  /*******************************************/
  const showStudentInterface = () => {
    return (
      <Grid container spacing={2}>
        <Grid item size={12}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleCloseDialog}>
              <ClearIcon />
            </IconButton>
          </div>
          <div className={classes.headcontainer}>
            <div className={classes.headingText}>HungerBuddy</div>
            <div
              className={classes.headingText}
              style={{ fontSize: 15, fontWeight: 700 }}
            >
              Edit Student
            </div>
          </div>
        </Grid>
        <Grid size={4}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setEnrollmentno(e.target.value)}
              label="Enrollment No"
              fullWidth
              size="small"
              helperText={error?.enrollmentno}
              error={error?.enrollmentno}
              onFocus={() => handleError("enrollmentno", null)}
              value={enrollmentno}
            />
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
                value={branchId}
              >
                <MenuItem>-Select Branch-</MenuItem>
                {fillbranch()}
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid size={4} className={classes.fields}>
          <div style={{ paddingRight: "5px" }}>
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
        <Grid size={4} className={classes.fields}>
          <div style={{ paddingRight: "5px" }}>
            <FormControl
              size="small"
              fullWidth
              helperText={error?.sectionId}
              error={error?.sectionId}
              onFocus={() => handleError("sectionId", null)}
            >
              <InputLabel>Section</InputLabel>
              <Select
                label="Section"
                onChange={(e) => setSectionId(e.target.value)}
                value={sectionId}
              >
                <MenuItem>-Select Section-</MenuItem>
                {fillsection()}
              </Select>
            </FormControl>
          </div>
        </Grid>

        <Grid size={4}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setStudentname(e.target.value)}
              label="Student Name"
              fullWidth
              size="small"
              helperText={error?.studentname}
              error={error?.studentname}
              onFocus={() => handleError("studentname", null)}
              value={studentname}
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
              value={dob}
            />
          </div>
        </Grid>
        <Grid size={4}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <FormControl >
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
                value={gender}
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
              onChange={(e) => setFathername(e.target.value)}
              label="Father's Name"
              fullWidth
              size="small"
              helperText={error?.fathername}
              error={error?.fathername}
              onFocus={() => handleError("fathername", null)}
              value={fathername}
            />
          </div>
        </Grid>
        <Grid size={4}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setMothername(e.target.value)}
              label="Mother's Name"
              fullWidth
              size="small"
              helperText={error?.mothername}
              error={error?.mothername}
              onFocus={() => handleError("mothername", null)}
              value={mothername}
            />
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
              value={emailid}
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
              value={mobileno}
            />
          </div>
        </Grid>
        <Grid size={4}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setFathercontactno(e.target.value)}
              label="Father's Contact No"
              fullWidth
              size="small"
              helperText={error?.fathercontactno}
              error={error?.fathercontactno}
              onFocus={() => handleError("fathercontactno", null)}
              value={fathercontactno}
            />
          </div>
        </Grid>
        <Grid size={4}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setMothercontactno(e.target.value)}
              label="Mother's Contact No"
              fullWidth
              size="small"
              helperText={error?.mothercontactno}
              error={error?.mothercontactno}
              onFocus={() => handleError("mothercontactno", null)}
              value={mothercontactno}
            />
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
              value={current_address}
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
              <Select label="current State"  onChange={handleStateChange} value={current_state}>
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
                value={current_city}
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
              value={current_pincode}
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
              value={permanent_address}
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
                value={permanent_state}
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
                value={permanent_city}
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
              value={permanent_pincode}
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
            <img src={student_picture.filename} style={{ width: 40 }} />
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
          <div
            style={{
              padding: "0px 5px 0px 5px",
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
        <Grid size={3}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
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
    );
  };

  /***********************************************************************************/
  const fetchstudent = async () => {
    var result = await getData("student/fetch_student");
    if (result.status) {
      setStudentList(result.data);
    }
  };

  useEffect(function () {
    fetchstudent();
  }, []);

  const handleOpenDialog = async (rowData, status) => {
    setDialogState(status);
    setEnrollmentno(rowData.enrollmentno);
    setBranchId(rowData.branchid);
    setBatchId(rowData.batchid);
    setSectionId(rowData.sectionid);
    setStudentname(rowData.studentname);
    setDob(rowData.dob);
    setGender(rowData.gender);
    setFathername(rowData.fathername);
    setMothername(rowData.mothername);
    setEmailid(rowData.emailid);
    setMobileno(rowData.mobileno);
    setFathercontactno(rowData.fathercontactno);
    setMothercontactno(rowData.mothercontactno);
    setCurrent_address(rowData.current_address);
    setCurrent_state(rowData.current_state);
    await fetchAllCity(rowData.current_state);
    setCurrent_city(rowData.current_city);
    setCurrent_pincode(rowData.current_pincode);
    setPermanent_address(rowData.permanent_address);
    setPermanent_state(rowData.permanent_state);
    await fetchAllPermanentCity(rowData.permanent_state);
    setPermanent_city(rowData.permanent_city);
    setPermanent_pincode(rowData.permanent_pincode);
    setStudent_picture({
      filename: `${serverURL}/images/${rowData.student_picture}`,
      bytes: "",
    });
    setTempImage(`${serverURL}/images/${rowData.student_picture}`);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handelDelete = async (eid) => {
    Swal.fire({
      title: "Do you want to delete the selected food item?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await postData("student/delete_student", {
          enrollmentno: eid,
        });
        fetchstudent();

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
          {dialogstate === "data"
            ? showStudentInterface()
            : showPictureInterface()}
        </DialogContent>
      </Dialog>
    );
  };

  const displayfooditems = () => {
    return (
      <div>
        <MaterialTable
          title={"List of Students"}
          columns={[
            { title: "enrollmentno", field: "enrollmentno" },
            { title: "branchid", field: "branchname" },
            { title: "batchid", field: "batchname" },
            { title: "sectionid", field: "sectionname" },
            { title: "Student Name", field: "studentname" },
            { title: "DOB", field: "dob" },
            { title: " Gender", field: "gender" },
            { title: "Father's Name", field: "fathername" },
            { title: "Mother's Name", field: "mothername" },
            { title: "Email ID", field: "emailid" },
            { title: "Mobile No", field: "mobileno" },
            { title: "Father's Contact No", field: "fathercontactno" },
            { title: "Mother's Contact No", field: "mothercontactno" },
            { title: "Current Address", field: "current_address" },
            { title: "Current State", field: "currentstatename" },
            { title: "Current City", field: "currentcityname" },
            { title: "Current Pincode", field: "current_pincode" },
            { title: "Permanent Address", field: "permanent_address" },
            { title: "Permanent State", field: "permanentstatename" },
            { title: "Permanent City", field: "permanentcityname" },
            { title: "Permanent Pincode", field: "permanent_pincode" },
            {
              title: "Icon",
              field: "student_picture",
              render: (rowData) => (
                <div onClick={() => handleOpenDialog(rowData, "picture")}>
                  <EditIconComponents image={rowData.student_picture} />
                </div>
              ),
            },
          ]}
          data={studentList}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Student",
              onClick: (event, rowData) => handleOpenDialog(rowData, "data"),
            },
            {
              icon: "delete",
              tooltip: "Delete Student",
              onClick: (event, rowData) => handelDelete(rowData.enrollmentno),
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.maincontainer}>
        {displayfooditems()}
        {showDialog()}
      </div>
    </div>
  );
}
