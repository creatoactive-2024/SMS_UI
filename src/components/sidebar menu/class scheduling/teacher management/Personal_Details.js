import React, { useState, useEffect } from "react";
import { Form, Select, Input, DatePicker, Checkbox, Button } from "antd";
import moment from "moment";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const Personal_Details = ({ onFinish, recordData, CancelBothModel, form }) => {
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [motherTounge, setMotherTounge] = useState([]);

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

  const fetchNationality = async () => {
    try {
      const responseData = await FieldListDropdown("countries", "nationality"); // Your API call to get the list of countries

      if (responseData) {
        // Filter out entries with null or empty nationalities
        const validCountries = responseData.filter(
          (country) => country.nationality && country.nationality.trim() !== ""
        );

        // Construct objects with 'value' and 'label' properties
        const Country = validCountries
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.nationality, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setNationality(Country); // Set the state with the filtered countries
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchMotherTounge = async () => {
    try {
      const responseData = await FieldListDropdown("mothertongues", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Mothertounge = responseData
          .map((item) => ({
            value: item._id, // Use the appropriate property for the value
            label: item.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setMotherTounge(Mothertounge);
      }
    } catch (error) {
      console.error("Error fetching Mothertounge:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchNationality();
    fetchMotherTounge();
  }, []);

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      const formattedDob = recordData.dob
        ? moment(recordData.dob).format("YYYY-MM-DD")
        : null;

      form.setFieldsValue({
        school_name: recordData.school_name,
        last_name: recordData.last_name,

        first_name: recordData.first_name,
        gender: recordData.gender,
        // dob: recordData.dob ? moment(recordData.dob) : null,
        dob: formattedDob,
        address_addon: recordData.address_addon,
        nationality_name: recordData.nationality_name,
        mother_tongue: recordData.mother_tongue,
        address: recordData.address,
        pincode: recordData.pincode,
        city: recordData.city,
        state: recordData.state,
        country: recordData.country,
        phone: recordData.phone,
        office_phone: recordData.office_phone,
        cellphone: recordData.cellphone,
        fax: recordData.fax,
        email: recordData.email,
        skype: recordData.skype,

        security_number: recordData.security_number,
        note: recordData.note,

        // ... other fields
      });

      document.getElementById("date-picker-teacher").value = formattedDob;

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
      <br />
      {/* <Form.Item
        name="school_name"
        label="Schools"
        rules={[
          {
            message: "Please select How do you learn best?",
            type: "array",
          },
        ]}
      
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Speakup london">Speakup london</Option>
          
        </Select>
      </Form.Item> */}
      <Form.Item
        name="school_name"
        label="Schools"
        initialValue="SpeakUp London" // Ensures it's treated as a string
      >
        <div>
          <span>SpeakUp London</span>
          <Input type="hidden" value="SpeakUp London" />
        </div>
      </Form.Item>
      <hr />
      <h5>Personal Details</h5>

      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: "Please enter a first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: "Please enter a surname!" }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item label="Gender" name="gender">
        <Select placeholder="Select a gender">
          <Option value="female">Female</Option>
          <Option value="male">Male</Option>
          <Option value="non-binary">Non-Binary</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Birthdate" name="dob">
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-teacher"
            className="date-picker"
            name="dob"
          />
        </div>
      </Form.Item>

      <Form.Item label="Nationality" name="nationality_name">
        <Select
          placeholder="Select nationality"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {nationality.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Mother Tongue" name="mother_tongue">
        <Select
          placeholder="Select mother tongue"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {motherTounge.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <hr />
      <h5>Contact Details</h5>

      <Form.Item label="Address" name="address">
        <Input placeholder="Enter Address" />
      </Form.Item>

      <Form.Item label="Address addon" name="address_addon">
        <Input placeholder="Enter Add on" />
      </Form.Item>
      <Form.Item label="Zip / Portal code" name="pincode">
        <Input placeholder="Enter zip / postal code" />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input placeholder="Enter city" />
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

      <Form.Item label="Phone" name="phone">
        <Input type="number" placeholder="Enter phone" />
      </Form.Item>
      <Form.Item label="Phone (office)" name="office_phone">
        <Input type="number" placeholder="Enter phone(office)" />
      </Form.Item>
      <Form.Item label="Cellphone" name="cellphone">
        <Input type="number" placeholder="Enter cellphone" />
      </Form.Item>
      <Form.Item label="Fax" name="fax">
        <Input type="text" placeholder="Enter fax" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input type="email" placeholder="Enter email" />
      </Form.Item>
      <Form.Item label="Skype" name="skype">
        <Input type="text" placeholder="Enter skype" />
      </Form.Item>

      <hr />
      <h5>Other</h5>
      <Form.Item label="Social security number" name="security_number">
        <Input placeholder="Enter social security number" />
      </Form.Item>
      <Form.Item label="Note" name="note">
        <Input />
      </Form.Item> */}

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default Personal_Details;
