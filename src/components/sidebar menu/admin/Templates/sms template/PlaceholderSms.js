import React from "react";
import {  Input,  Space } from "antd";

import { AiOutlineSearch } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";


const PlaceholderSms = ({
  onFinish,
  recordData,
  updateCategoryOptions,
  CancelBothModel,
}) => {
 

  return (
   <>
   <Space>
      {/* <Button icon={<AiOutlineQuestionCircle />}>Support</Button> */}
      <Input
        placeholder="Search"
        prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
      />
      
    </Space>
    <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />

   </>
  );
};

export default PlaceholderSms;
 
