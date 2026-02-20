var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post(
  "/submit_employee",
  upload.single("employee_picture"),
  function (req, res, next) {
    try {
      console.log(req.body);
      console.log(req.file);
      pool.query(
        "insert into employee(branchid,employeename, dob, gender, emailid, mobileno,othermobno,department, current_address, current_state, current_city, current_pincode, permanent_address, permanent_state, permanent_city, permanent_pincode, employee_picture, createdtime, createddate, userid)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.branchid,
          req.body.employeename,
          req.body.dob,
          req.body.gender,
          req.body.emailid,
          req.body.mobileno,
          req.body.othermobno,
          req.body.department,
          req.body.current_address,
          req.body.current_state,
          req.body.current_city,
          req.body.current_pincode,
          req.body.permanent_address,
          req.body.permanent_state,
          req.body.permanent_city,
          req.body.permanent_pincode,
          req.file.filename,
          req.body.createdtime,
          req.body.createddate,
          req.body.userid,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({
              status: false,
              message: "error in database contach to the admin",
            });
          } else {
            res
              .status(200)
              .json({ status: true, employeeid: result.insertId, message: "Employee Added Successfully" });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "error in database contach to the admin",
      });
    }
  }
);

router.get("/fetch_branch", function (req, res, next) {
  console.log(req.body);
  pool.query("select * from branch", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Database Error Please Contact Bankend Team....",
      });
    } else {
      res.status(200).json({ status: true, message: "Success", data: result });
    }
  });
});

router.get("/fetch_employee", function (req, res, next) {
  try {
    pool.query(
      "select S.*,(select B.branchname from branch B where B.branchid=S.branchid) as branchname,(select M.statename from states M where M.stateid=S.current_state) as currentstatename,(select Z.cityname from cities Z where Z.cityid=S.current_city) as currentcityname,(select N.statename from states N where N.stateid=S.permanent_state) as permanentstatename,(select Z.cityname from cities Z where Z.cityid=S.permanent_city) as permanentcityname from employee S",
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "error in database contach to the admin",
          });
        } else {
          res.status(200).json({
            data: result,
            status: true,
            message: "Employee fetched Successfully",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "error in database contach to the admin",
    });
  }
});
router.post("/edit_employee", function (req, res, next) {
  try {
    console.log(req.body);
    pool.query(
      
      "update employee set branchid=?, employeename=?, dob=?, gender=?, emailid=?, mobileno=?, otherno=?,department=?, current_address=?, current_state=?, current_city=?, current_pincode=?, permanent_address=?, permanent_state=?, permanent_city=?, permanent_pincode=?, createdtime=?, createddate=?, userid=? where employeeid=?",

      [
        req.body.branchid,
        req.body.employeename,
        req.body.dob,
        req.body.gender,
        req.body.emailid,
        req.body.mobileno,
        req.body.otherno,
        req.body.department,
        req.body.current_address,
        req.body.current_state,
        req.body.current_city,
        req.body.current_pincode,
        req.body.permanent_address,
        req.body.permanent_state,
        req.body.permanent_city,
        req.body.permanent_pincode,
        req.body.createdtime,
        req.body.createddate,
        req.body.userid,
        req.body.employeeid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "error in database contach to the admin",
          });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Employee Updated Successfully" });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "error in database contach to the admin",
    });
  }
});
router.post("/delete_employee", function (req, res, next) {
  try {
    pool.query(
      "delete from employee where employeeid=?",
      [req.body.employeeid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "error in database contach to the admin",
          });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Employee Deleted Successfully" });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "error in database contach to the admin",
    });
  }
});

router.post(
  "/edit_picture",
  upload.single("employee_picture"),
  function (req, res, next) {
    try {
      pool.query(
        "update employee set employee_picture=?,createddate=?,createdtime=?,userid=? where employeeid=?",
        [
          req.file.filename,
          req.body.createddate,
          req.body.createdtime,
          req.body.userid,
          req.body.employeeid,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({
              status: false,
              message: "Database Error Please Contact Bankend Team....",
            });
          } else {
            res.status(200).json({
              status: true,
              message: "Picture Updated Successfully....",
            });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Critical Error Please Contact Bankend Team....",
      });
    }
  }
);
module.exports = router;
