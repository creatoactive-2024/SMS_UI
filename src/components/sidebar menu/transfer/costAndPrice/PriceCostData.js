import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const { Option } = Select;

const PriceCostData = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        price: recordData.price,
        price_return_transfer: recordData.price_return_transfer,
        price_period: recordData.price_period,
      });
      console.log("in coursefrontend", recordData);
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("EnquiryData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
  };
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label={
          <span>
            Price&nbsp;
            <Tooltip title="Price">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="price"
      >
        <Input placeholder="Enter Price" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Price return transfer&nbsp;
            <Tooltip title="Price return transfer">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="price_return_transfer"
      >
        <Input placeholder="Enter Price return transfer" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Price-Period&nbsp;
            <Tooltip title="Price-Period">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="price_period"
        rules={[
          {
            message: "Please select Templates",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="2018 (01.01.2018 - 31.12.2018)">
            2018 (01.01.2018 - 31.12.2018)
          </Option>
          <Option value="20% Discount (02.12.2019 - 30.04.2020)">
            20% Discount (02.12.2019 - 30.04.2020)
          </Option>
          <Option value="2019 (06.01.2020 - 30.07.2020)">
            2019 (06.01.2020 - 30.07.2020)
          </Option>
          <Option value="25% Discount (31.07.2020 - 18.07.2021)">
            25% Discount (31.07.2020 - 18.07.2021)
          </Option>
          <Option value="2020 Prices (31.07.2020 - 01.11.2021)">
            2020 Prices (31.07.2020 - 01.11.2021)
          </Option>
          <Option value="30% Discount (15.02.2021 - 30.09.2021)">
            30% Discount (15.02.2021 - 30.09.2021)
          </Option>
          <Option value="30%DiscountB (01.06.2021 - 18.07.2021)">
            30%DiscountB (01.06.2021 - 18.07.2021)
          </Option>
          <Option value="10% Discount (02.08.2021 - 13.08.2021)">
            10% Discount (02.08.2021 - 13.08.2021)
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

export default PriceCostData;
