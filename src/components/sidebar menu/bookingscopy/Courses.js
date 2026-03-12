import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Select,
  Checkbox,
  InputNumber,
  Row,
  Col,
  notification,
  Button,
} from "antd";
import baseURL from "../../../config";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../commonComponents/FieldListDropdown";
import moment from "moment";
import axios from "axios";
import { Modal } from "antd";
import jsPDF from "jspdf";

import InvoicePreviewModal from "./Invoice/InvoicePreviewModal";
import { downloadInvoicePDF } from "./Invoice/invoicePDF";
import InvoiceLayout from "./Invoice/InvoiceLayout";
import html2pdf from "html2pdf.js";

const { Option } = Select;

const Courses = ({
  fetchData,
  onFinish,
  setEditModalVisible,
  recordData,
  handleNewModalCancel,
  setNewModalVisible,
  selectedRecordId,
  candidateId,
  CancelBothModel,
  status,
}) => {
  const [form] = Form.useForm();
const selectedCourse = Form.useWatch("course", form);

  const [courseCategory, setCourseCategory] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);

  const [noOfWeeks, setNoOfWeeks] = useState(0);
  const [courseFromDate, setCourseFromDate] = useState("");
  const [courseToDate, setCourseToDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [weekdays, setWeekdays] = useState([]);

  // console.log("fetchdata", fetchData);
  const formRefs = useRef({});
  const [values, setValues] = useState([]);

  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [invoicePreview, setInvoicePreview] = useState(null);

  const [seasons, setSeasons] = useState([]);
const [season, setSeason] = useState(null);

const [pricingRaw, setPricingRaw] = useState([]);
const [pricingUnit, setPricingUnit] = useState(null);

const [discounts, setDiscounts] = useState([]);
const [selectedDiscount, setSelectedDiscount] = useState(null);
const [specialDiscount, setSpecialDiscount] = useState(null);
const invoiceRef = useRef(null);


useEffect(() => {
  fetchSeasons();
}, []);
const fetchSeasons = async () => {
  try {
    const res = await axios.get(`${baseURL}/season`);
    setSeasons(res.data);
  } catch (err) {
    console.error(err);
  }
};

const fetchPricing = async (seasonId) => {

  try {

    const res = await axios.get(`${baseURL}/get_price`, {
      params: { seasonId }
    });

    setPricingRaw(res.data);

    // ✅ extract unique courses
    const courseList = res.data.map(p => ({
      value: p.courseId._id,
      label: p.courseId.title_english
    }));

    setCourses(courseList);

  }
  catch(err){
    console.error(err);
  }

};


  const fetchCourseCategory = async () => {
    try {
      const responseData = await FieldListDropdown(
        "coursecategories",
        "name_english",
      );
      if (responseData) {
        // Extract category names from response data
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.name_english, // Use the appropriate property for the label
        }));
        // const names = responseData.map((category) => category.name_english);
        setCourseCategory(names);
      }
    } catch (error) {
      console.error("Error fetching coursecategories:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const responseData = await FieldListDropdown("courses", "title_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.title_english, // Use the appropriate property for the label
        }));
        // const names = responseData.map((category) => category.title_english);
        setCourses(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const fetchCourseLevel = async () => {
    try {
      const responseData = await FieldListDropdown(
        "courselevels",
        "name_english",
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const levels = responseData.map((level) => ({
          value: level._id, // Use the appropriate property for the value
          label: level.name_english, // Use the appropriate property for the label
        }));
        setCourseLevel(levels);
      }
    } catch (error) {
      console.error("Error fetching course levels:", error);
    }
  };



const generatePreview = async () => {

 try {

  const values = form.getFieldsValue(true);

  if (!values.course || !values.no_of_weeks || !values.season)
  {
   notification.warning({
    message: "Select season, course and weeks first"
   });
   return;
  }

  // ✅ GET pricing directly
  const pricing = pricingRaw.find(
    p => p.courseId._id === values.course
  );

  if (!pricing)
  {
   notification.error({
    message: "Pricing not found"
   });
   return;
  }

  const payload = {

   seasonId: values.season,

   courseId: values.course,

   pricingUnit: pricing.pricingUnit,  // ✅ FIXED

   weeks: values.no_of_weeks,

   daysPerWeek: values.days_per_week || null,

   hoursPerWeek: values.hours_per_week || null,

   lessonsPerWeek: values.lessons_per_week || null,  

   discountId: selectedDiscount !== "special discount" ? selectedDiscount : null,

specialDiscount: selectedDiscount === "special discount" ? specialDiscount : null

  };

  console.log("Invoice payload:", payload);

  const res = await axios.post(
   `${baseURL}/invoice/preview`,
   payload
  );

  setInvoicePreview(res.data);

  setInvoiceModalVisible(true);

 }
 catch(err)
 {
  notification.error({
   message: "Invoice preview failed"
  });
 }

};


const fetchDiscounts = async (courseId) => {
  try {

    const res = await axios.post(`${baseURL}/active-discounts`, {
      courseId
    });

    const list = res.data.data || [];

    const formatted = list.map(d => ({
      value: d._id,
      label: d.name
    }));

    setDiscounts(formatted);

  } catch (err) {

    console.error("Discount fetch failed", err);
    setDiscounts([]);

  }
};

useEffect(() => {

setCourses([]);
setPricingRaw([]);
setPricingUnit(null);

}, [recordData]);

  useEffect(() => {
    fetchCourseCategory();
    // fetchCourses();
    fetchCourseLevel();
  }, []);

  const fetchWeekdays = async (courseName) => {
    try {
      const response = await axios.post(`${baseURL}/get-weekdays`, {
        courseName,
      });

      if (response.data.error) {
        // Handle case where no matching classes found
        setWeekdays([]);
      } else {
        // Set weekdays from response data
        setWeekdays(response.data);
      }
    } catch (error) {
      console.error("Error fetching weekdays:", error);
      // Handle error case
      setWeekdays([]);
    }
  };

useEffect(() => {
  if (!recordData) return;

  const loadEditData = async () => {

    const today = new Date().toISOString().split("T")[0];

    const formattedFrom = recordData.course_from_date
      ? moment(recordData.course_from_date).format("YYYY-MM-DD")
      : today;

    const formattedTo = recordData.course_to_date
      ? moment(recordData.course_to_date).format("YYYY-MM-DD")
      : "";

    setCourseFromDate(formattedFrom);
    setCourseToDate(formattedTo);
    setNoOfWeeks(recordData.no_of_weeks || 0);
    setIsEditing(true);

    // ✅ STEP 1 — SET SEASON FIRST
    form.setFieldsValue({
      season: recordData.season
    });

    // ✅ STEP 2 — FETCH PRICING FOR THAT SEASON
    const res = await axios.get(`${baseURL}/get_price`, {
      params: { seasonId: recordData.season }
    });

    const pricingData = res.data;
    setPricingRaw(pricingData);

    // Build course list
    const courseList = pricingData.map(p => ({
      value: p.courseId._id,
      label: p.courseId.title_english
    }));

    setCourses(courseList);

    // ✅ STEP 3 — FIND COURSE ID USING LABEL
    const matchedCourse = pricingData.find(
      p => p.courseId.title_english === recordData.course
    );

    const courseId = matchedCourse?.courseId._id;

    // ✅ STEP 4 — SET ALL FIELDS
    form.setFieldsValue({
      category: courseCategory.find(
        c => c.label === recordData.category
      )?.value,

      course: courseId,

      level: courseLevel.find(
        l => l.label === recordData.level
      )?.value,

      no_of_weeks: recordData.no_of_weeks,
      course_from_date: formattedFrom,
      course_to_date: formattedTo,
      trial: recordData.trial,
      days_per_week: recordData.days_per_week,
      hours_per_week: recordData.hours_per_week,
      lessons_per_week: recordData.lessons_per_week
    });

    // ✅ STEP 5 — SET PRICING UNIT (CRITICAL)
    setPricingUnit(matchedCourse?.pricingUnit);

    // Load weekdays
    if (recordData.course) {
      fetchWeekdays(recordData.course);
    }
  };

  loadEditData();

}, [recordData, courseCategory, courseLevel]);


  const handleCourseChange = async (value) => {
    setCourse(value);

    // Reset preferred_course_start_weekday field when course changes
    form.setFieldsValue({
      preferred_course_start_weekday: undefined,
    });

    // Fetch weekdays based on course
    fetchWeekdays(value);
  };

  const handlePreferredWeekdayChange = (value) => {
    form.setFieldsValue({
      preferred_course_start_weekday: value,
    });
  };

  const handleWeeksChange = (e) => {
    const weeks = parseInt(e.target.value, 10);
    setNoOfWeeks(weeks);
    if (courseFromDate) {
      updateToDate(courseFromDate, weeks);
    }
  };

  const handleFromDateChange = (e) => {
    const fromDate = e.target.value;
    setCourseFromDate(fromDate);
    if (noOfWeeks > 0) {
      updateToDate(fromDate, noOfWeeks);
    }
  };

  const handleToDateChange = (e) => {
    const toDate = e.target.value;
    setCourseToDate(toDate);
    form.setFieldsValue({ course_to_date: toDate });
  };

  const updateToDate = (fromDate, weeks) => {
    if (fromDate && weeks > 0) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(fromDateObj);
      toDateObj.setDate(fromDateObj.getDate() + weeks * 7 - 1);
      const toDate = toDateObj.toISOString().split("T")[0];
      setCourseToDate(toDate);
      form.setFieldsValue({ course_to_date: toDate }); // Update form field
    } else {
      setCourseToDate("");
      form.setFieldsValue({ course_to_date: "" }); // Clear form field if no valid dates
    }
  };
  const resetAllFields = () => {
    form.resetFields();
  };
  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    // console.log("its running");
  };

const handleFinish = async (formValues) => {

  const selectedCategory = courseCategory.find(
    (item) => item.value === formValues.category
  )?.label;

  const selectedCourse = courses.find(
    (item) => item.value === formValues.course
  )?.label;

  const selectedLevel = courseLevel.find(
    (item) => item.value === formValues.level
  )?.label;

  const allValues = {

    season: season,
    category: selectedCategory,

    course: selectedCourse,

    level: selectedLevel,

    days_per_week: Number(formValues.days_per_week),

    hours_per_week: Number(formValues.hours_per_week),

    no_of_weeks: Number(formValues.no_of_weeks),

    flexible_assignment: !!formValues.flexible_assignment,

    course_from_date: new Date(formValues.course_from_date),

    course_to_date: new Date(formValues.course_to_date),

  };

  onFinish(allValues);

};

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };
  const formatDMY = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

// const downloadInvoicePDF = () => {

//  const doc = new jsPDF();

//  doc.setFontSize(18);
//  doc.text("SpeakUp London", 20, 20);

//  doc.setFontSize(12);

//  doc.text(`Invoice Number: ${invoicePreview.invoiceNumber}`, 20, 40);

//  doc.text(`Student Name: ${recordData?.firstname || ""} ${recordData?.surname || ""}`, 20, 50);

//  doc.text(`Course: ${courses.find(c=>c.value===form.getFieldValue("course"))?.label}`, 20, 60);

//  doc.text(`Weeks: ${form.getFieldValue("no_of_weeks")}`, 20, 70);

//  doc.text(`Subtotal: £${invoicePreview.subtotal}`, 20, 90);

//  doc.text(`Discount: £${invoicePreview.discountAmount}`, 20, 100);

//  doc.text(`Total: £${invoicePreview.total}`, 20, 110);

//  doc.save(`Invoice-${invoicePreview.invoiceNumber}.pdf`);

// };


const downloadInvoicePDF = () => {

 if (!invoiceRef.current) return;

 const opt = {
  margin: 4,
  filename: `Invoice-${invoicePreview.invoiceNumber}.pdf`,
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
 };

 html2pdf().set(opt).from(invoiceRef.current).save();

};
  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
        wrapperCol={{ span: 16 }}
      >
       <Form.Item
 label="Category"
 name="category"
 rules={[{ required: true, message: "Please select category!" }]}
>
<Select placeholder="Select a category">

{courseCategory.map((group) => (

<Option key={group.value} value={group.value}>
 {group.label}
</Option>

))}

</Select>
</Form.Item>


<Form.Item
  label="Season"
  name="season"
  rules={[{ required: true, message: "Select season" }]}
>
  <Select
    placeholder="Select season"
    onChange={(value) => {

      setSeason(value);

      fetchPricing(value);

      form.setFieldsValue({
        course: undefined
      });

      setPricingUnit(null);

    }}
  >

    {seasons.map(s => (

      <Option key={s._id} value={s._id}>

        {s.name}

      </Option>

    ))}

  </Select>
</Form.Item>



        {/* <Form.Item label="Course" name="course" rules={[{ required: true }]}>
          <Select>
            {courses.map((name) => (
              <Option key={name.value} value={name.value}>
                {name.label}
              </Option>
            ))}
          </Select>
        </Form.Item> */}



        <Form.Item label="Course" name="course" rules={[{ required: true }]}>

<Select
onChange={(courseId) => {

  handleCourseChange(courseId);

  const pricing = pricingRaw.find(
    p => p.courseId._id === courseId
  );

  setPricingUnit(pricing?.pricingUnit);

  // fetch discounts for selected course
  fetchDiscounts(courseId);

  // ✅ RESET DISCOUNT STATE
  setSelectedDiscount(null);
  setSpecialDiscount(null);

  // ✅ RESET FORM FIELDS
  form.setFieldsValue({
    discount: undefined,
    special_discount: undefined
  });

}}
>

{courses.map((name) => (

<Option key={name.value} value={name.value}>
{name.label}
</Option>

))}

</Select>

</Form.Item>


<Form.Item label="Discount" name="discount">

<Select
placeholder="Select discount (optional)"
onChange={(value)=>{

setSelectedDiscount(value);

if (value !== "special discount") {
  setSpecialDiscount(null);

  form.setFieldsValue({
    special_discount: undefined
  });
}

}}
>

{discounts.map(d => (

<Option key={d.value} value={d.value}>
{d.label}
</Option>

))}

<Option value="special discount">Special discount</Option>

</Select>

</Form.Item>

{selectedDiscount === "special discount" && (

<Form.Item
label="Special Discount Amount"
name="special_discount"
rules={[
{ required:true, message:"Enter discount amount"}
]}
>

<InputNumber
style={{width:"100%"}}
min={0}
placeholder="Enter discount amount"
onChange={(v)=>setSpecialDiscount(v)}
/>

</Form.Item>

)}

        {/* Show subfields only if a course is selected */}
        {/* {selectedCourse && (
          <Form.Item label="Days per week" required>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="days_per_week"
                  noStyle
                  rules={[
                    { required: true, message: "Please select days per week!" },
                  ]}
                >
                  <Select placeholder="Days per week">
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Hours per week"
                  name="hours_per_week"
                  rules={[
                    { required: true, message: "Please enter hours per week!" },
                    {
                      type: "number",
                      min: 1,
                      max: 50,
                      message: "Value must be between 1 and 50!",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={50}
                    placeholder="Hours per week"
                    style={{ width: "100%" }}
                    // ✅ Block non-digits, limit 2 digits, and restrict >50
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                        return;
                      }

                      const value = e.currentTarget.value + e.key;

                      // 🚫 Limit length to 2 digits
                      if (value.length > 2) {
                        e.preventDefault();
                        return;
                      }

                      // 🚫 Prevent numbers > 50
                      if (parseInt(value, 10) > 50) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )} */}

{pricingUnit === "week" && (

<Form.Item label="Days per week" required>

<Row gutter={16}>

<Col span={8}>

<Form.Item
name="days_per_week"
noStyle
rules={[{ required: true }]}
>

<Select>

<Option value={3}>3</Option>
<Option value={4}>4</Option>
<Option value={5}>5</Option>

</Select>

</Form.Item>

</Col>

<Col span={12}>

<Form.Item
label="Hours per week"
name="hours_per_week"
rules={[{ required: true }]}
>

<InputNumber style={{width:"100%"}}/>

</Form.Item>

</Col>

</Row>

</Form.Item>

)}

{pricingUnit === "hour" && (

<Form.Item
label="Hours per week"
name="hours_per_week"
rules={[{ required: true }]}
>

<InputNumber style={{width:"100%"}}/>

</Form.Item>

)}

{pricingUnit === "lesson" && (

<Form.Item
label="Lessons per week"
name="lessons_per_week"
rules={[{ required: true }]}
>

<InputNumber style={{width:"100%"}}/>

</Form.Item>

)}



       <Form.Item
 label="Level"
 name="level"
 rules={[{ required: true, message: "Please select level!" }]}
>
<Select placeholder="Select a course level">

{courseLevel.map((item) => (

<Select.Option key={item.value} value={item.value}>
 {item.label}
</Select.Option>

))}

</Select>
</Form.Item>

        <Form.Item
          label="Number of weeks"
          name="no_of_weeks"
          rules={[
            { required: true, message: "Please enter number of weeks!" },
            {
              type: "number",
              min: 1,
              max: 44,
              message: "Value must be between 1 and 44!",
            },
          ]}
        >
          <InputNumber
            value={noOfWeeks}
            onChange={(value) => {
              // ❌ Ignore null, undefined or out of range
              if (value === null || value === undefined) {
                setNoOfWeeks(null);
                return;
              }
              if (value < 1 || value > 44) return;

              setNoOfWeeks(value);

              // Call your existing updateToDate if courseFromDate exists
              if (courseFromDate) {
                updateToDate(courseFromDate, value);
              }
            }}
            min={1}
            max={44}
            placeholder="Number of weeks"
            style={{ width: "100%" }}
            // ✅ Block typing letters, symbols, numbers >44, more than 2 digits
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
                return;
              }
              const value = `${noOfWeeks || ""}${e.key}`;
              if (value.length > 2 || parseInt(value, 10) > 44) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text");
              if (!/^\d{1,2}$/.test(paste) || parseInt(paste, 10) > 44) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        {status?.includes("Trial Scheduled") && (
          <Form.Item label="Trial" name="trial" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        )}

        {/* // FROM date */}
        <Form.Item
          label="Time frame"
          name="course_from_date"
          rules={[{ required: true, message: "Please select from date!" }]}
        >
          <div
            className="date-picker-container"
            style={{ position: "relative" }}
          >
            {/* Visible text field */}
            <input
              type="text"
              id="date-picker-course1" // keep your original id/styles
              className="date-picker"
              placeholder="dd/mm/yyyy"
              value={courseFromDate ? formatDMY(courseFromDate) : ""}
              readOnly
              onClick={() => {
                const el = document.getElementById(
                  "date-picker-course1-hidden",
                );
                if (!el) return;
                el.focus({ preventScroll: true });
                if (typeof el.showPicker === "function") el.showPicker();
                else el.click(); // fallback
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const el = document.getElementById(
                    "date-picker-course1-hidden",
                  );
                  if (!el) return;
                  el.focus({ preventScroll: true });
                  if (typeof el.showPicker === "function") el.showPicker();
                  else el.click();
                }
              }}
            />

            {/* Hidden native date input (drives your existing state/logic) */}
            <input
              type="date"
              id="date-picker-course1-hidden"
              name="course_from_date"
              value={courseFromDate || ""}
              onChange={handleFromDateChange}
              min={
                !isEditing ? new Date().toISOString().split("T")[0] : undefined
              }
              aria-hidden="true"
              style={{
                position: "absolute",
                opacity: 0,
                width: 0,
                height: 0,
                pointerEvents: "none",
              }}
              tabIndex={-1}
            />
          </div>
        </Form.Item>

        {/* TO date */}
        <Form.Item
          label="To"
          name="course_to_date"
          rules={[{ required: true, message: "Please select to date!" }]}
        >
          <div
            className="date-picker-container"
            style={{ position: "relative" }}
          >
            {/* Visible text field */}
            <input
              type="text"
              id="date-picker-course2"
              className="date-picker"
              placeholder="dd/mm/yyyy"
              value={courseToDate ? formatDMY(courseToDate) : ""}
              readOnly
              onClick={() => {
                const el = document.getElementById(
                  "date-picker-course2-hidden",
                );
                if (!el) return;
                el.focus({ preventScroll: true });
                if (typeof el.showPicker === "function") el.showPicker();
                else el.click();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const el = document.getElementById(
                    "date-picker-course2-hidden",
                  );
                  if (!el) return;
                  el.focus({ preventScroll: true });
                  if (typeof el.showPicker === "function") el.showPicker();
                  else el.click();
                }
              }}
            />

            {/* Hidden native date input */}
            <input
              type="date"
              id="date-picker-course2-hidden"
              name="course_to_date"
              value={courseToDate || ""}
              onChange={handleToDateChange}
              min={
                !isEditing ? new Date().toISOString().split("T")[0] : undefined
              }
              aria-hidden="true"
              style={{
                position: "absolute",
                opacity: 0,
                width: 0,
                height: 0,
                pointerEvents: "none",
              }}
              tabIndex={-1}
            />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="default" onClick={generatePreview}>
            Preview Invoice
          </Button>
        </Form.Item>

        <SubmitCancelButtonGroup
          recordData={recordData}
          handleNewModalCancel={handleNewModalCancel}
          CancelBothModel={CancelBothModel1}
        />
      </Form>

     
{/* <InvoicePreviewModal
 visible={invoiceModalVisible}
 onClose={() => setInvoiceModalVisible(false)}
 invoicePreview={invoicePreview}
 recordData={recordData}
 onDownload={() =>
  downloadInvoicePDF(invoicePreview, recordData)
 }
/> */}


<Modal
 title="Invoice Preview"
 open={invoiceModalVisible}
 onCancel={() => setInvoiceModalVisible(false)}
 footer={null}
 width={900}
>

<div style={{display:"flex", justifyContent:"center"}}>

<div ref={invoiceRef}>

<InvoiceLayout
 invoicePreview={invoicePreview}
 recordData={recordData}
/>

</div>

</div>

<div style={{textAlign:"right", marginTop:20}}>

<Button
 type="primary"
 onClick={downloadInvoicePDF}
>
Download Invoice
</Button>

</div>

</Modal>



    </>
  );
};

export default Courses;
