const nodemailer = require("nodemailer");

// Define email status  
const STATUS_EMAIL_OK = 0;
const STATUS_EMAIL_FAIL = 1;
const STATUS_EMAIL_INVALID = 2;
const STATUS_OTP_OK = 3;
const STATUS_OTP_FAIL = 4;
const STATUS_OTP_TIMEOUT = 5;

class Email_OTP_Module {
  // OTP defined as null to indicate that it has not been generated
private otp: string | null = null;
private readonly emailRegex = /\.dso\.org\.sg$/;
// OTP validity duration is 1 minute
private readonly otpValidityDuration = 60000;
// Timestamp for OTP generation
private otpGenerationTime: number | null = null;

// Create a transporter
private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass: "",
    },
});

  private generateRandomOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private sendEmail(email_address: string, email_body: string) {
    const mailOptions = {
      from: "",
      to: email_address,
      subject: "OTP For Verification",
      text: email_body,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return STATUS_EMAIL_FAIL;
      } else {
        console.log("Email sent: " + info.response);
        return STATUS_EMAIL_OK;
      }
    });
  }

  public generate_OTP_email(user_email: string): number {
    if (!this.emailRegex.test(user_email)) {
      return STATUS_EMAIL_INVALID;
    }

    this.otp = this.generateRandomOTP();
    this.otpGenerationTime = Date.now();
    const emailBody = `Your OTP Code is ${this.otp}. The code is valid for 1 minute`;
    return this.sendEmail(user_email, emailBody);
  }

  public async check_OTP(input: {
    readOTP: () => Promise<string>;
  }): Promise<number> {
    for (let attempt = 0; attempt < 10; attempt++) {
      if (Date.now() - this.otpGenerationTime! > this.otpValidityDuration) {
        return STATUS_OTP_TIMEOUT;
      }

      const userOTP = await input.readOTP();
      if (userOTP === this.otp) {
        return STATUS_OTP_OK;
      }
    }

    return STATUS_OTP_FAIL;
  }
}
