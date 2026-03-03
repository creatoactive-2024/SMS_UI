import React, { useEffect } from "react";
import { Form, Select, Input, DatePicker, Checkbox, Button } from "antd";
import moment from "moment";
import englishFlag from "../../../../img/englishFlag.png";
// import portugeseFlag from "../../../../img/Portugal-flag.png";
// import spanishFlag from "../../../../img/Spain-flag.png";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const InfoPeriods = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    if (recordData) {
      const {
        title_english,
        // title_portuguese,
        // title_spanish,
        from,
        end,
        course_price_previous_year,
        acc_price_previous_year,
        transfer_price_previous_year,
        insurance_price_previous_year,
        alternative_pricing,
        courses_accommodation_transfer,
        insurance,
        activities,
        period_teacher_payments,
        period_transfer_payments,
        period_accomodation_payments,
      } = recordData;

      // Format dates where necessary
      const formattedFrom = from ? moment(from) : null;
      const formattedEnd = end ? moment(end) : null;
      const formattedCoursePricePreviousYear = course_price_previous_year
        ? moment(course_price_previous_year)
        : null;
      const formattedAccPricePreviousYear = acc_price_previous_year
        ? moment(acc_price_previous_year)
        : null;
      const formattedTransferPricePreviousYear = transfer_price_previous_year
        ? moment(transfer_price_previous_year)
        : null;
      const formattedInsurancePricePreviousYear = insurance_price_previous_year
        ? moment(insurance_price_previous_year)
        : null;

      // Set form fields values
      form.setFieldsValue({
        title_english,
        // title_portuguese,
        // title_spanish,
        from: formattedFrom,
        end: formattedEnd,
        course_price_previous_year: formattedCoursePricePreviousYear,
        acc_price_previous_year: formattedAccPricePreviousYear,
        transfer_price_previous_year: formattedTransferPricePreviousYear,
        insurance_price_previous_year: formattedInsurancePricePreviousYear,
        alternative_pricing,
        courses_accommodation_transfer,
        insurance,
        activities,
        period_teacher_payments,
        period_transfer_payments,
        period_accomodation_payments,
      });

      // Handle direct DOM manipulation for date inputs
      document.getElementById("date-picker-period1").value = formattedFrom
        ? formattedFrom.format("YYYY-MM-DD")
        : "";
      document.getElementById("date-picker-period2").value = formattedEnd
        ? formattedEnd.format("YYYY-MM-DD")
        : "";
      document.getElementById("date-picker-period3").value =
        formattedCoursePricePreviousYear
          ? formattedCoursePricePreviousYear.format("YYYY-MM-DD")
          : "";
      document.getElementById("date-picker-period4").value =
        formattedAccPricePreviousYear
          ? formattedAccPricePreviousYear.format("YYYY-MM-DD")
          : "";
      document.getElementById("date-picker-period5").value =
        formattedTransferPricePreviousYear
          ? formattedTransferPricePreviousYear.format("YYYY-MM-DD")
          : "";
      document.getElementById("date-picker-period6").value =
        formattedInsurancePricePreviousYear
          ? formattedInsurancePricePreviousYear.format("YYYY-MM-DD")
          : "";

      console.log("Form values set:", form.getFieldsValue());
    }
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("AllData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Title (English)"
        name="title_english"
        rules={[{ required: true, message: "Please enter the Title!" }]}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "27px",
              height: "22px",
              background: `url(${englishFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_english" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      {/* <Form.Item
        label="Title (Spanish)"
        name="title_spanish"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "27px",
              height: "22px",
              background: `url(${spanishFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_spanish" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item
        label="Title (Portuguese)"
        name="title_portuguese"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "35px",
              background: `url(${portugeseFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_portuguese" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item> */}

      <Form.Item
        label="From"
        name="from"
        rules={[{ required: true, message: "Please select From!" }]}
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-period1"
            className="date-picker"
            name="from"
          />
        </div>
      </Form.Item>

      <Form.Item
        label="End"
        name="end"
        rules={[{ required: true, message: "Please select End!" }]}
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-period2"
            className="date-picker"
            name="end"
          />
        </div>
      </Form.Item>

      <hr />
      <h5>Early bird discount</h5>

      <Form.Item
        label="Course price of previous year will be charged until"
        name="course_price_previous_year"
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-period3"
            className="date-picker"
            name="course_price_previous_year"
          />
        </div>
      </Form.Item>

      <Form.Item
        label="Acc price of previous year will be charged until"
        name="acc_price_previous_year"
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-period4"
            className="date-picker"
            name="acc_price_previous_year"
          />
        </div>
      </Form.Item>

      <Form.Item
        label="Transfer price of previous year will be charged until"
        name="transfer_price_previous_year"
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-period5"
            className="date-picker"
            name="transfer_price_previous_year"
          />
        </div>
      </Form.Item>

      <Form.Item
        label="Insurance price of previous year will be charged until"
        name="insurance_price_previous_year"
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-period6"
            className="date-picker"
            name="insurance_price_previous_year"
          />
        </div>
      </Form.Item>

      <Form.Item label="Alternative pricing" name="alternative_pricing">
        <Select placeholder="Select  Alternative pricing">
          <Option value="2019">2019</Option>
          <Option value="2018">2018</Option>
          <Option value="20% Discount">20% Discount</Option>
          <Option value="25% Discount">25% Discount</Option>
          <Option value="30% Discount">30% Discount</Option>
          <Option value="2020 Prices">2020 Prices</Option>
          <Option value="30% Discount">30% Discount</Option>
          <Option value="2023 Full Prices">2023 Full Prices</Option>
          <Option value="10% Discount">10% Discount</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Prices</h5>
      <Form.Item
        label="Courses,Accommodation,Transfer"
        name="courses_accommodation_transfer"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Insurance" name="insurance" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Activities" name="activities" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Costs</h5>

      <Form.Item
        label="Period for teacher payments"
        name="period_teacher_payments"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Period for transfer payments"
        name="period_transfer_payments"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Period for accomodation payments"
        name="period_accomodation_payments"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default InfoPeriods;
