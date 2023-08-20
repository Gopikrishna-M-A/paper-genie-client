import React from 'react'
import { useLocation } from 'react-router-dom';
import { Divider, Table, Typography } from 'antd';
import  "./question-paper.css"
import { MathQuillStatic } from '../Common/MathQuillInput'
import baseURL from '../baseURL'

const { Text } = Typography;
export default function QuestionPaper() {
  const location = useLocation();
  const data = location.state;
  const questions = data.matchedQuestions

  return (
    <div className="Question-paper-section">
      <div className="question-paper">

        <div className="first-page">
          <div className="parent">
            <div className="logo">
              <img className="logo-img" src="/logo.png" alt="" />
            </div>
            <div className="university">
              University of Technology and Applied Sciences - Muscat
            </div>
            <div className="department">DEPARTMENT: Information Technology</div>
            <div className="exam">
              <h3 className="h-tag">Final Examination (Theory)</h3>
              <h4 className="h-tag">Semester: 2 A. Y: 2022 / 2023</h4>
            </div>
            <div className="details">
              <div className="detail">Date: 31-05-2023</div>
              <div className="detail">Time: 02.30 PM- 05.00 PM</div>
              <div className="detail">Version B</div>
            </div>
            <div className="student-name">Student Name</div>
            <div className="student-id">Student ID</div>
            <div className="specialization">Specialization</div>
            <div className="invi-sign">Invigilator Signature</div>
            <div className="level">Level</div>
            <div className="course-name">Course Name</div>
            <div className="course-code">Course Code</div>
            <div className="section">Section</div>
            <div className="Advanced-diploma">Advanced Diploma</div>
            <div className="probablity-stas">Probability and Statistics</div>
            <div className="stat3101">STAT3101</div>
            <div className="blank"></div>
            <div className="blank2"></div>
            <div className="blank3"></div>
            <div className="blank4"></div>
            <div className="blank5"></div>
          </div>

          <div className="instructions">
            <h4>INSTRUCTIONS TO STUDENTS:</h4>
            <ol>
              <li>
                Do not open this question paper until told to do so by the
                invigilator.
              </li>
              <li>
                This exam paper consists of (12) pages including the front page
                and the statistical table.
              </li>
              <li>Time allowed is 1 hour 30 minutes.</li>
              <li>
                Cheating / malpractice in any form will be dealt as an offence.{" "}
              </li>
              <li>
                Use only Black or Blue pen for answering the questions. However,
                pencils can be used for diagrams, problem solving and program
                writing purposes only.{" "}
              </li>
              <li>Exchanging or sharing of resources is prohibited.</li>
              <li>
                Use of mobile phones, Bluetooth, smart watches, dictionary, or
                any translator gadget in the examination hall is not allowed.
              </li>
              <li>
                Non programmable calculators are ☑ allowed/   not allowed to be
                used.
              </li>
            </ol>
          </div>

          <div className="marks">
            <div className="section-">Section</div>
            <div className="max-marks">Max. Marks</div>
            <div className="obtained-marks">Obtained Marks</div>
            <div className="A">A</div>
            <div className="B">B</div>
            <div className="ten">10</div>
            <div className="twenty">20</div>
            <div className="blank1"></div>
            <div className="blank2"></div>
            <div className="sub-total-marks">Sub-Total Marks</div>
            <div className="grand-total-marks">Grand Total Marks</div>
            <div className="black3"></div>
            <div className="blank4"></div>
            <div className="thirty">30</div>
            <div className="blank5"></div>
          </div>

          <div className="student-sec">
            <div className="sec">
              <div className="marker">First Marker :</div>
              <div className="sign">Signature :</div>
              <div className="Date">Date :</div>
            </div>
            <div className="sec">
              <div className="marker">Second Marker :</div>
              <div className="sign">Signature :</div>
              <div className="Date">Date :</div>
            </div>
          </div>
        </div>

        <div style={{margin:"100px 0px"}}></div>

        {questions.map((question, index) => (
          <div className='question-paper-math' key={index}>
          <Divider className='line'/>
          <div className='qusetion-head'>
          <Text>Question {index + 1}</Text>
          <Text>{question.mark} marks</Text>
          </div>
          <Divider className='line'/>
          
          <MathQuillStatic latex={question.question} />

          {question.imageSrc && <img className='question-img' src={baseURL+"/questions/getImage/"+question.imageSrc} alt="" />}

          {question.tableData && (
          <Table 
            className='question-table'
            rowKey="id"
            dataSource={JSON.parse(question.tableData)}
            columns={[
              { dataIndex: 'col0', key: 'col0' },
              { dataIndex: 'col1', key: 'col1' },
            ]}
            pagination={false}
            />
          )}

          <div className="options">
          {question.opta && <Text>Option A: {question.opta}</Text>}
          {question.optb && <Text>Option B: {question.optb}</Text>}
          {question.optc && <Text>Option C: {question.optc}</Text>}
          {question.optd && <Text>Option D: {question.optd}</Text>}
          </div>

          <Divider className='line'/>

          {[...Array(question.space)].map((_, spaceIndex) => (
            <Divider key={spaceIndex} dashed />
          ))}

          </div>
        ))}
      </div>
    </div>
  );
}


