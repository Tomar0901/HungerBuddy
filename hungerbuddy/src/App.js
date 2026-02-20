import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Category from "../src/admin/category/Category";
import Branch from "../src/admin/branches/Branch";
import BranchLogin from "./admin/branches/BranchLogin";
import BranchDashboard from "./admin/branches/BranchDashboard";
import AdminDashboard from "./admin/adminlogin/AdminDashboard";
import AdminLogin from "./admin/adminlogin/AdminLogin";



function App() {
  return (
    <div style={{fontFamily:'Quicksand'}}>
    <Router>
      <Routes>
       
        <Route element={<Branch/>} path="/branch"></Route>
        <Route element={<BranchLogin/>} path="/branchlogin"></Route>
       <Route element={<BranchDashboard/>} path="/branchdashboard/*"></Route>
       <Route element={<AdminLogin/>} path="/adminlogin/*"></Route>
       <Route element={<AdminDashboard/>} path="/admindashboard/*"></Route>
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
