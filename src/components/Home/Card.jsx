import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function Card({ icon, title, text, link, cardRef }) {
  return (

      <div ref={cardRef}  className='Home-Card'>
        <div className='Home-card-head'>
        { icon && React.cloneElement(icon, { className: 'Home-card-head-icon' }) }
        <div className="Home-card-title">{ title }</div>
        </div>
        <Link className='btn-link-home' to={link}>
        <Button className='Home-card-button' type="primary" icon={ <ArrowRightOutlined /> } size={"large"}>
           { text }
        </Button>
        </Link>
        
      </div>



  );
}
