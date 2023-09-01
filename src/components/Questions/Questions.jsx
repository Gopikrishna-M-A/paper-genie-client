import React, { useState } from 'react'
import SectionHead from '../Common/SectionHead'
import { EditOutlined  } from '@ant-design/icons';
import { Select, message } from 'antd';
import QuestionList from './QuestionList'

 
const { Option } = Select;



export default function Questions({user}) {

  const [selectedSubject, setSelectedSubject] = useState(null);
  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  };


  if(!user){
    message.warning('Please log in to view questions..');
  }
  
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
              {user && user.subjects && Object.keys(user.subjects).map((subjectName) => (
                <Select.Option key={subjectName} value={subjectName}>
                  {subjectName}
                </Select.Option>
              ))}
      </Select>

      <QuestionList user={user} subject={selectedSubject} setSubject={setSelectedSubject} />

    

      </div>
  )
}





