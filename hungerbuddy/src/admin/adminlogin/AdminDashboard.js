import { NavigationType, useNavigate } from "react-router-dom";
import { Grid,Button,AppBar,Toolbar,Avatar,ListItem, Divider} from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import branch from "../../assets/branch.png"
import batch from "../../assets/batch.png"
import section from "../../assets/section.png"
import student from "../../assets/student.png"
import employee from "../../assets/employee.png"
import delivery from "../../assets/delivery-man.png"
import logout from "../../assets/check-out.png"
import FoodDisplayAll from "../../admin/fooditem/FoodDisplayAll";
import FoodItem from "../../admin/fooditem/FoodItem";
import Branch from "../branches/Branch";
import Batch from "../batch/Batch";
import Section from "../section/Section"
import DisplayStudent from "../student/DisplayStudent"
import StudentInterface from "../student/StudentInterface"
import EmployeeInterface from "../employee/EmployeeInterface"
import DisplayEmployee from "../employee/DisplayEmployee"
import DeliveryInterface from "../delivery/DeliveryInterface"
import DeliveryDisplay from "../delivery/DeliveryDisplay"
import dashboard from "../../assets/dashboard.png";
import Category from "../category/Category";
import { Route, Routes } from "react-router-dom";

export default function BranchDashboard() {
  var navigate = useNavigate();
  const handleClick = () => {
    navigate("/category");
  };
  const handleLogout = () => {
    localStorage.removeItem("Token");
  };

  const sideBar = () => {
    return (
      <div
        style={{
          background: "hsla(324, 48%, 94%, 1.00)",
          margin: 10,
          borderRadius: 5,
          height: "70%",
        }}
      >
        <List sx={{ width: "100%", maxWidth: 360 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={dashboard}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Dashboard</div>}
            />
          </ListItem>
          <Divider />
          <ListItemButton onClick={() => navigate("/admindashboard/branch")}>
            <ListItemAvatar>
              <Avatar
                src={branch}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Branch</div>}
            />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/admindashboard/batch")}
          >
            <ListItemAvatar>
              <Avatar
                src={batch}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Batch</div>}
            />
          </ListItemButton>

          <ListItemButton  onClick={() => navigate("/admindashboard/section")}>
            <ListItemAvatar>
              <Avatar
                src={section}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Sections</div>}
            />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/admindashboard/studentinterface")}>
            <ListItemAvatar>
              <Avatar
                src={student}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Students</div>}
            />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/admindashboard/employeeinterface")}>
            <ListItemAvatar>
              <Avatar
                src={employee}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Employees</div>}
            />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/admindashboard/deliverydisplay")}>
        <ListItemAvatar>
          <Avatar src={delivery}  sx={{ width: 28, height: 28 }} variant="rounded" />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Delivery</div>}  />
      </ListItemButton>


          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                src={logout}
                sx={{ width: 28, height: 28 }}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontFamily: "Quicksand" }}>Logout</div>}
            />
          </ListItemButton>
        </List>
      </div>
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar
        position="static"
        style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
      >
        <Toolbar>
          <div style={{ fontSize: 24 }}>HungerBuddy</div>
          <Avatar
            style={{ width: 50, height: 50, marginLeft: "auto" }}
            alt="Remy Sharp"
            src={`${serverURL}/images/1.jpg`}
          />
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        <Grid size={2} style={{ height: "100vh" }}>
          {sideBar()}
        </Grid>
        <Grid size={10}>
          <Routes>
            <Route element={<Branch />} path="/branch" />
            <Route element={<Batch />} path="/batch" />
            <Route element={<Section />} path="/section" />
            <Route element={<Section />} path="/section" />
            <Route element={<StudentInterface />} path="/studentinterface" />
            <Route element={<DisplayStudent />} path="/displaystudent" />
            <Route element={<EmployeeInterface />} path="/employeeinterface" />
            <Route element={<DisplayEmployee />} path="/displayemployee" />
            <Route element={<DeliveryDisplay />} path="/deliverydisplay" />
            <Route element={<DeliveryInterface />} path="/deliveryinterface" />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}
