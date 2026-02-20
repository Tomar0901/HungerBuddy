var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post(
  "/submit_student",
  upload.single("student_picture"),
  function (req, res, next) {
    try {
      console.log(req.body);
      console.log(req.file);
      pool.query(
        "insert into student(enrollmentno, branchid, batchid, sectionid, studentname, dob, gender, fathername, mothername, emailid, mobileno, addharno, fathercontactno, mothercontactno, current_address, current_state, current_city, current_pincode, permanent_address, permanent_state, permanent_city, permanent_pincode, student_picture, createdtime, createddate, userid)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.enrollmentno,
          req.body.branchid,
          req.body.batchid,
          req.body.sectionid,
          req.body.studentname,
          req.body.dob,
          req.body.gender,
          req.body.fathername,
          req.body.mothername,
          req.body.emailid,
          req.body.mobileno,
          req.body.addharno,
          req.body.fathercontactno,
          req.body.mothercontactno,
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
              .json({ status: true, message: "Student Added Successfully" });
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
router.get("/fetch_batch", function (req, res, next) {
  console.log(req.body);
  pool.query("select * from batch", function (error, result) {
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
router.get("/fetch_section", function (req, res, next) {
  console.log(req.body);
  pool.query("select * from section", function (error, result) {
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

router.get("/fetch_student", function (req, res, next) {
  try {
    pool.query(
      "select S.*,(select B.branchname from branch B where B.branchid=S.branchid) as branchname,(select F.batchname from batch F where F.batchid=S.batchid) as batchname,(select P.sectionname from section P where P.sectionid=S.sectionid) as sectionname,(select M.statename from states M where M.stateid=S.current_state) as currentstatename,(select Z.cityname from cities Z where Z.cityid=S.current_city) as currentcityname,(select N.statename from states N where N.stateid=S.permanent_state) as permanentstatename,(select Z.cityname from cities Z where Z.cityid=S.permanent_city) as permanentcityname from student S",
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
            message: "Student fetched Successfully",
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
router.post("/edit_student", function (req, res, next) {
  try {
    console.log(req.body);
    pool.query(
      "update student set enrollmentno=?, branchid=?, batchid=?, sectionid=?, studentname=?, dob=?, gender=?, fathername=?, mothername=?, emailid=?, mobileno=?, fathercontactno=?, mothercontactno=?, current_address=?, current_state=?, current_city=?, current_pincode=?, permanent_address=?, permanent_state=?, permanent_city=?, permanent_pincode=?, student_picture=?, createdtime=?, createddate=?, userid=? where enrollmentno=?",

      [
        req.body.enrollmentno,
        req.body.branchid,
        req.body.batchid,
        req.body.sectionid,
        req.body.studentname,
        req.body.dob,
        req.body.gender,
        req.body.fathername,
        req.body.mothername,
        req.body.emailid,
        req.body.mobileno,
        req.body.fathercontactno,
        req.body.mothercontactno,
        req.body.current_address,
        req.body.current_state,
        req.body.current_city,
        req.body.current_pincode,
        req.body.permanent_address,
        req.body.permanent_state,
        req.body.permanent_city,
        req.body.permanent_pincode,
        req.body.student_picture,
        req.body.createdtime,
        req.body.createddate,
        req.body.userid,
        req.body.enrollmentno,
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
            .json({ status: true, message: "Student Updated Successfully" });
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
router.post("/delete_student", function (req, res, next) {
  try {
    pool.query(
      "delete from student where enrollmentno=?",
      [req.body.enrollmentno],
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
            .json({ status: true, message: "Student Deleted Successfully" });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "error in database contact to the admin",
    });
  }
});


router.post(
  "/edit_picture",
  upload.single("student_picture"),
  function (req, res, next) {
    try {
      pool.query(
        "update student set student_picture=?,createddate=?,createdtime=?,userid=? where enrollmentno=?",
        [
          req.file.filename,
          req.body.createddate,
          req.body.createdtime,
          req.body.userid,
          req.body.enrollmentno,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res
              .status(500)
              .json({
                status: false,
                message: "Database Error Please Contact Bankend Team....",
              });
          } else {
            res
              .status(200)
              .json({
                status: true,
                message: "Picture Updated Successfully....",
              });
          }
        }
      );
    } catch (e) {
      res
        .status(500)
        .json({
          status: false,
          message: "Critical Error Please Contact Bankend Team....",
        });
    }
  }
);
module.exports = router;
