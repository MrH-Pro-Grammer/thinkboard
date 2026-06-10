import express from "express"
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express()
const PORT = process.env.POR || 5001;
const __dirname = path.resolve();


//middleware

if(process.env.NODE_ENV !== "production"){

    app.use(cors({
        origin:"http://localhost:5173",
    }));
}
    app.use(express.json())
    app.use(rateLimiter);
/******* */
//Simple custom middlewear
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });
/******* */
// instead of hardcoding /api/notes
app.use("/api/notes", notesRoutes)

//express middlewear
//render.com
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get(
    "*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}

// app.get("/api/notes", (req,res)=>{
//     res.status(200).send("you got 50 Notes");
// })

// app.post("/aapi/notes", (rs,req)=>{
//     res.status(201).json({message:"posst created successfully"})
// })

// app.put("/api/noes", (res,req)=>{
//     res.status(200).json({message:"Post updated successfully"})
// })

// app.delete("/api/notes", (res,req)=>{
//     res.status(200).json({message:"Notes deleted sucessfully"})
// })

connectDB().then(()=>{

    app.listen(5001, () => {
        console.log("server started at PORT: 5001")
});

});