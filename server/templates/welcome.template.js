const welcomeTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to GreenBasket</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:30px auto;border-radius:10px;overflow:hidden;">

<tr>
<td align="center" style="background:#16a34a;padding:30px;color:#fff;">
<h1>🥬 GreenBasket</h1>
<p>Fresh Grocery Delivered Fast</p>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2>Hello ${name}, 👋</h2>

<p>
Welcome to <strong>GreenBasket</strong>.
</p>

<p>
Thank you for creating your account.
Now you can order fresh vegetables, fruits, dairy products and daily essentials online.
</p>

<p>
We are excited to serve you.
</p>

<div style="text-align:center;margin:35px 0;">

<a href="http://localhost:5173"
style="
background:#16a34a;
color:#fff;
padding:15px 30px;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-weight:bold;
">

Start Shopping

</a>

</div>

<p>
Regards,<br>
<strong>GreenBasket Team</strong>
</p>

</td>
</tr>

<tr>
<td align="center"
style="background:#f3f4f6;padding:20px;color:#777;font-size:14px;">

© 2026 GreenBasket. All Rights Reserved.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

export default welcomeTemplate;