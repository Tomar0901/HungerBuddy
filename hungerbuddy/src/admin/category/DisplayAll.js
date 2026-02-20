import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { getDate, getTime,  getData,serverURL, postData} from "../../services/FetchNodeServices";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import burger from "../../assets/burger.png";
import EditIconComponent from "../../components/EditIconComponent";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton,Dialog,DialogTitle,DialogContent,Button,Grid,TextField} from "@mui/material";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: '70%',
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
    //alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));

export default function DisplayAll(refresh,setRefresh) {
  const classes = useStyle();
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);

  /**********Category View******************/
  const [categoryId, setCategoryId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tempImage,setTempImage]=useState('')
  const [categoryIcon, setCategoryIcon] = useState({
    bytes: "",
    fileName: burger,
  });
  const [dialogState, setDialogState] = useState("");
  const [statusButton,setStatusButton]=useState(false)
  const [error, setError] = useState({ fileError: null });
  
  useEffect(()=>{
          fetchAllCategory()
  },[refresh])
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validation = () => {
    var isError = false;
    if (categoryName.length == 0) {
      setError((prev) => ({
        ...prev,
        categoryName: "Pls Input Category Name...",
      }));
      isError = true;
    }

    return isError;
  };

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var body = {categoryid: categoryId,categoryname: categoryName,createddate: getDate(),createdtime: getTime(),userid: "xxxxx"};
      var response = await postData("category/edit_category", body);
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
        fetchAllCategory();

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

  const handleChange = (e) => {
    setCategoryIcon(()=>({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    }));
    setStatusButton(true)
   
  };



  const showPictureInterface = () => {
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
            <img src={categoryIcon.fileName} style={{ width: 100,borderRadius:10 }} />
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
                Category Icon
                <input onChange={handleChange} type="file" hidden multiple />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };



  const showCategoryInterface = () => {
    return (
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className={classes.heading}>
            <div className={classes.titleBox}>
              <div className={classes.titleStyle}>HungerBuddy</div>
              <div className={classes.subTitleStyle}>Edit Category</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon style={{ color: "#ffff" }} />
              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setBranchId(e.target.value)}
              label="Branch Name"
              fullWidth
              value={branchId}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setCategoryName(e.target.value)}
              label="Category Name"
              value={categoryName}
              fullWidth
              helperText={error?.categoryName}
              error={error?.categoryName}
              onFocus={() => handleError("categoryName", null)}
            />
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <Button
              onClick={handleClick}
              style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <Button
              style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
              fullWidth
              variant="contained"
            >
              Clear
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  };


  /*************************/


  const fetchAllCategory = async () => {
    var response = await getData("category/fetch_all_category");
    setCategoryList(response.data);
  };


  useEffect(function () {
    fetchAllCategory();
  }, []);

 const handleCancel=()=>{
  setCategoryIcon({fileName:tempImage,byte:''})
  setStatusButton(false)
 }

const handleEditPicture=async()=>{

var formData =new FormData()
formData.append('categoryid',categoryId)
formData.append('categoryicon',categoryIcon.bytes)
formData.append('categoryname',categoryName)
formData.append('createdate',getDate())
formData.append('createdtime',getTime())
formData.append('userid','XXXXX')


      var response = await postData("category/edit_picture",formData);
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
        fetchAllCategory();

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
      <Button onClick={handleEditPicture} style={{ background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Save</Button>
      <Button onClick={handleCancel} style={{ background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Cancel</Button>
    </div>
  }


  const handleOpenDialog = (rowData, status) => {
    setDialogState(status);
    setCategoryId(rowData.categoryid);
    setBranchId(rowData.branchid);
    setCategoryName(rowData.categoryname);
    setCategoryIcon({
      fileName: `${serverURL}/images/${rowData.categoryicon}`,
      bytes: "",
    });
    setTempImage(`${serverURL}/images/${rowData.categoryicon}`)
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };


  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogContent>
            {dialogState === "Data"
              ? showCategoryInterface()
              : showPictureInterface()}
          </DialogContent>
        </Dialog>
      </div>
    );
  };


  const handleDelete = async (cid) => {
    Swal.fire({
      title: "Do you want to delete the selected category?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var response = await postData("category/delete_category", {
          categoryid: cid,
        });
        Swal.fire(response.message);
        fetchAllCategory();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };


  const displayCategory = () => {
    return (
      <MaterialTable
        title="List of Food Categories"
        columns={[
          { title: "BranchId", field: "branchid" },
          { title: "Category Name", field: "categoryname" },
          {
            title: "Icon",
            render: (rowData) => (
              <div onClick={() => handleOpenDialog(rowData, "Picture")}>
                <EditIconComponent image={rowData.categoryicon} />
              </div>
            ),
          },
        ]}
        
        data={categoryList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpenDialog(rowData, "Data"),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => handleDelete(rowData.categoryid),
          },
        ]}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>{displayCategory()}</div>
      {showDialog()}
    </div>
  );
}
