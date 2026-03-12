// import jsPDF from "jspdf";

// export const downloadInvoicePDF = (invoicePreview, recordData) => {

//  const doc = new jsPDF();

//  const today = new Date().toLocaleDateString();

//  doc.setFontSize(18);
//  doc.text("SpeakUp London", 20, 20);

//  doc.setFontSize(12);

//  doc.text(`Invoice #: ${invoicePreview.invoiceNumber}`, 20, 40);
//  doc.text(`Date: ${today}`, 20, 50);

//  doc.text(
//   `Student: ${recordData?.firstname || ""} ${recordData?.surname || ""}`,
//   20,
//   60
//  );

//  doc.text(`Course: ${invoicePreview.course}`, 20, 70);
//  doc.text(`Season: ${invoicePreview.season}`, 20, 80);

//  doc.text(`Subtotal: £${invoicePreview.subtotal}`, 20, 100);

//  let y = 110;

//  if (invoicePreview.discountAmount) {
//   doc.text(`Discount: -£${invoicePreview.discountAmount}`, 20, y);
//   y += 10;
//  }

//  invoicePreview.additionalFees?.forEach((f) => {
//   doc.text(`${f.name}: £${f.amount}`, 20, y);
//   y += 10;
//  });

//  y += 10;

//  doc.setFontSize(14);
//  doc.text(`Total: £${invoicePreview.total}`, 20, y);

//  doc.save(`Invoice-${invoicePreview.invoiceNumber}.pdf`);

// };



