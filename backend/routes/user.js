const { Router } = require('Express')
const userModel = require('../db/models/user')

const router = Router()

router.use('/',(req,res,next)=>{
    console.log("user section");
    next();
})

module.exports = router