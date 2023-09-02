import React, { useRef } from "react";

import {
  FileAddOutlined,
  CloudDownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Card from "./Card";

export default function Home() {
  const addQuestionsCardRef = useRef(null);
  const generatePaperCardRef = useRef(null);
  const updateBankCardRef = useRef(null);

  return (
    <div className="Home-section">
      <div className="Home-head">
        <div className="Home-head-title">
          Create Custom Question Papers in Minutes
        </div>
        <div className="Home-head-para">
          Unlock the magic of quick and easy question paper generation with
          Effortless Paper Genie
        </div>
      </div>
      <div className="Home-cards-wrapper">
        <Card
          icon={<FileAddOutlined />}
          title={"Effortlessly Add Questions"}
          text={"Add Questions"}
          link={"/Add-question"}
          cardRef={addQuestionsCardRef}
        ></Card>
        <Card
          icon={<CloudDownloadOutlined />}
          title={"Generate Question Papers"}
          text={"Create Paper"}
          link={"/Create-paper"}
          cardRef={generatePaperCardRef}
        ></Card>
        <Card
          icon={<EditOutlined />}
          title={"Update Question bank "}
          text={"View Questions"}
          link={"/view-questions"}
          cardRef={updateBankCardRef}
        ></Card>
      </div>
    </div>
  );
}

// <div className="Home-guide">
// <h2>Getting Started with Effortless Paper Genie</h2>
// <p>Welcome to Effortless Paper Genie! Our platform makes it simple to create custom question papers tailored to your needs. Here's how:</p>
// <ol>
//   <li><strong>Add Questions:</strong> Click on "Add Questions" to easily input new questions into your question bank.</li>
//   <li><strong>Generate Question Papers:</strong> Use the "Create Paper" feature to generate question papers with just a few clicks.</li>
//   <li><strong>Update Question Bank:</strong> Keep your question bank up-to-date by managing and viewing your existing questions.</li>
// </ol>
// <p>Ready to get started? Click below to add your first question:</p>
// <Button type="primary" size="large">
//   <Link to="/Add-question">Add Your First Question</Link>
// </Button>
// </div>
