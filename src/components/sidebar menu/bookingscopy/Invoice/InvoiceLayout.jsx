// import React from "react";

// const InvoiceLayout = React.forwardRef(({ invoicePreview, recordData }, ref) => {

//  const today = new Date().toLocaleDateString("en-GB");

//  return (
//   <div
//    ref={ref}
//    style={{
//     width: "800px",
//     background: "#fff",
//     padding: 40,
//     fontFamily: "Arial",
//     color: "#000"
//    }}
//   >

//    {/* HEADER */}

//    <div style={{display:"flex", justifyContent:"space-between"}}>

//     <div>

//      <h2 style={{color:"#c00000", margin:0}}>
//       SPEAKUP LONDON
//      </h2>

//     </div>

//     <div style={{fontSize:12, textAlign:"right"}}>

//      139 Oxford Street <br/>
//      London W1D 2JA <br/>
//      United Kingdom <br/><br/>

//      +44 (0)207 734 0444 <br/>
//      info@speakuplondon.com <br/>
//      www.speakuplondon.com

//     </div>

//    </div>

//    <div style={{marginTop:20}}>

//     <b>{recordData?.firstname} {recordData?.surname}</b><br/>

//     {recordData?.address || ""}

//    </div>

//    <div style={{display:"flex", justifyContent:"space-between", marginTop:20}}>

//     <div>

//      <b>Invoice - {invoicePreview?.invoiceNumber}</b>

//     </div>

//     <div>{today}</div>

//    </div>

//    <div style={{marginTop:10}}>

//     Customer number: {recordData?.student_id || ""}<br/>
//     Invoice number: {invoicePreview?.invoiceNumber}

//    </div>

//    <p style={{marginTop:20}}>
//     Dear {recordData?.firstname},
//    </p>

//    <p>
//     Please find the quotation for your selected course below.
//    </p>

//    {/* TABLE */}

//    <table
//     style={{
//      width:"100%",
//      borderCollapse:"collapse",
//      marginTop:20
//     }}
//    >

//     <thead>

//      <tr style={{borderBottom:"1px solid #000"}}>

//       <th style={{textAlign:"left"}}>Item</th>

//       <th style={{textAlign:"right"}}>Amount</th>

//      </tr>

//     </thead>

//     <tbody>

//      <tr>

//       <td>

//        {invoicePreview?.unitsUsed} weeks {invoicePreview?.course}

//       </td>

//       <td style={{textAlign:"right"}}>

//        £{invoicePreview?.subtotal}

//       </td>

//      </tr>

//      {invoicePreview?.additionalFees?.map((fee,i)=>(
//       <tr key={i}>

//        <td>{fee.name}</td>

//        <td style={{textAlign:"right"}}>£{fee.amount}</td>

//       </tr>
//      ))}

//      {invoicePreview?.discountAmount > 0 && (

//       <tr>

//        <td>Discount</td>

//        <td style={{textAlign:"right"}}>

//         -£{invoicePreview.discountAmount}

//        </td>

//       </tr>

//      )}

//      <tr style={{borderTop:"1px solid #000", fontWeight:"bold"}}>

//       <td>Total</td>

//       <td style={{textAlign:"right"}}>

//        £{invoicePreview?.total}

//       </td>

//      </tr>

//     </tbody>

//    </table>

//    <p style={{marginTop:30}}>

//     In order to secure your booking, please pay the total amount into our account.

//    </p>

//    <b>Bank Transfer</b>

//    <p style={{fontSize:13}}>

//     Speak Up London LTD<br/>
//     Sort code: 40-05-16<br/>
//     Account number: 12645926<br/><br/>

//     Overseas transfer<br/>
//     SWIFT: HBUKGB4B<br/>
//     IBAN: GB39HBUK40051612645926

//    </p>

//    <p>Best wishes,<br/>Speak Up London Team</p>

//   </div>
//  );
// });

// export default InvoiceLayout;



import React from "react";

const InvoiceLayout = React.forwardRef(({ invoicePreview, recordData }, ref) => {

 const today = new Date().toLocaleDateString("en-GB");

 const getCourseDescription = () => {

  if (!invoicePreview) return "";

  const {
   course,
   priceUnit,
   numberOfWeeks,
   hoursPerWeek,
   lessonsPerWeek,
   totalHours,
   totalLessons,
   unitsUsed
  } = invoicePreview;

  let description = course || "";

  switch (priceUnit) {

   case "per_week":
    description = `${unitsUsed || numberOfWeeks} week${(unitsUsed || numberOfWeeks) > 1 ? "s" : ""} ${course}`;
    break;

   case "per_hour":

    const hours =
     totalHours ||
     (numberOfWeeks && hoursPerWeek ? numberOfWeeks * hoursPerWeek : null);

    description = `${numberOfWeeks} weeks`;

    if (hoursPerWeek)
     description += ` (${hoursPerWeek} hours per week)`;

    if (hours)
     description += ` - ${hours} hours total`;

    description += ` ${course}`;

    break;

   case "per_lesson":

    const lessons =
     totalLessons ||
     (numberOfWeeks && lessonsPerWeek ? numberOfWeeks * lessonsPerWeek : null);

    description = `${numberOfWeeks} weeks`;

    if (lessonsPerWeek)
     description += ` (${lessonsPerWeek} lessons per week)`;

    if (lessons)
     description += ` - ${lessons} lessons`;

    description += ` ${course}`;

    break;

   case "package":

    description = `Package - ${course}`;
    break;

   default:
    description = `${course}`;
  }

  return description;
 };

 

 return (
  <div
   ref={ref}
   style={{
    width: "800px",
    background: "#fff",
    padding: 40,
    fontFamily: "Arial",
    color: "#000"
   }}
  >

   {/* HEADER */}

   <div style={{display:"flex", justifyContent:"space-between"}}>

    <div>
     <h2 style={{color:"#c00000", margin:0}}>
      SPEAKUP LONDON
     </h2>
    </div>

    <div style={{fontSize:12, textAlign:"right"}}>

     139 Oxford Street <br/>
     London W1D 2JA <br/>
     United Kingdom <br/><br/>

     +44 (0)207 734 0444 <br/>
     info@speakuplondon.com <br/>
     www.speakuplondon.com

    </div>

   </div>

   <div style={{marginTop:20}}>

    <b>{recordData?.firstname} {recordData?.surname}</b><br/>

    {recordData?.address || ""}

   </div>

   <div style={{display:"flex", justifyContent:"space-between", marginTop:20}}>

    <div>
     <b>Invoice number: {invoicePreview?.invoiceNumber}</b>
    </div>

    <div>{today}</div>

   </div>

   <div style={{marginTop:10}}>

    {/* Customer number: {recordData?.student_id || ""}<br/> */}
    {/* Invoice number: {invoicePreview?.invoiceNumber} */}

   </div>

   <p style={{marginTop:20}}>
    Dear {recordData?.firstname},
   </p>

   <p>
    Please find the quotation for your selected course below.
   </p>

   {/* TABLE */}

   <table
    style={{
     width:"100%",
     borderCollapse:"collapse",
     marginTop:20
    }}
   >

    <thead>

     <tr style={{borderBottom:"1px solid #000"}}>

      <th style={{textAlign:"left"}}>Item</th>

      <th style={{textAlign:"right"}}>Amount</th>

     </tr>

    </thead>

    <tbody>

     <tr>

      <td>
       {getCourseDescription()}
      </td>

      <td style={{textAlign:"right"}}>
       £{invoicePreview?.subtotal}
      </td>

     </tr>

     {invoicePreview?.additionalFees?.map((fee,i)=>(
      <tr key={i}>
       <td>{fee.name}</td>
       <td style={{textAlign:"right"}}>£{fee.amount}</td>
      </tr>
     ))}

     {invoicePreview?.discountAmount > 0 && (

      <tr>
       <td>Discount</td>
       <td style={{textAlign:"right"}}>
        -£{invoicePreview.discountAmount}
       </td>
      </tr>

     )}

     <tr style={{borderTop:"1px solid #000", fontWeight:"bold"}}>

      <td>Total</td>

      <td style={{textAlign:"right"}}>
       £{invoicePreview?.total}
      </td>

     </tr>

    </tbody>

   </table>

   <p style={{marginTop:30}}>
    In order to secure your booking, please pay the total amount into our account.
   </p>

   <b>Bank Transfer</b>

   <p style={{fontSize:13}}>

    Speak Up London LTD<br/>
    Sort code: 40-05-16<br/>
    Account number: 12645926<br/><br/>

    Overseas transfer<br/>
    SWIFT: HBUKGB4B<br/>
    IBAN: GB39HBUK40051612645926

   </p>

   <p>Best wishes,<br/>Speak Up London Team</p>

  </div>
 );
});

export default InvoiceLayout;

