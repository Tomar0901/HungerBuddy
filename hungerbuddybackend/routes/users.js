var express = require('express');
var router = express.Router();
var pool = require('./pool')


router.get('/fetch_all_category', function (req, res, next) {

  try {
    pool.query('select* from foodcategory ', function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
      }
      else {
        res.status(200).json({ data: result, status: true, message: 'Successfully....' })
      }


    })

  }
  catch (e) {

    res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team....' })
  }
});

router.get('/fetch_all_fooditems', function (req, res) {
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname from fooditems F', function (error, result) {
    if (error) {
      console.log(error);

      res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
    }
    else {
      res.status(200).json({ status: true, message: 'success', data: result })
    }
  })
})

router.post('/fetch_all_fooditems_by_id', function (req, res) {
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where fooditemid=?', [req.body.fooditemid], function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
    }
    else {
      res.status(200).json({ status: true, message: 'success', data: result[0] })
    }
  })
})

router.post('/fetch_all_fooditems_by_category', function (req, res) {
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.categoryid in(select categoryid from foodcategory where categoryname=?)', [req.body.categoryname], function (error, result) {
    if (error) {
      console.log(error);

      res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
    }
    else {
      res.status(200).json({ status: true, message: 'success', data: result })
    }
  })
})

router.post('/fetch_all_fooditems_by_category_id', function (req, res) {
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.categoryid=?', [req.body.categoryid], function (error, result) {
    if (error) {
      console.log(error);

      res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
    }
    else {
      res.status(200).json({ status: true, message: 'success', data: result })
    }
  })
})

router.post('/student_sign_in', function (req, res) {
  pool.query('select * from student where mobileno=?', [req.body.mobileNo], function (error, result) {
    if (error) {
      console.log(error);

      res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
    }
    else {
      if (result.length == 1)
        res.status(200).json({ status: true, message: 'success', data: result[0] })
      else
        res.status(200).json({ status: false, message: 'you are not registered yet...pls contact branch administrator', data: [] })
    }
  })
})

router.post("/submit_order", function (req, res, next) {
  try {
    pool.query(
      "insert into orders(paymentid,orderdate,delivery_status,payment_type) values(?,?,?,?)",
      [
        req.body.paymentid,
        req.body.orderdate,
        req.body.delivery_status,
        req.body.payment_type,
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
            orderid: result.insertId,
            message: "Order Submitted Successfully....",
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
});

router.post("/submit_order_detail", function (req, res, next) {
  try {
    pool.query(
      "insert into order_detail(orderid,fooditemid,fooditemname,enrollmentno,emailid,mobileno,qty,fullprice,offerprice,amount) values ?",
      [
        req.body.data.map((item) => [
          req.body.orderid,
          item.fooditemid,
          item.fooditemname,
          req.body.enrollmentno,
          req.body.emailid,
          req.body.mobileno,
          item.qty,
          item.fullprice,
          item.offerprice,
          item.offerprice > 0
            ? item.offerprice * item.qty
            : item.fullprice * item.qty,
        ]),
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
            message: "Order Detail Submitted Successfully....",
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
});



router.post('/fetch_all_orders', function (req, res, next) {
  try {
    pool.query('select OD.*, F.*,O.* from order_detail OD, fooditems F, orders O where OD.orderid=O.orderid and F.fooditemid=OD.fooditemid and mobileno=? ', [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error)
          res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team....' })
        }
        else {
          res.status(200).json({ data: result, status: true, message: 'Successfully....' })
        }
      })
  }
  catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team....' })
  }
});

router.post('/search_fooditem_by_name', function (req, res) {

  pool.query(
    'select * from fooditems where lower(fooditemname) like lower(?)',
    [`%${req.body.name}%`],
    function (error, result) {

      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: 'Database Error'
        });
      }
      else {
        if (result.length > 0) {
          res.status(200).json({
            status: true,
            data: result[0]   // first matched item
          });
        }
        else {
          res.status(200).json({
            status: false,
            data: null
          });
        }
      }
    }
  );
});

module.exports = router;