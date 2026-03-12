import React from "react";
import { Modal, Button, Table } from "antd";

const InvoicePreviewModal = ({
  visible,
  onClose,
  invoicePreview,
  recordData,
  onDownload
}) => {

 const today = new Date().toLocaleDateString();

 const columns = [
  {
   title: "Description",
   dataIndex: "description",
  },
  {
   title: "Amount (£)",
   dataIndex: "amount",
   align: "right",
   render: (v) => `£${v}`
  }
 ];

 const rows = [];

 if (invoicePreview) {

  rows.push({
   key: "subtotal",
   description: "Course Fee",
   amount: invoicePreview.subtotal
  });

  if (invoicePreview.discountAmount) {
   rows.push({
    key: "discount",
    description: `Discount (${invoicePreview.discount?.name || ""})`,
    amount: `-${invoicePreview.discountAmount}`
   });
  }

  invoicePreview.additionalFees?.forEach((f, i) => {
   rows.push({
    key: `fee-${i}`,
    description: f.name,
    amount: f.amount
   });
  });
 }

 return (

  <Modal
   title="Invoice Preview"
   open={visible}
   onCancel={onClose}
   footer={null}
   width={700}
  >

   <div style={{padding:25}}>

    <h2>SpeakUp London</h2>
    <p style={{color:"#777"}}>Official Invoice</p>

    <hr/>

    <div style={{display:"flex", justifyContent:"space-between"}}>

     <div>

      <p><b>Student</b></p>
      <p>{recordData?.firstname} {recordData?.surname}</p>

      <p><b>Course</b></p>
      <p>{invoicePreview?.course}</p>

      <p><b>Season</b></p>
      <p>{invoicePreview?.season}</p>

     </div>

     <div style={{textAlign:"right"}}>

      <p><b>Invoice #</b></p>
      <p>{invoicePreview?.invoiceNumber}</p>

      <p><b>Date</b></p>
      <p>{today}</p>

     </div>

    </div>

    <Table
     columns={columns}
     dataSource={rows}
     pagination={false}
     bordered
     style={{marginTop:20}}
    />

    <div style={{
     textAlign:"right",
     marginTop:20,
     fontSize:18
    }}>
     <b>Total: £{invoicePreview?.total}</b>
    </div>

    <div style={{marginTop:25, textAlign:"right"}}>

     <Button
      type="primary"
      onClick={onDownload}
     >
      Download PDF
     </Button>

    </div>

   </div>

  </Modal>
 );
};

export default InvoicePreviewModal;