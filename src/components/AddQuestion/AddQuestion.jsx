import React, { useState } from "react";
import SectionHead from "../Common/SectionHead";
import "../Common/math.css";
import axios from "axios";
import EquationEditor from 'equation-editor-react';
import baseURL from '../baseURL'
import {
  message,
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { FileAddOutlined, PlusOutlined } from "@ant-design/icons";
import DynamicTableGenerator from "./DynamicTableGenerator";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function AddQuestion() {
  const [equation, setEquation] = useState("");
  const [tableData, setTableData] = useState(null); // Add actual value
  const [rowCount, setRowCount] = useState(null); // Add actual value
  const [colCount, setColCount] = useState(null); // Add actual value
  const [subject, setSubject] = useState(null); // Add actual value
  const [loading, setLoading] = useState(false); // Add actual value

      const handleSuccess = () => {
        message.success('Question added successfully!');
      };
      
      const handleError = () => {
        message.error('Failed to add question. Please try again.');
      };

    const handleSubmit = async (values) => {
      setLoading(true)
      const formData = new FormData();
  
      formData.append("question", equation);
      formData.append("Dlevel", values.Dlevel);
      formData.append("Clevel", values.Clevel);
      formData.append("section", values.section);
      formData.append("mark", values.mark);
      formData.append("subject", values.subject);
      formData.append("tableData", JSON.stringify(tableData)); // Convert to string
      formData.append("row", rowCount);
      formData.append("col", colCount);
      formData.append("opta", values.opta);
      formData.append("optb", values.optb);
      formData.append("optc", values.optc);
      formData.append("optd", values.optd);
      formData.append("space", values.space);
      if(values.image){
        formData.append("image", values.image[0].originFileObj);
      }

      // for (const entry of formData.entries()) {
      //   const [fieldName, fieldValue] = entry;
      //   console.log(`${fieldName}: ${fieldValue}`);
      // }


      try {
        const response = await axios.post(`${baseURL}/questions`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        });
        console.log("Response data:", response.data);
        handleSuccess();
        setLoading(false)
      } catch (error) {
        console.error("Error:", error);
        handleError();
        setLoading(false)
      }
     
    };


  return (
    <div className="Add-question-section">
      <div className="add-section-wrapper">
        <SectionHead
          icon={<FileAddOutlined />}
          title={"ADD QUESTION"}
        ></SectionHead>

        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#242527",
              // Alias Token
              colorBgContainer: "#ffffff",
            },
          }}
        >

          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit} 
          >

            <Form.Item 
              style={{ marginTop: "10px" }} 
              name="subject"
              rules={[
               {
                 required: true,
                  message: 'Please select a subject!',
               },
              ]}
              hasFeedback>
              <Select
                placeholder="Subject"
                onChange={(value) => setSubject(value)}
              >
                <Select.Option value="Maths">Maths</Select.Option>
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="Science">Science</Select.Option>
              </Select>
            </Form.Item>

            {subject === "Maths" ? (
              <Form.Item >
                <div className="equation-editor-container">
                  <EquationEditor
                    value={equation}
                    onChange={setEquation}
                    autoCommands="pi theta sqrt sum prod alpha beta gamma rho int"
                    autoOperatorNames="sin cos tan"
                  />
                  {!equation && (
                    <div className="equation-editor-placeholder">Type your equation here...</div>
                  )}
                </div>
              </Form.Item>
            ) : (
              <Form.Item 
              name="question"
              rules={[
                {
                  required: true,
                   message: 'Please input a question!',
                },
               ]}
               >
                <TextArea rows={4} 
                placeholder="type new question here ..."
                onChange={(e) => setEquation(e.target.value)}
                />
              </Form.Item>
            )}

            <Form.Item 
            name="Dlevel"
            rules={[
              {
                required: true,
                 message: 'Please select a Difficulty level!',
              },
             ]}
             hasFeedback>
              <Select placeholder="Difficulty level" >
                <Select.Option value="Easy">Easy</Select.Option>
                <Select.Option value="Moderate">Moderate</Select.Option>
                <Select.Option value="Difficult">Difficult</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
            name="Clevel"
            rules={[
              {
                required: true,
                 message: 'Please select a Cognitive level!',
              },
             ]}
             hasFeedback>
              <Select
                placeholder="Cognitive level"
              >
                <Select.Option value="Knowledge">Knowledge</Select.Option>
                <Select.Option value="Comprehension">Comprehension</Select.Option>
                <Select.Option value="Application">Application</Select.Option>
                <Select.Option value="Analysis">Analysis</Select.Option>
                <Select.Option value="Synthesis">Synthesis</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
            name="mark"
            rules={[
              {
                required: true,
                 message: 'Please add Marks!',
              },
             ]}
             hasFeedback>
              <Select
                placeholder="Marks"
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
            name="section"
            rules={[
              {
                required: true,
                message: 'Please add Section!',
              },
             ]}
             hasFeedback>
              <Input placeholder="Section" />
            </Form.Item>

            <p>Upload Image</p>

            <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload 
              action={`${baseURL}/questions`}
              listType="picture-card" 
              maxCount={1}
              // beforeUpload={(file) => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8,}} >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item name="opta" hasFeedback>
              <Input placeholder="option A" />
            </Form.Item>

            <Form.Item name="optb" hasFeedback>
              <Input placeholder="option B" />
            </Form.Item>

            <Form.Item name="optc" hasFeedback>
              <Input placeholder="option C" />
            </Form.Item>

            <Form.Item name="optd" hasFeedback>
              <Input placeholder="option D"  />
            </Form.Item>

            <Form.Item 
            name="space"
            rules={[
              {
                required: true,
                message: 'Please add Section!',
              },
             ]}
             hasFeedback>
              <InputNumber placeholder="Spaces"  />
            </Form.Item>

            <p>Insert Table</p>

            <Form.Item >
              <DynamicTableGenerator 
              tableData={tableData}
              setTableData={setTableData}
              rowCount={rowCount}
              setRowCount={setRowCount}
              colCount={colCount}
              setColCount={setColCount}
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={loading}>Submit</Button>
            </Form.Item>

          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
