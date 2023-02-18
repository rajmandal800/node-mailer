import nodemailer from "nodemailer";

const GMAIL_CLIENT= process.env.GMAIL_CLIENT;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const sendEmail = async (email,subject,html)=>{

  try{

    if(!GMAIL_CLIENT)return Promise.reject("GMAIL_CLIENT is missing")
    if(!GMAIL_APP_PASSWORD)return Promise.reject("GMAIL_APP_PASSWORD is missing")
    const msg = {
        from:GMAIL_CLIENT,
        to:email,
        subject:subject,
        html:html.toString()
    }
    nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 465,
        //secure: true, // use TLS
        auth: {
          user: GMAIL_CLIENT,
          pass: GMAIL_APP_PASSWORD,
        },
      }).sendMail(msg,(err)=>{
        if(err){
             console.log('Error',err)
             return Promise.reject(err)
        }else{

            //  console.log("Email sent")
            return Promise.resolve("Email sent")
        }
      })

  }catch(error){
    return Promise.reject(error)
  }
    
}


