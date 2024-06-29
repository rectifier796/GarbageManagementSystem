import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

const otpMessage = "Your_OTP_is";

export const createMailBody = (name,code)=>{
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    </head>
    <body>
      <p>Hi ${name || ''},</p>
      <span>
        Please use the following code to set up your account and get started.
      </span>
      <br>
      <h2>${code}</h2>
      <br>
    </body>
  </html>
`;
}

export const sendOTP = async (to,html) => {
  try {
    
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure:true,
      auth:{
        user:email,
        pass:password
      }
    })

    const message = {
      from: `"Municipality" <${email}>`,
      to,
      subject:"OTP for Account Setup",
      html
    }

    const info = await transporter.sendMail(message);

    return {
      success: true,
      message: "Successful",
    };
  } catch (err) {
    console.log(err);
    throw new Error("Error in sending OTP");
  }
};

export const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  return otp;
};
