import transporter from "../config/nodemailer.js";

export const sendEmail = async ({
  to,
  subject,
  html,
  text = "",
  attachments = [],
}) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
    attachments,
  });
};