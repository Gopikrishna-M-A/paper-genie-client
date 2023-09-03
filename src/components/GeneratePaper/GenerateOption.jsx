import React from 'react'
import { Button, Typography } from "antd";
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function GenerateOption() {
  return (
    <div className="generate-opt-section">
    <div className="custom-paper-card">
      <Title level={1}>Custom Paper</Title>
      {/* <Text type={'secondary'}>Create a paper with specific criteria:</Text> */}
      <ul className='main'>
        <li><Text>Choose the number of questions.</Text></li>
        <li><Text>Select difficulty levels.</Text></li>
        <li><Text>Select Cognitive levels.</Text></li>
        <li><Text>Specify section</Text></li>
        <li><Text>Specify subject</Text></li>
      </ul>
      <Link to={"/Create-custom-paper"}><Button block type='primary' size='large'>Generate Custom Paper</Button></Link>
    </div>
    
    <div className="random-paper-card">
      <Title level={1}>Random Paper</Title>
      {/* <Text type={'secondary'}>Generate a paper with random questions:</Text> */}
      <ul className='main'>
        <li><Text>Specify the number of easy, medium, and hard questions needed.</Text></li>
        <li><Text>Quickly create papers without specifying individual questions.</Text></li>
        <li><Text>Specify subject</Text></li>
      </ul>
      <Link to={"/Create-random-paper"}><Button block type='primary' size='large'>Generate Random Paper</Button></Link>
      
    </div>
  </div>
  )
}
