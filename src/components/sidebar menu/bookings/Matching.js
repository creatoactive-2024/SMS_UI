import React, { useState } from "react";
import { Form, Select, Input, DatePicker, TimePicker, Checkbox, Button,Divider,AutoComplete, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const Matching = () => {
    const [options, setOptions] = useState([]);




  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleSearch = (value) => {
    const suggestions = [
      "First Name",
      "Last Name",
      "Email Address",
      "Date of Birth",
    ];
    setOptions(
      value ? suggestions.map((suggestion) => ({ value: suggestion })) : []
    );
  };

  const onSelect = (value) => {
    console.log("Selected:", value);
  };




  return (
    <Form onFinish={onFinish} labelCol={{ span: 8, style: { whiteSpace: 'normal' }  }} wrapperCol={{ span: 16 }}>
<Form.Item label="Note" name="additionalServices">
        <Input />
      </Form.Item>
      <Form.Item label="Additional note" name="additionalServices">
        <Input />
      </Form.Item>
      <Form.Item label="Voucher ID" name="additionalServices">
        <Input />
      </Form.Item>
      <Form.Item label="Allergies" name="additionalServices">
        <Input />
      </Form.Item>


<hr />

<h5>These characteristics apply to the student (hard criterias)</h5>

      <Form.Item label="Student smokes" name="student_smokes" >
        <Select placeholder="Select Student smokes">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>           
        </Select>
      </Form.Item>

      <Form.Item label="Vegetarian" name="vegetarian">
        <Select placeholder="Select Vegetarian">
          {/* Add course level options */}
        </Select>
      </Form.Item>

      <Form.Item label="Muslim Diet" name="muslim_diet" >
        <Select placeholder="Select Muslim Diet">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>   
                </Select>
      </Form.Item>


      <hr />
      <h5>Students travelling together</h5>

      <Form.Item name="searchQuery" label="Search">
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={500}
              style={{ width: "100%" }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
            >
              <Input.Search
                placeholder="Enter your search query"
                allowClear
                size="large"
              />
            </AutoComplete>
          </Form.Item>

          <Form.Item label="Is student happy to only smoke outside the property?" name="level" >
        <Select placeholder="Select...">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>  
                </Select>
      </Form.Item>

      <Form.Item label="Any special dietry requirements? (e.g. vegetarian, vegan, halal, kosher, gluten free)" name="level" >
        <Select placeholder="Select...">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>   
               </Select>
      </Form.Item>

      <Form.Item label="Are you pregnant?*" name="level" rules={[{ required: true, message: 'Please select a course level!' }]}>
        <Select placeholder="Select...">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>           </Select>
      </Form.Item>


      <Form.Item label="Promotional Materials" name="level">
        <Select placeholder="Select a course level">
        <Option value="Promotional Materials Consent">Promotional Materials Consent</Option>   

        
                </Select>
      </Form.Item>






      <Alert
          message="Note : In progress..."
          description=" "
          type="info"
          showIcon
        />
        <br/>



      <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={true}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Matching;
