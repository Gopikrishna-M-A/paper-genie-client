import React from 'react'
import { Link } from "react-router-dom";
import { Button, ConfigProvider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function Card({ icon, title, text, link }) {
  return (
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
      <div className='Home-Card'>
        <div className='Home-card-head'>
        { icon && React.cloneElement(icon, { className: 'Home-card-head-icon' }) }
        <div className="Home-card-title">{ title }</div>
        </div>
        <Link to={link}>
        <Button className='Home-card-button' type="primary" icon={ <ArrowRightOutlined /> } size={"large"}>
           { text }
        </Button>
        </Link>
        
      </div>


    </ConfigProvider>
  );
}
