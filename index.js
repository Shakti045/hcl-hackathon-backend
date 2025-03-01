import express from 'express';
import router from './routes/router.js';
import { errorHandler } from './utils/errorhandler.js';
import { connectdb } from './connections/db.js';
import { createbankrecords, createlinks } from './scripts/index.js';
import { buildGraph } from './scripts/graph.js';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1",router);
app.use(errorHandler);
const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

connectdb();
app.get("/health",(req,res)=>{
    return res.send("OK");
})



// createbankrecords();
// createlinks();