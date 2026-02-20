var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");


router.post(
  "/submit_delivery",
  upload.single("photograph"),
  function (req, res) {
    try {
      pool.query(
        "INSERT INTO delivery (branchid, deliveryname, dob, gender, mobileno, emailid, address,cityid, stateid, addharno, status, vehicleno, photograph, password,createddate, createdtime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.branchid,
          req.body.deliveryname,
          req.body.dob,
          req.body.gender,
          req.body.mobileno,
          req.body.emailid,
          req.body.address,
          req.body.cityid,
          req.body.stateid,
          req.body.addharno,
          req.body.status,
          req.body.vehicleno,
          req.file.filename,
          req.body.password,
          req.body.createddate,
          req.body.createdtime,
        ],
        function (error, result) {
          if (error) {
            console.error(error);
            res.status(500).json({
              status: false,
              message: "Database Error Contact Backend Team",
            });
          } else {
            res
              .status(200)
              .json({ status: true, message: "Delivery Added Successfully" });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Critical Error Contact Backend Team",
      });
    }
  }
);


router.post("/fetch_all_delivery", function (req, res) {
  pool.query(
    "SELECT D.*,(SELECT S.statename FROM states S WHERE S.stateid = D.stateid) AS statename,(SELECT C.cityname FROM cities C WHERE C.cityid = D.cityid) AS cityname,(select B.branchname from branch B where B.branchid=D.branchid) as branchname FROM delivery D",
    function (error, result) {
      if (error) {
        res.status(500).json({
          status: false,
          message: "Database Error Contact Backend Team",
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Delivery Fetched Successfully",
          data: result,
        });
      }
    }
  );
});


router.post("/edit_delivery", function (req, res) {
  pool.query(
    "update delivery set branchid=?, deliveryname=?, dob=?, gender=?, mobileno=?, emailid=?, address=?, cityid=?, stateid=?, addharno=?, status=?, vehicleno=?, password=?, createddate=?, createdtime=? WHERE delivery_id=?",
    [
      req.body.branchid,
      req.body.deliveryname,
      req.body.dob,
      req.body.gender,
      req.body.mobileno,
      req.body.emailid,
      req.body.address,
      req.body.cityid,
      req.body.stateid,
      req.body.addharno,
      req.body.status,
      req.body.vehicleno,
      req.body.password,
      req.body.createddate,
      req.body.createdtime,
      req.body.delivery_id, 
    ],
    function (error, result) {
      if (error) {
        res.status(500).json({
          status: false,
          message: "Database Error Contact Backend Team",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Delivery Updated Successfully" });
      }
    }
  );
});




router.post("/delete_delivery", function (req, res) {
  pool.query(
    "DELETE FROM delivery WHERE delivery_id=?",
    [req.body.delivery_id],
    function (error, result) {
      if (error) {
        res.status(500).json({
          status: false,
          message: "Database Error Contact Backend Team",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Delivery Deleted Successfully" });
      }
    }
  );
});

router.post(
  "/edit_delivery_photograph",
  upload.single("photograph"),
  function (req, res) {
    try {
      pool.query(
        "UPDATE delivery SET photograph=?, createddate=?, createdtime=? WHERE delivery_id=?",
        [
          req.file.filename,
          req.body.createddate,
          req.body.createdtime,
          req.body.delivery_id,
        ],
        function (error, result) {
          if (error) {
            res.status(500).json({
              status: false,
              message: "Database Error Contact Backend Team",
            });
          } else {
            res.status(200).json({
              status: true,
              message: "Delivery Image Updated Successfully",
            });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Critical Error Contact Backend Team",
      });
    }
  }
);

router.get("/fetch_branch_name", function (req, res) {
  pool.query("SELECT * FROM branch", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: "Database Error" });
    } else {
      res.status(200).json({ status: true, message: "Success", data: result });
    }
  });
});

module.exports = router;
