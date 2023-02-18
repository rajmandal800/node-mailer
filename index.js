import express from "express";
import { json } from "express";
import http from "http"
import cors from "cors"
import bodyParser from "body-parser";
import { sendEmail } from "./utilities/node-mailer.js";

const app = express();
const server = http.createServer(app)
const port = process.env.PORT || 4001;

app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get("/",(req,res)=>{
  return res.status(200).send("Hello form geekrider mailer")
})
app.post('/api/sendEmail', async(req, res) => {
  try{

    const {email,subject,html} = req.body

  if(!email)return res.status(400).send("email missing")
  if(!subject)return res.status(400).send("subject missing")
  if(!html)return res.status(400).send("html missing")

  const response = await sendEmail(email,subject,html)
  return res.json("Email sent")


  }catch(error){
    return res.status(400).send(error)
  }

})

server.listen(port, () => {
    // winston.info(`Listening on port ${port}...`);
    console.log(`Listening on port ${port}`);
  });


export default server
  