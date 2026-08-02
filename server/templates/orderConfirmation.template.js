const orderConfirmationTemplate = (name, order) => {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:10px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
        <td style="padding:10px;border:1px solid #ddd;text-align:right;">₹${item.price}</td>
        <td style="padding:10px;border:1px solid #ddd;text-align:right;">₹${item.subtotal}</td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Order Confirmation</title>
</head>

<body style="font-family:Arial;background:#f4f4f4;padding:30px;">

<div style="max-width:700px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">

<div style="background:#16a34a;padding:20px;color:#fff;text-align:center;">
<h1>🥬 GreenBasket</h1>
<h2>Order Confirmed</h2>
</div>

<div style="padding:30px;">

<h3>Hello ${name},</h3>

<p>
Thank you for shopping with <b>GreenBasket</b>.
Your order has been placed successfully.
</p>

<p>
<b>Order Number:</b> ${order.orderNumber}
</p>

<p>
<b>Payment Method:</b> ${order.paymentMethod}
</p>

<table
style="width:100%;border-collapse:collapse;margin-top:20px;">

<thead>

<tr style="background:#16a34a;color:white;">

<th style="padding:10px;">Product</th>
<th>Qty</th>
<th>Price</th>
<th>Subtotal</th>

</tr>

</thead>

<tbody>

${itemsHtml}

</tbody>

</table>

<h2 style="text-align:right;margin-top:25px;">
Total : ₹${order.totalAmount}
</h2>

<p>
Your order will be processed shortly.
</p>

<p>
Thank you for choosing GreenBasket ❤️
</p>

</div>

<div
style="background:#f1f1f1;padding:15px;text-align:center;color:#666;">

© 2026 GreenBasket

</div>

</div>

</body>
</html>
`;
};

export default orderConfirmationTemplate;