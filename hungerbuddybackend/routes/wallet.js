var express = require("express");
var router = express.Router();
var pool = require("./pool");


/* GET users listing. */
router.post(
  "/submit_student_wallet",

  function (req, res, next) {
    try {
      pool.query(
        "insert into student_wallet(enrollmentno,points)values(?,?)",
        [
        
            req.body.enrollmentno,
            req.body.points,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res
              .status(500)
              .json({
                status: false,
                message: "error in database contach to the admin",
              });
          } else {
            res
              .status(200)
              .json({ status: true, message: "Category Added Successfully" });
          }
        }
      );
    } catch (e) {
      res
        .status(500)
        .json({
          status: false,
          message: "error in database contach to the admin",
        });
    }
  }
);


router.post(
  "/submit_employee_wallet",
  function (req, res, next) {
    try {
      pool.query(
        "insert into employee_wallet(employeeid,points)values(?,?)",
        [req.body.employeeid, req.body.points],
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
              .json({ status: true, message: "Category Added Successfully" });
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
 module.exports = router;

