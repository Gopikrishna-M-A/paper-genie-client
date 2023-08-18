import SectionHead from '../Common/SectionHead'
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Button, Typography, Form, Select } from 'antd';
import { CloudDownloadOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function GeneratePaper() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState([{ key: uuidv4(), mark: "", section: "", Dlevel: "", Clevel: "" }]);
  const [ subject,setSubject] = useState()
  const addCriteria = () => {
    const newCriteriaId = uuidv4();
    setCriteria([...criteria, { key: newCriteriaId, mark: "", section: "", Dlevel: "", Clevel: "" }]);
  };

  const removeCriteria = (criteriaKey) => {
    setCriteria(criteria.filter((criterion) => criterion.key !== criteriaKey));
  };

  const handleCriteriaChange = (criteriaKey, field, value) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) =>
        criterion.key === criteriaKey ? { ...criterion, [field]: value } : criterion
      )
    );
  };

  const submitForm = async () => {
    setLoading(true);
    const formData = {
      subject: subject, 
      criteria: criteria, 
    };
  
    console.log(formData);
    try {
      const response = await fetch('https://question-paper-api.onrender.com/questions/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Handle the response from the server
        const data = await response.json();
        console.log("response:",data);
        navigate('/question-paper',{ state: data });
        setLoading(false);
        // Do something with the filtered questions data
      } else {
        // Handle error response
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  



  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#242527",
          colorBgContainer: "#ffffff",
        },
      }}
    >


      <div className='Generate-paper-page'>

        <SectionHead
          icon={<CloudDownloadOutlined />}
          title={"GENERATE"}
        ></SectionHead>

        <div className='add-btn-wrapper'>
          <Text type="secondary">Number of Questions: {criteria.length}</Text>
          <Button onClick={addCriteria} className='Home-card-button' type="primary" icon={<PlusOutlined />} size={"large"}>ADD</Button>
        </div>

        <Select 
        placeholder="Subject"
        onChange={(value) => setSubject(value)}>
             <Select.Option value="Maths">Maths</Select.Option>
             <Select.Option value="Science">Science</Select.Option>
             <Select.Option value="English">English</Select.Option>
         </Select>

        

        <Form className='Generate-form'>
          {criteria.map((criterion) => (
            <div className='question-criteria-wrapper' key={criterion.key} id={criterion.key}>
     
                 <Form.Item 
                 className='spec-item' 
                 name={`mark${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select 
                 placeholder="Mark"
                 onChange={(value) => handleCriteriaChange(criterion.key, "mark", value)}>
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                      <Select.Option value="4">4</Select.Option>
                 </Select>
                 </Form.Item>

                 <Form.Item 
                 className='spec-item' 
                 name={`section${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select placeholder="Section"
                 onChange={(value) => handleCriteriaChange(criterion.key, "section", value)}>
                     <Select.Option value="1">1</Select.Option>
                 </Select>
                 </Form.Item>

                 <Form.Item 
                 className='spec-item' 
                 name={`Dlevel${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select placeholder="D level"
                 onChange={(value) => handleCriteriaChange(criterion.key, "Dlevel", value)}>
                     <Select.Option value="Easy">Easy</Select.Option>
                     <Select.Option value="Moderate">Moderate</Select.Option>
                     <Select.Option value="Difficult">Difficult</Select.Option>
                 </Select>
                 </Form.Item>

                 <Form.Item 
                 className='spec-item' 
                 name={`Clevel${criterion.key}`} 
                 hasFeedback
                 rules={[
                  {
                    required: true,
                     message: '',
                  },
                 ]}>
                 <Select placeholder="C level"
                 onChange={(value) => handleCriteriaChange(criterion.key, "Clevel", value)}>
                     <Select.Option value="Knowledge">Knowledge</Select.Option>
                     <Select.Option value="Comprehension">Comprehension</Select.Option>
                     <Select.Option value="Application">Application</Select.Option>
                     <Select.Option value="Analysis">Analysis</Select.Option>
                     <Select.Option value="Synthesis">Synthesis</Select.Option>
                 </Select>
                 </Form.Item>
              
              <Button onClick={() => removeCriteria(criterion.key)} type="text" danger>
                <CloseOutlined />
              </Button>
            </div>
          ))}

          <Button className='Generate-btn' type="primary" size='large' onClick={submitForm} htmlType='submit' loading={loading}>GENERATE PAPER</Button>
        </Form>
      </div>
    </ConfigProvider>
  );
}
