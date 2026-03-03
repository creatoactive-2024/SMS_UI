// AllData.js
import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  Checkbox,
  Button,
  Divider,
} from "antd";
import "../commonComponents/common.css";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../sidebar menu/commonComponents/FieldListDropdown";
import axios from "axios";
import baseURL from "../commonComponents/baseURL";

const { Option } = Select;

const AllData = ({
  form,
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  // const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [motherTounge, setMotherTounge] = useState([]);
  const [agentlist, setAgentList] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [howHereAboutUs, setHowHereAboutUs] = useState([]);
  const [salespersonList, setSalespersonList] = useState([]);
  const [agentEmployeeList, setAgentEmployeeList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState([]);

  const onChange = (date) => {
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }
  };

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

  const fetchAgentEmployeeList = async () => {
    try {
      const responseData = await FieldListDropdown(
        "agencyemployees",
        "firstname"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData.map((firstname) => ({
          value: firstname._id, // Use the appropriate property for the value
          label: firstname.firstname, // Use the appropriate property for the label
        }));
        setAgentEmployeeList(Name);
      }
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

  const fetchSalesperson = async () => {
    try {
      const responseData = await FieldListDropdown(
        "overviewadmins",
        "first_name"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((firstname) => ({
            value: firstname._id, // Use the appropriate property for the value
            label: firstname.first_name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setSalespersonList(Name);
      }
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

  const fetchHowHereAboutUs = async () => {
    try {
      const responseData = await FieldListDropdown(
        "howdidyouheres",
        "title_english"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.title_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setHowHereAboutUs(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  const fetchStudentStatus = async () => {
    try {
      const responseData = await FieldListDropdown("studentstatuses", "title");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.title, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setStudentStatus(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  const fetchAgentList = async () => {
    try {
      const responseData = await FieldListDropdown("agents", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Agent = responseData
          .map((agent) => ({
            value: agent._id, // Use the appropriate property for the value
            label: agent.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setAgentList(Agent);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
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
    fetchAgentList();
    fetchStudentStatus();
    fetchHowHereAboutUs();
    fetchSalesperson();
    fetchAgentEmployeeList();
    fetchPaymentMethod();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedAgent && selectedAgent.name) {
        try {
          const response = await axios.post(`${baseURL}/agency-employees`, {
            agentName: selectedAgent.name,
          });
          setAgentEmployeeList(response.data);
          form.setFieldsValue({ agent_employee_name: null }); // Clear the agency employee name when agent changes
        } catch (error) {
          console.error("Error fetching employees", error);
          setAgentEmployeeList([]);
        }
      } else {
        setAgentEmployeeList([]);
      }
    };

    fetchEmployees();
  }, [selectedAgent, form]);

  const handleAgentChange = (value) => {
    const selectedAgentObj = agentlist.find((agent) => agent.value === value);
    if (selectedAgentObj) {
      setSelectedAgent({ id: value, name: selectedAgentObj.label }); // Set both ID and name
    } else {
      setSelectedAgent({ id: null, name: null });
    }
  };

  useEffect(() => {
    if (recordData) {
      const emails =
        recordData.emails?.map((email, index) => ({
          email: email.email,
          key: email._id || index,
        })) || [];

      const formattedDob = recordData.dob
        ? moment(recordData.dob).format("YYYY-MM-DD")
        : null;

      const formattedFollowup = recordData.follow_up_date
        ? moment(recordData.follow_up_date).format("YYYY-MM-DD")
        : null;

      const formattedFreeTrial = recordData.date_of_free_trial
        ? moment(recordData.date_of_free_trial).format("YYYY-MM-DD")
        : null;

      form.setFieldsValue({
        school_name: recordData.school_name,
        surname: recordData.surname,
        firstname: recordData.firstname,
        gender: recordData.gender,
        dob: formattedDob,
        nationality_name: recordData.nationality_name,
        mother_tongue: recordData.mother_tongue,
        correspondence_language: recordData.correspondence_language,
        group_inquiry: recordData.group_inquiry,
        address: recordData.address,
        address_addon: recordData.address_addon,
        postal_code: recordData.postal_code,
        city: recordData.city,
        state: recordData.state,
        country: recordData.country,
        phone: recordData.phone,
        office_phone: recordData.office_phone,
        cellphone: recordData.cellphone,
        fax: recordData.fax,
        email: recordData.email,
        profession: recordData.profession,
        social_security_number: recordData.social_security_number,
        automated_mailing: recordData.automated_mailing,
        company_name: recordData.company_name,
        company_address: recordData.company_address,
        company_pincode: recordData.company_pincode,
        company_city: recordData.company_city,
        company_country: recordData.company_country,
        agent_name: recordData.agent_name,
        agent_employee_name: recordData.agent_employee_name,
        payment_method: recordData.payment_method,
        agent_comment: recordData.agent_comment,
        currency: recordData.currency,
        sales_person_name: recordData.sales_person_name,
        voucher_code: recordData.voucher_code,
        note: recordData.note,
        student_status: recordData.student_status,
        here_about_us: recordData.here_about_us,
        follow_up_date: formattedFollowup,
        date_of_free_trial: formattedFreeTrial,
        required_accommodation: recordData.required_accommodation,
        free_trial: recordData.free_trial,
        course_name: recordData.course_name,
        start_week: recordData.start_week,
        parental_consent: recordData.parental_consent,
        emails,
      });

      document.getElementById("date-picker").value = formattedDob;
      document.getElementById("date-picker2").value = formattedFollowup;
      document.getElementById("date-picker3").value = formattedFreeTrial;

      const selectedAgentObj = agentlist.find(
        (agent) => agent.label === recordData.agent_name
      );
      if (selectedAgentObj) {
        setSelectedAgent({
          id: selectedAgentObj.value,
          name: selectedAgentObj.label,
        });
        form.setFieldsValue({ agent_name: selectedAgentObj.value });
      }
    }
  }, [recordData, agentlist, form]);

  useEffect(() => {
    if (recordData && agentEmployeeList.length > 0) {
      form.setFieldsValue({
        agent_employee_name: recordData.agent_employee_name,
      });
    }
  }, [agentEmployeeList, recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  // const handleFinish = async (values) => {
  //   // Perform any specific logic if needed
  //   console.log("AllData form values:", values);

  //   // Trigger the callback to inform the parent component about the form submission
  //   onFinish(values);
  // };

  // const handleFinish = async (formValues) => {
  //   // Add the selected agent name and emails array to the form values
  //   const emails = formValues.emails || [];
  //   const allValues = {
  //     ...formValues,

  //     emails: emails
  //   };

  //   // Perform any specific logic if needed
  //   console.log("AllData form values:", allValues);

  //   // Trigger the callback to inform the parent component about the form submission
  //   onFinish(allValues);
  // };

  const handleFinish = async (formValues) => {
    const emails = formValues.emails || [];

    // Ensure agent_name is always an array
    const agentNames = Array.isArray(formValues.agent_name)
      ? formValues.agent_name.map((id) => {
          const selectedAgent = agentlist.find((agent) => agent.value === id);
          return selectedAgent ? selectedAgent.label : id;
        })
      : agentlist.find((agent) => agent.value === formValues.agent_name)
          ?.label || formValues.agent_name;

    const salespersonNames = Array.isArray(formValues.sales_person_name)
      ? formValues.sales_person_name.map((id) => {
          const selectedSalesperson = salespersonList.find(
            (person) => person.value === id
          );
          return selectedSalesperson ? selectedSalesperson.label : id;
        })
      : salespersonList.find(
          (person) => person.value === formValues.sales_person_name
        )?.label || formValues.sales_person_name;

    const studentStatuses = Array.isArray(formValues.student_status)
      ? formValues.student_status.map((id) => {
          const selectedStatus = studentStatus.find(
            (status) => status.value === id
          );
          return selectedStatus ? selectedStatus.label : id;
        })
      : studentStatus.find(
          (status) => status.value === formValues.student_status
        )?.label || formValues.student_status;

    const howHeardAboutUs = Array.isArray(formValues.here_about_us)
      ? formValues.here_about_us.map((id) => {
          const selectedInfo = howHereAboutUs.find((info) => info.value === id);
          return selectedInfo ? selectedInfo.label : id;
        })
      : howHereAboutUs.find((info) => info.value === formValues.here_about_us)
          ?.label || formValues.here_about_us;

    // Ensure agent_employee_name is transformed to save the name instead of the ID
    const agentEmployeeNames = Array.isArray(formValues.agent_employee_name)
      ? formValues.agent_employee_name.map((id) => {
          const selectedEmployee = agentEmployeeList.find(
            (employee) => employee._id === id
          );
          return selectedEmployee ? selectedEmployee.firstname : id;
        })
      : agentEmployeeList.find(
          (employee) => employee._id === formValues.agent_employee_name
        )?.firstname || formValues.agent_employee_name;

    const allValues = {
      ...formValues,
      agent_name: agentNames, // Replace agent IDs with their names
      sales_person_name: salespersonNames,
      student_status: studentStatuses,
      here_about_us: howHeardAboutUs,
      agent_employee_name: agentEmployeeNames,
      emails: emails,
    };

    console.log("AllData form values:", allValues);

    onFinish(allValues); // Ensure this function sends the data to the database
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="School"
        name="school_name"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a category">
          <Option value="speakuplondon">speakuplondon</Option>
          {/* Add more options if needed */}
        </Select>
      </Form.Item>
      <Form.Item label="Surname" name="surname">
        <Input />
      </Form.Item>
      <Form.Item label="First Name" name="firstname">
        <Input />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select placeholder="Select a gender">
          <Option value="female">Female</Option>
          <Option value="male">Male</Option>
          <Option value="non-binary">Non-Binary</Option>
        </Select>
      </Form.Item>
      {/* <Form.Item label="Birthdate" name="dob">
        <DatePicker style={{ width: 400 }}  />
      </Form.Item> */}
      {/* <Form.Item label="Birthdate" name="dob">
                <div className="date-picker-container">
                    <input type="date" id="date-picker" className="date-picker" name="dob" />
                </div>
            </Form.Item> */}
      <Form.Item
        label="Birthdate"
        name="dob"
        rules={[{ required: true, message: "Please select BirthDate!" }]}
        valuePropName="value"
        getValueFromEvent={(e) => e.target.value}
      >
        <input type="date" id="date-picker" className="date-picker" />
      </Form.Item>
      <Form.Item
        label="Nationality"
        name="nationality_name"
        rules={[{ required: true, message: "Please select Nationality!" }]}
      >
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
      <Form.Item
        label="Mother Tongue"
        name="mother_tongue"
        rules={[{ required: true, message: "Please select Mother Tongue!" }]}
      >
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
      <Form.Item
        label="Correspondence language"
        name="correspondence_language"
        rules={[
          { required: true, message: "Please select Correspondence language!" },
        ]}
      >
        <Select
          placeholder="Select correspondence language"
          onChange={handleChange}
        >
          <Option value="English">English</Option>
          <Option value="Portuguese">Portuguese</Option>
          <Option value="Spanish">Spanish</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Group Enquiry"
        name="group_inquiry"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <hr />
      <h5>Contact Information</h5>
      <Form.Item label="Address" name="address">
        <Input placeholder="Enter Address" />
      </Form.Item>
      <Form.Item label="Address addon" name="address_addon">
        <Input placeholder="Enter Add on" />
      </Form.Item>
      <Form.Item label="Zip / Portal code" name="postal_code">
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
        <Input type="number" placeholder="Enter fax" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input type="email" placeholder="Enter email" />
      </Form.Item>
      <Form.List name="emails">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                <Form.Item
                  {...restField}
                  label="Email"
                  name={[name, "email"]}
                  fieldKey={[fieldKey, "email"]}
                  style={{ marginRight: 8, flex: 1 }}
                >
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>

                <Button
                  type="link"
                  style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                  onClick={() => remove(name)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Divider />

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <hr />
      <h5>Additional Information</h5>
      <Form.Item label="Profession" name="profession">
        <Input placeholder="Enter Profession" />
      </Form.Item>
      <Form.Item label="Social security number" name="social_security_number">
        <Input placeholder="Enter social security number" />
      </Form.Item>
      <Form.Item
        label="Automated Mailing"
        name="automated_mailing"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <hr />
      <h5>Billing address</h5>
      <Form.Item label="Company" name="company_name">
        <Input placeholder="Enter company" />
      </Form.Item>
      <Form.Item label="Address" name="company_address">
        <Input placeholder="Enter address" />
      </Form.Item>
      <Form.Item label="Zip / Portal code" name="company_pincode">
        <Input type="text" placeholder="Enter zip/postal code" />
      </Form.Item>
      <Form.Item label="City" name="company_city">
        <Input placeholder="Enter city" />
      </Form.Item>
      <Form.Item label="Country" name="company_country">
        <Select
          placeholder="select country"
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
      <h5>Booking Data</h5>
      <Form.Item label="Agent" name="agent_name">
        <Select
          placeholder="SELECT AGENT"
          onChange={handleAgentChange}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {agentlist.map((agent) => (
            <Option key={agent.value} value={agent.value}>
              {agent.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Agency employees" name="agent_employee_name">
        <Select placeholder="SELECT AGENCY EMPLOYEE">
          {agentEmployeeList.map((employee) => (
            <Option key={employee._id} value={employee._id}>
              {employee.firstname}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Payment Method" name="payment_method">
        <Select
          placeholder="SELECT PAYMENT METHOD"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {/* <Option value="Net Prior To Arrival">Net Prior To Arrival</Option>
          <Option value="Gross Prior To Arrival">Gross Prior To Arrival</Option>
          <Option value="Net At School">Net At School</Option> */}
          {paymentMethod.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Comment agent" name="agent_comment">
        <TextArea />
      </Form.Item>
      <Form.Item label="Currency" name="currency">
        <Select placeholder="SELECT CURRENCY" onChange={handleChange}>
          <Option value="GBP (£)">GBP (£)</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Salesperson" name="sales_person_name">
        <Select
          placeholder="SELECT SALESPERSON"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {salespersonList.map((name) => (
            <Option key={name.value} value={name.value}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <hr />
      <h5>Other</h5>
      <Form.Item label="Voucher code" name="voucher_code">
        <Input />
      </Form.Item>
      <Form.Item label="Note" name="note">
        <Input />
      </Form.Item>
      <Form.Item label="Student status" name="student_status">
        <Select
          placeholder="SELECT STUDENT STATUS"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {studentStatus.map((name) => (
            <Option key={name.value} value={name.value}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="How did you hear about us?" name="here_about_us">
        <Select
          placeholder="SELECT"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {howHereAboutUs.map((name) => (
            <Option key={name.value} value={name.value}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <hr />
      <h5>Follow Up</h5>
      {/* <Form.Item label="Date" name="follow_up_date">
        <DatePicker style={{ width: 400 }} />
      </Form.Item> */}

      {/* <Form.Item label="Date" name="follow_up_date">
                <div className="date-picker-container">
                    <input type="date" id="date-picker2" className="date-picker" name="follow_up_date" />
                </div>
            </Form.Item> */}
      <Form.Item
        label="Date"
        name="follow_up_date"
        valuePropName="value"
        getValueFromEvent={(e) => e.target.value}
      >
        <input type="date" id="date-picker2" className="date-picker" />
      </Form.Item>
      <hr />
      <h5>Free Trial</h5>
      <Form.Item
        name="required_accommodation"
        label="Do you require accommodation?"
      >
        {/* <Select mode="multiple" placeholder="Please select">
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
          <Option value="D">D</Option>
        </Select> */}
        <Input placeholder="Enter Do you require accommodation?" />
      </Form.Item>
      <Form.Item label="Free Trial?" name="free_trial" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Free Trial Course" name="course_name">
        {/* <Select placeholder="SELECT COURSE" onChange={handleChange}>
          <Option value="Option 1">Option 1</Option>
          <Option value="Option 2">Option 2</Option>
          <Option value="Option 3">Option 3</Option>
        </Select> */}
        <Input placeholder="Enter Free Trial Course" />
      </Form.Item>
      {/* <Form.Item
        label="Date of free trial"
        name="date_of_free_trial"
        rules={[
          { required: true, message: "Please select Date of free trial!" },
        ]}
      >
        <DatePicker style={{ width: 400 }} />
      </Form.Item> */}

      {/* <Form.Item label="Date of free trial" name="date_of_free_trial">
                <div className="date-picker-container">
                    <input type="date" id="date-picker3" className="date-picker" name="date_of_free_trial" />
                </div>
            </Form.Item> */}
      <Form.Item
        label="Date of free trial"
        name="date_of_free_trial"
        valuePropName="value"
        getValueFromEvent={(e) => e.target.value}
        rules={[
          { required: true, message: "Please select Date of free trial!" },
        ]}
      >
        <input type="date" id="date-picker3" className="date-picker" />
      </Form.Item>

      <Form.Item
        label="Preferred course start weekday - Trial lesson"
        name="start_week"
      >
        {/* <Select placeholder="SELECT TRIAL DAY" onChange={handleChange}>
          <Option value="Option 1">Option 1</Option>
          <Option value="Option 2">Option 2</Option>
          <Option value="Option 3">Option 3</Option>
        </Select> */}
        <Input placeholder="Enter Preferred course start weekday - Trial lesson" />
      </Form.Item>
      <Form.Item
        label={
          <span>
            PARENTAL CONSENT&nbsp;
            <Tooltip title="Explanation for Parental Consent">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="parental_consent"
      >
        {/* <Select placeholder="SELECT PARENTAL CONSENT" onChange={handleChange}>
          <Option value="Option 1">Option 1</Option>
          <Option value="Option 2">Option 2</Option>
          <Option value="Option 3">Option 3</Option>
        </Select> */}
        <Input placeholder="Enter parental consent" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default AllData;
