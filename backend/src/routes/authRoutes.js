import express from "express"

const router = express.Router();

router.post("/register",async(req,res)=>{
    res.send("register");
})

router.get("/login",async(req,res)=>{
    res.send("login");
})


export default router;