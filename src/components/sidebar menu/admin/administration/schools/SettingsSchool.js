import React, { useEffect } from "react";
import { Form, Select, Input, Space, Alert, List } from "antd";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const SettingsSchool = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        correspondence_language: recordData.correspondence_language,
        standard_languages: recordData.standard_languages,

        passport_expiry_date: recordData.passport_expiry_date,
        visa_expiry_date: recordData.visa_expiry_date,

        number_format: recordData.number_format,
        date_format: recordData.date_format,
        date_format_short: recordData.date_format_short,
        export_seperator: recordData.export_seperator,
        export_char_coding: recordData.export_char_coding,
        net_doc_non_agency_address: recordData.net_doc_non_agency_address,
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

  const data1 = [
    "Day of the month starting with zero:%d",
    "Month displayed as a number:%m",
    "Year as a 2-digit number:%y",
    "Year as a 4-digit number:%Y",
    "Ordinal sign of the day: %O",
    "Month (abbr.): %b",
    "Month (in full): %B",
  ];

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <h5>Correspondence language</h5>
      <Form.Item
        label="Correspondence languages"
        name="correspondence_language"
        rules={[
          { required: true, message: "Please select Correspondence language!" },
        ]}
      >
        <Select placeholder="Select Correspondence language">
          <Option value="English">English</Option>
          <Option value="Spanish">Spanish</Option>
          <Option value="Portuguese">Portuguese</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Standard languages"
        name="standard_languages"
        rules={[
          { required: true, message: "Please select Standard language!" },
        ]}
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="English">English</Option>
          <Option value="Spanish">Spanish</Option>
          <Option value="Portuguese">Portuguese</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Visa/Passport verification</h5>

      <Form.Item
        label="Passport-expiration esrning (days before expiration date)"
        name="passport_expiry_date"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Visa-expiry warning (days before expiry date)"
        name="visa_expiry_date"
      >
        <Input />
      </Form.Item>

      <hr />
      <h5>Format</h5>
      <Form.Item label="Number format" name="number_format">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="1.000,00">1.000,00</Option>
        </Select>
      </Form.Item>

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message="Available placeholders for customising document name"
          description={
            <List
              size="small"
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <span
                    style={{
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  {item}
                </List.Item>
              )}
            />
          }
          type="info"
          showIcon
        />
      </Space>
      <br />
      <br />

      <Form.Item
        label={
          <span>
            Date format&nbsp;
            <Tooltip title="Date format">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="date_format"
        rules={[
          { required: true, message: "Please select Standard language!" },
        ]}
      >
        <Input placeholder="Enter Date format" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Date format(short)&nbsp;
            <Tooltip title="Date format(short)">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="date_format_short"
        rules={[
          { required: true, message: "Please select Standard language!" },
        ]}
      >
        <Input placeholder="Enter Date format" />
      </Form.Item>

      <Form.Item
        label="Export-seperator character (e.g. ',' '_' '.' ';' "
        name="export_seperator"
      >
        <Input placeholder="Enter Date format" />
      </Form.Item>

      <Form.Item label="Export-character encoding" name="export_char_coding">
        <Input placeholder="Enter Export-character encoding" />
      </Form.Item>

      <hr />
      <h5>E-mail warning</h5>

      <Form.Item
        label={
          <span>
            Net documents to non agency address&nbsp;
            <Tooltip title="Net documents to non agency address">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="net_doc_non_agency_address"
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Always display a warning">
            Always display a warning
          </Option>
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

export default SettingsSchool;
