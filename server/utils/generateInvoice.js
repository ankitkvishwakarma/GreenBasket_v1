import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const invoiceDir = "invoices";

    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir);
    }

    const filePath = path.join(
      invoiceDir,
      `${order.orderNumber}.pdf`
    );

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(22).text("GreenBasket Invoice", {
      align: "center",
    });

    doc.moveDown();

    doc.text(`Order Number : ${order.orderNumber}`);
    doc.text(`Payment Method : ${order.paymentMethod}`);
    doc.text(`Total Amount : ₹${order.totalAmount}`);

    doc.moveDown();

    doc.text("Items");

    order.items.forEach((item) => {
      doc.text(
        `${item.name}  x${item.quantity}  ₹${item.subtotal}`
      );
    });

    doc.end();

    stream.on("finish", () => resolve(filePath));

    stream.on("error", reject);
  });
};