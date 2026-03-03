import React, { useEffect, useState } from "react";
import { Form, Select, Input } from "antd";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";

import { FieldListDropdown } from "../../sidebar menu/commonComponents/FieldListDropdown";

const { Option } = Select;

const ProviderInfoForm = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  // const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);

  const fetchPaymentMethod = async () => {
    try {
      const responseData = await FieldListDropdown("paymentmethods", "title");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((name) => ({
            value: name._id, // Use the appropriate property for the value
            label: name.title, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setPaymentMethod(Name);
      }
    } catch (error) {
      console.error("Error fetching paymentmethods:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const responseData = await FieldListDropdown("countries", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchPaymentMethod();
  }, []);

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        School: recordData.School,
        surname: recordData.surname,

        firstname: recordData.firstname,
        salutation: recordData.salutation,
        title: recordData.title,

        dropping_off_students: recordData.dropping_off_students,
        offers_transfer_to_all: recordData.offers_transfer_to_all,
        offers_transfers: recordData.offers_transfers,
        address: recordData.address,
        postal_code: recordData.postal_code,
        city: recordData.city,
        state: recordData.state,
        country: recordData.country,
        phone: recordData.phone,
        office_phone: recordData.office_phone,
        cellphone: recordData.cellphone,

        fax: recordData.fax,
        email: recordData.email,
        payment_method: recordData.payment_method,

        transfer_leaving_from: recordData.transfer_leaving_from,

        transfer_taking_students_to: recordData.transfer_taking_students_to,
        transferleaving_from_accommodation_providers:
          recordData.transferleaving_from_accommodation_providers,
      });
      console.log("in all data", recordData);
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
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a Title!" }]}
      >
        <Input />
      </Form.Item>

      <hr />
      <h5>Payment method</h5>

      <Form.Item label="Payment method" name="payment_method">
        <Select
          placeholder="Select a Payment method"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {paymentMethod.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <hr />
      <h5>Contact details</h5>

      <Form.Item
        label="Salutation"
        name="salutation"
        rules={[{ required: true, message: "Please select a Salutation!" }]}
      >
        <Select placeholder="Select a Salutation">
          <Option value="Mr.">Mr.</Option>
          <Option value="Mrs.">Mrs.</Option>
          <Option value="non-binary">Non-Binary</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="First Name"
        name="firstname"
        rules={[{ required: true, message: "Please enter a first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Surname"
        name="surname"
        rules={[{ required: true, message: "Please enter a surname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input type="number" placeholder="Enter phone" />
      </Form.Item>
      <Form.Item label="Cellphone" name="cellphone">
        <Input type="number" placeholder="Enter cellphone" />
      </Form.Item>
      <Form.Item label="Fax" name="fax">
        <Input type="number" placeholder="Enter fax" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter Email!" }]}
      >
        <Input type="email" placeholder="Enter email" />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input placeholder="Enter Address" />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input placeholder="Enter city" />
      </Form.Item>

      <Form.Item label="Zip / Portal code" name="postal_code">
        <Input placeholder="Enter zip / postal code" />
      </Form.Item>

      <Form.Item label="State" name="state">
        <Input placeholder="Enter state" />
      </Form.Item>

      <Form.Item label="Country" name="country">
        <Select
          placeholder="SELECT COUNTRY"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {countries.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <hr />
      <h5>Transfers are offered from the following locations</h5>

      <Form.Item
        name="transfer_leaving_from"
        label="Transfer leaving from"
        rules={[
          {
            message: "Please select Transfer leaving from",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Gatwick Airport">Gatwick Airport</Option>
          <Option value="London City Airport">London City Airport</Option>
          <Option value="Heathrow Airport">Heathrow Airport</Option>
          <Option value="Luton Airport">Luton Airport</Option>
          <Option value="Stansted Airport">Stansted Airport</Option>
          <Option value="Southend Airport">Southend Airport</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="transfer_taking_students_to"
        label="Transfer taking students to"
        rules={[
          {
            message: "Please select Transfer taking students to ",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Gatwick Airport">Gatwick Airport</Option>
          <Option value="London City Airport">London City Airport</Option>
          <Option value="Heathrow Airport">Heathrow Airport</Option>
          <Option value="Luton Airport">Luton Airport</Option>
          <Option value="Stansted Airport">Stansted Airport</Option>
          <Option value="Southend Airport">Southend Airport</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Offers transfers from all accommodation providers"
        name="offers_transfers"
      >
        <Select placeholder="SELECT ..." onChange={handleChange}>
          <Option value="YES">YES</Option>
          <Option value="NO">NO</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="transferleaving_from_accommodation_providers"
        label="Transfer leaving from the following accommodation providers"
        rules={[
          {
            message: "Please select...",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="L-ist">L-ist</Option>
          <Option value="Hosts Imternational">Hosts Imternational</Option>
          <Option value="L-est">L-est</Option>
          <Option value="London Homestay">London Homestay</Option>
          <Option value="Residence Officer">Residence Officer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Offers transfer to all accommodation providers"
        name="offers_transfer_to_all"
      >
        <Select placeholder="SELECT ..." onChange={handleChange}>
          <Option value="YES">YES</Option>
          <Option value="NO">NO</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dropping_off_students"
        label="Dropping off students at the following accommodation providers"
        rules={[
          {
            message: "Please select...",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="L-ist">L-ist</Option>
          <Option value="Hosts Imternational">Hosts Imternational</Option>
          <Option value="L-est">L-est</Option>
          <Option value="London Homestay">London Homestay</Option>
          <Option value="Residence Officer">Residence Officer</Option>
        </Select>
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default ProviderInfoForm;
