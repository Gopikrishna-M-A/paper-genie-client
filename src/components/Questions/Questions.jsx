import React, { useState } from 'react'
import SectionHead from '../Common/SectionHead'
import { EditOutlined  } from '@ant-design/icons';
import { Select } from 'antd';
import QuestionList from './QuestionList'

 
const { Option } = Select;



export default function Questions() {

  const [selectedSubject, setSelectedSubject] = useState(null);
  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  };

  
  return (
      <div className="Questions-section">
        <SectionHead
          icon={<EditOutlined />}
          title={"QUESTIONS"}
        ></SectionHead>

      <Select 
      style={{marginTop:"10px"}}
      placeholder="Select a subject" 
      onChange={handleSubjectChange}>
        <Option value="English">English</Option>
        <Option value="Maths">Maths</Option>
        <Option value="Science">Science</Option>
      </Select>

      <QuestionList subject={selectedSubject} setSubject={setSelectedSubject} />

    

      </div>
  )
}





