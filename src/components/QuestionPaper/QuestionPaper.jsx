/* eslint-disable react/no-danger-with-children */
import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import { Typography, Tooltip, Button } from 'antd';
import  "./question-paper.css"
import { DownloadOutlined } from '@ant-design/icons';
import baseURL from '../baseURL'
import EquationEditor from 'equation-editor-react';

import html2pdf from 'html2pdf.js';


const { Text } = Typography;
export default function QuestionPaper({user}) {
  

  // const [equationValue, setEquationValue] = useState(""); // State to store equation value
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const data = location.state;
  const questions = data.matchedQuestions;
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // Add event listener to update the state when the window size changes
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Initial check and add listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup by removing event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchImageData = async () => {
      const imagePromises = questions.map(async (question) => {
        if (question.imageSrc) {
          const response = await fetch(baseURL + "/questions/getImage/" + question.imageSrc);
          const blob = await response.blob();
          const base64data = await blobToBase64(blob);
          return base64data;
        }
        return null;
      });
      const images = await Promise.all(imagePromises);
      setImageData(images);
    };

    fetchImageData();
  }, [questions]);


  // Handle equation value change
  const handleEquationChange = (newValue) => {
    console.log("");
  };


  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleDownloadPDF = async () => {
    const printableHeight = 277;
    const element = document.getElementById('a4');
    const options = {
      margin: 10,
      filename: 'question_paper.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    // Calculate the total height of content, including the first question-box
    const totalContentHeight = calculateTotalContentHeight(element);
  
    // Determine if it can fit within a single page
    if (totalContentHeight <= printableHeight) {
      // Generate a single-page PDF with all content
      const pdf = html2pdf().set(options);
      pdf.from(element).toPdf().output('datauristring').then((dataUri) => {
        pdf.output('dataurlnewwindow');
      });
    } else {
      // Calculate how many pages are needed
      const pageCount = Math.ceil(totalContentHeight / printableHeight);
  
      // Generate multi-page PDFs, ensuring the first question-box is on the first page
      for (let i = 0; i < pageCount; i++) {
        const start = i * printableHeight;
        const end = (i + 1) * printableHeight;
  
        // Create a new element for each page
        const pageContent = document.createElement('div');
        const pageDivs = Array.from(element.children).slice(start, end);
        pageDivs.forEach((div) => {
          pageContent.appendChild(div.cloneNode(true));
        });
  
        // Generate PDF for this page
        const pdf = html2pdf().set(options);
        pdf.from(pageContent).toPdf().output('datauristring').then((dataUri) => {
          if (i === 0) {
            pdf.output('dataurlnewwindow');
          }
        });
      }
    }
  };
  
  const calculateTotalContentHeight = (element) => {
    // Calculate the total height of content, including the first question-box
    let totalHeight = 0;
    Array.from(element.children).forEach((child) => {
      totalHeight += child.clientHeight;
    });
    return totalHeight;
  };

  return (
    <div className="Question-paper-section">
      <div id='a4' className="question-paper">


        <div style={{marginTop:"10px"}}></div>

        <div className="question-box first">
          <div className="left-part">Sno</div>
          <div className="middle-part first">Questions</div>
          <div className="right-part">
            <table className="question-spec">
              <tr>
                <td>Difficulty level</td>
                <td>Cognitive level</td>
                <td>Section</td>
                <td>Mark</td>
              </tr>
            </table>
          </div>
        </div>

        

        {questions.map((question, index) => (


          <div key={index} className="question-box">
            <div className="left-part">
              <div>
                {index + 1}
              </div>
            </div>
            <div className="middle-part">
  
                  { user.subjects[question.subject] === "math" ? <EquationEditor value={question.question} onChange={handleEquationChange} autoCommands="pi theta sqrt sum prod alpha beta gamma rho int" autoOperatorNames="sin cos tan"/>: <div contentEditable className='question'>{question.question}</div>}

                  {question.imageSrc && (
                    <img
                      className='question-img'
                      src={imageData[index]} // Use base64 data from imageData
                      alt=''
                      data-index={index} // Set data-index attribute to match with imageData
                    />
                  )}

                  {question.tableData && (
                    <table contentEditable className='question-table'>
                      <tbody>
                        {JSON.parse(question.tableData).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td>{row.col0}</td>
                            <td>{row.col1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  <div className="options"  >
                  {question.opta && <Text  className='antd-font'>Option A: {question.opta}</Text>}
                  {question.optb && <Text  className='antd-font'>Option B: {question.optb}</Text>}
                  {question.optc && <Text  className='antd-font'>Option C: {question.optc}</Text>}
                  {question.optd && <Text  className='antd-font'>Option D: {question.optd}</Text>}
                  </div>
  
              </div>
  
            
            <div className="right-part">
              <table className="question-spec">
                <tr>
                  <td>
                    {question.Dlevel}
                  </td>
                  <td>
                  {question.Clevel}
                  </td>
                  <td>
                  {question.section}
                  </td>
                  <td>
                  {question.mark}
                  </td>
                </tr>
              </table>
            </div>
  
  
          </div>
        ))}


      </div>

      <Tooltip
      title={isSmallScreen ? "Download not available on small screens" : ""}
      placement="top"
      trigger={isSmallScreen ? "hover" : []}
    >
      <Button
        style={{marginTop:"10px"}}
        onClick={handleDownloadPDF}
        disabled={isSmallScreen}
        block
        icon={<DownloadOutlined />}
      >
        Download
      </Button>
    </Tooltip>
    </div>
  );
}


