import express, { Request, Response } from 'express'
import initializeDb from './config/db'
const app=express()
app.use(express.json())
// TODO initializeDb
initializeDb()
app.get('/',(req:Request,res:Response)=>{
    res.send('GO RENT SERVER IS WORKING')
})
// !==> auth routes 
// ! customer routes 
// ! admin routes 
export default app