const resetPasswordTemplate = (name, resetUrl) => {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;">
    
    <h2 style="color:#16a34a;">GreenBasket Password Reset</h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>
      We received a request to reset your password.
    </p>

    <p>
      Click the button below to reset your password.
      This link is valid for <strong>15 minutes</strong>.
    </p>

    <div style="margin:30px 0;">
      <a
        href="${resetUrl}"
        style="
          background:#16a34a;
          color:#fff;
          padding:14px 28px;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Reset Password
      </a>
    </div>

    <p>
      If you didn't request a password reset, you can safely ignore this email.
    </p>

    <hr>

    <p style="color:#777;font-size:13px;">
      GreenBasket Team
    </p>

  </div>
  `;
};

export default resetPasswordTemplate;