import React from 'react'
import {  } from 'antd';
import { FileAddOutlined, CloudDownloadOutlined, EditOutlined  } from '@ant-design/icons';
import Card from './Card';

export default function Home() {



  return (
        <div className='Home-section'>
            <div className="Home-head">
                <div className="Home-head-title">Create Custom Question Papers in Minutes</div>
                <div className="Home-head-para">Unlock the magic of quick and easy question paper generation with Effortless Paper Genie</div>
            </div>
            <div className="Home-cards-wrapper">
            <Card icon={<FileAddOutlined/>} title={"Effortlessly Add Questions"} text={"Add Questions"} link={"/Add-question"}  ></Card>
            <Card icon={<CloudDownloadOutlined />} title={"Generate Question Papers"} text={"Create Paper"} link={"/Create-paper"} ></Card>
            <Card icon={<EditOutlined />} title={"Update Question bank "} text={"View Questions"} link={"/view-questions"} ></Card>
            </div>
        </div>
  );
}
