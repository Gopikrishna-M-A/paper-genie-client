import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import MathQuillInput from '../Common/MathQuillInput'


const QuestionList = ({ subject }) => {
  const [questions, setQuestions] = useState([]);



  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:4000/questions/subject/${subject}`);
            if (response.ok) {
              const data = await response.json();
              setQuestions(data);
              console.log(data);
            } else {
              console.error('Failed to fetch questions:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
    };

    fetchQuestions();
  }, [subject]);




  return (
    <div className='Questions-wrapper'>
    {questions.map((q,index) => (
        <Collapse
        key={ q._id } 
        items={[
            {
            key: q._id,
            label:   <MathQuillInput latex={q.question}/>,
            children: (
                <div>
                  <p>Clevel: {q.Clevel}</p>
                  <p>Dlevel: {q.Dlevel}</p>
                  <p>mark: {q.mark}</p>
                  <p>section: {q.section}</p>
                  <p>space: {q.space}</p>
                </div>
              )
            },
        ]}
        />
    ))}
    </div>

  );
};

export default QuestionList;
