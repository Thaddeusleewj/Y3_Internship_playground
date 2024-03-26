import nodemailer from "nodemailer";
import readline from "readline";
import dotenv from "dotenv";

// Define email status
const STATUS_EMAIL_OK = 200;
const STATUS_EMAIL_FAIL = 500;
const STATUS_EMAIL_INVALID = 400;
const STATUS_OTP_OK = 200;
const STATUS_OTP_FAIL = 401;
const STATUS_OTP_TIMEOUT = 408;

// Define variables
let otp = null;
let emailRegex = /^[a-zA-Z0-9._%+-]+@dso\.org\.sg$/;
let otpValidityDuration = 60000;
let otpGeneratedTime = null;
let failedAttempts = 0;

// Creating email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "adesgrpuno@gmail.com",
    pass: "urmi xgrz qpwz bret",
  },
  from: "Test User",
});

// Function to send generate randome OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Function to send email with OTP
const sendEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "OTP Verification",
    html: `<p>Your OTP is ${otp}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred while sending email:", error);
    } else {
      otpGeneratedTime = Date.now();
      // console.log("Email sent successfully:", info.response);
    }
  });
};

// Function to verify OTP and check if it's still valid
const verifyOTP = (enteredOTP, userOTP) => {
  const enteredOTPString = enteredOTP.toString();
  const userOTPString = userOTP.toString();

  console.log("Entered OTP:", enteredOTPString);
  console.log("User OTP:", userOTPString);

  if (enteredOTPString !== userOTPString) {
    failedAttempts++;
    console.log("Entered OTP does not match.");

    if (failedAttempts >= 10) {
      console.log("Exceeded maximum failed attempts. Invalidating OTP.");
      otp = null;
    }

    return false;
  }

  const currentTime = Date.now();
  const timeElapsed = currentTime - otpGeneratedTime;

  if (timeElapsed > otpValidityDuration) {
    console.log("OTP has expired.");
    return false;
  }

  console.log("OTP verified successfully.");
  return true;
};

const main = () => {
  let userEmail;

  const recepientEmail = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  recepientEmail.question("Enter your email: ", (email) => {
    userEmail = email;
    recepientEmail.close();
  });

  // Wait for the question to be answered before accessing userEmail
  recepientEmail.on("close", () => {
    const generatedOTP = generateOTP();
    sendEmail(userEmail, generatedOTP);

    const otpInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    otpInterface.question(
      "Enter the OTP sent to your email: ",
      (enteredOTP) => {
        otpInterface.close();

        // You can call a function here to verify the OTP and perform further actions
        verifyOTP(enteredOTP, generatedOTP);
      }
    );
  });
};

main();
