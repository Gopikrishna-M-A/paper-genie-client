import React from 'react'
import { Button } from "antd";
import { Link } from 'react-router-dom';

export default function GenerateOption() {
  return (
    <div className="generate-opt-section">
    <div className="custom-paper-card">
      <h2>Custom Paper Generation</h2>
      <p>Create a paper with specific criteria:</p>
      <ul>
        <li>Choose the number of questions.</li>
        <li>Select difficulty levels (easy, medium, difficult).</li>
        <li>Select Cognitive levels (Knowledge, Comprehension, Application).</li>
        <li>Specify section</li>
        <li>Specify subject</li>
      </ul>
      <Link to={"/Create-custom-paper"}><Button type='primary' size='large'>Generate Custom Paper</Button></Link>
    </div>
    
    <div className="random-paper-card">
      <h2>Random Paper Generation</h2>
      <p>Generate a paper with random questions:</p>
      <ul>
        <li>Specify the number of easy, medium, and hard questions needed.</li>
        <li>Quickly create papers without specifying individual questions.</li>
        <li>Specify subject</li>
      </ul>
      <Link to={"/Create-random-paper"}><Button type='primary' size='large'>Generate Random Paper</Button></Link>
      
    </div>
  </div>
  )
}
