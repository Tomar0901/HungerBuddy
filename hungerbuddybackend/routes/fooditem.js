var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')
var dotenv=require("dotenv")
var jsonwebtoken=require("jsonwebtoken");
 var verifyToken = require('./authMiddleware');
dotenv.config()

router.post('/submit_fooditem',upload.single('picture'),function(req,res){
  console.log(req.body) 
  try{
      
        pool.query('insert into fooditems( branchid, categoryid, fooditemname, fooditemtype, fooditemtaste, ingredients, fullprice, halfprice, offerprice, status,rating,picture,createddate,createdtime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.branchid,
                req.body.categoryid,
                req.body.fooditemname,
                req.body.fooditemtype,
                req.body.fooditemtaste,
                req.body.ingredients,
                req.body.fullprice,
                req.body.halfprice,
                req.body.offerprice,
                req.body.status,
                req.body.rating,
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,],function(error,result){
 if(error)
  {
     console.log(error)
        res.status(500).json({status:false,message:'Database Error Please Contact Bankend Team....'})
     }
    else
    {
      res.status(200).json({status:true,message:'fooditem Submitted Successfully....'})
    }
})
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Please Contact Bankend Team....'})
    }

})




router.get('/fetch_all_fooditems',function(req,res){
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname from fooditems F',function(error,result){
    if(error)
    {
      res.status(500).json({status:false,message:'Database Error Please Contact Backend Team....'})
    }
    else{
      res.status(200).json({status:true,message:'success',data:result})
    }
  })
})





router.get('/fetch_category',function(req,res){
  pool.query('select * from foodcategory',function(error,result){
    if(error)
    {
      res.status(500).json({status:false,message:'Database Error Please Contact Backend Team....'})
    }
    else
    {
      res.status(200).json({status:true,message:'success',data:result})
    }
  })
})






router.post('/edit_fooditem', function(req, res, next) {

  try{
    pool.query('update fooditems set fooditemid=?, branchid=?,categoryid=?,fooditemname=?,fooditemtype=?,fooditemtaste=?,ingredients=?,fullprice=?,halfprice=?,offerprice=?,status=?,rating=?,createddate=?,createdtime=? where fooditemid=?',[req.body.fooditemid,req.body.branchid,req.body.categoryid,req.body.fooditemname,req.body.fooditemtype,req.body.fooditemtaste,req.body.ingredients,req.body.fullprice,req.body.halfprice,req.body.offerprice,req.body.status,req.body.rating,req.body.createddate,req.body.createdtime,req.body.fooditemid],function(error,result){
     if(error)
     {  console.log(error)
        res.status(500).json({status:false,message:'Database Error Please Contact Bankend Team....'})
     }
    else
    {
      res.status(200).json({status:true,message:'fooditem Updated Successfully....'})
    }
   

    })

  }
  catch(e)
  {

       res.status(500).json({status:false,message:'Critical Error Please Contact Bankend Team....'})
  }
});



router.post('/delete_fooditem', function(req, res, next) {
  
  try{
    pool.query('delete from fooditems where fooditemid=?',[req.body.fooditemid],function(error,result){
     if(error)
     {  console.log(error)
        res.status(500).json({status:false,message:'Database Error Please Contact Bankend Team....'})
     }
    else
    {
      res.status(200).json({status:true,message:'fooditem Deleted Successfully....'})
    }
   

    })

  }
  catch(e)
  {

       res.status(500).json({status:false,message:'Critical Error Please Contact Backend Team....'})
  }
});


router.post('/edit_picture',upload.single('picture'), function(req, res, next) {
  
  try{
    pool.query('update fooditems set picture=?,createddate=?,createdtime=?,rating=? where fooditemid=?',[req.file.filename,req.body.createddate,req.body.createdtime,req.body.rating,req.body.fooditemid],function(error,result){
     if(error)
     {  console.log(error)
        res.status(500).json({status:false,message:'Database Error Please Contact Bankend Team....'})
     }
    else
    {
      res.status(200).json({status:true,message:'Image updated Successfully....'})
    }
   

    })

  }
  catch(e)
  {

       res.status(500).json({status:false,message:'Critical Error Please Contact Bankend Team....'})
  }
});













router.post('/chk_branch_login', function(req, res, next) {
  try {
    pool.query('select * from branch where emailid=? and password=?',[req.body.emailid, req.body.password],function(error, result) {
        if (error) {
          console.log(error)
          res.status(500).json({status:false,message:'Database Error Please Contact Backend Team....'})
        } else {
          if (result.length === 1) {
            var sk = process.env.JWT_KEY
            var token = jsonwebtoken.sign({branch_admin: result[0]}, sk, {expiresIn:'5h'})
            res.status(200).json({data: result[0], status:true, message:'success', token})
          } else {
            res.status(200).json({data: result, status:false, message:'Invalid email/password'})
          }
        }
      }
    )
  } catch (e) {
    res.status(500).json({status:false,message:'Critical Error Please Contact Backend Team....'})
  }
})




module.exports=router