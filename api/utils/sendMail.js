import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import { transporter } from "../helpers/mail.js";

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(" ../api/views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve(" ../api/views/"),
  extName: ".handlebars",
};

// Send email function
export const sendMail = (mailOptions) => {
  transporter.use(hbs(handlebarOptions));

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
