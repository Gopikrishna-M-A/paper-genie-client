// import React, { useState } from 'react'
// import SectionHead from '../Common/SectionHead'
// import { CloudDownloadOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
// import { ConfigProvider, Button, Typography, Form, Select } from 'antd';
// import {  } from "react-router-dom";
// const { Text } = Typography;


// export default function GeneratePaper() {

//   const [numSpecWrappers, setNumSpecWrappers] = useState(1);

//   const addSpecWrapper = () => {
//     setNumSpecWrappers(numSpecWrappers + 1);
//   };
//   const removeSpecWrapper = () => {
//     setNumSpecWrappers(numSpecWrappers - 1);
//   };




//       return (
//         <ConfigProvider
//           theme={{
//             token: {
//               // Seed Token
//               colorPrimary: "#242527",
//               // Alias Token
//               colorBgContainer: "#ffffff",
//             },
//           }}
//         >
//           <div className='Generate-paper-page'>
            // <SectionHead
            //   icon={<CloudDownloadOutlined />}
            //   title={"GENERATE"}
            // ></SectionHead>


//             <div className='add-btn-wrapper' >
//             <Text type="secondary">Number of questions : {numSpecWrappers}</Text>
//             <Button onClick={addSpecWrapper} className='Home-card-button' type="primary" icon={ <PlusOutlined /> } size={"large"}>ADD</Button>
//             </div>


//             <Form className='Generate-form'>
        
//             {Array.from({ length: numSpecWrappers }).map((_, index) => (

//                 <div key={index} className='question-generator-spec-wrapper' key={index}>

//                   <Form.Item className='spec-item' name={`mark${index}`} hasFeedback>
//                   <Select placeholder="Mark">
//                       <Select.Option value="1">1</Select.Option>
//                       <Select.Option value="2">2</Select.Option>
//                       <Select.Option value="3">3</Select.Option>
//                       <Select.Option value="4">4</Select.Option>
//                   </Select>
//                   </Form.Item>

//                   <Form.Item className='spec-item' name={`section${index}`} hasFeedback>
//                   <Select placeholder="Sec">
//                       <Select.Option value="1">1</Select.Option>
//                   </Select>
//                   </Form.Item>

//                   <Form.Item className='spec-item' name={`Dlevel${index}`} hasFeedback>
//                   <Select placeholder="D level">
//                       <Select.Option value="Easy">Easy</Select.Option>
//                       <Select.Option value="Moderate">Moderate</Select.Option>
//                       <Select.Option value="Difficult">Difficult</Select.Option>
//                   </Select>
//                   </Form.Item>

//                   <Form.Item className='spec-item' name={`Clevel${index}`} hasFeedback>
//                   <Select placeholder="C level">
//                       <Select.Option value="Knowledge">Knowledge</Select.Option>
//                       <Select.Option value="Comprehension">Comprehension</Select.Option>
//                       <Select.Option value="Application">Application</Select.Option>
//                       <Select.Option value="Analysis">Analysis</Select.Option>
//                       <Select.Option value="Synthesis">Synthesis</Select.Option>
//                   </Select>
//                   </Form.Item>


//                 <Button onClick={removeSpecWrapper} type="text" danger><CloseOutlined /></Button>

              
//                 </div>

        
//             ))}


//           </Form>

            
//           </div>


//         </ConfigProvider>

//       )
// }

import SectionHead from '../Common/SectionHead'
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ConfigProvider, Button, Typography, Form, Select } from 'antd';
import { CloudDownloadOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function GeneratePaper() {
  const [criteria, setCriteria] = useState([{ key: uuidv4(), mark: "", section: "", Dlevel: "", Clevel: "" }]);

  const addCriteria = () => {
    const newCriteriaId = uuidv4();
    setCriteria([...criteria, { key: newCriteriaId, mark: "", section: "", Dlevel: "", Clevel: "" }]);
  };

  const removeCriteria = (criteriaKey) => {
    setCriteria(criteria.filter((criterion) => criterion.key !== criteriaKey));
  };

  const show = ()=>{
    console.log(criteria);
  }

  const handleCriteriaChange = (criteriaKey, field, value) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) =>
        criterion.key === criteriaKey ? { ...criterion, [field]: value } : criterion
      )
    );
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

          <Button className='Generate-btn' type="primary" size='large' onClick={show} htmlType='submit'>GENERATE PAPER</Button>
        </Form>
      </div>
    </ConfigProvider>
  );
}
