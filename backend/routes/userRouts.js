import express from "express"


const router = express.Router();


router.get('/login', (req, res)=> {
    res.send({
        message: "Login Sucessfully"
    })
})




export default router;