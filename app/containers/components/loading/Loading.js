import React from 'react'
import { Spin } from 'antd';
import style from './loading_style.css'
export const Loading=()=>(
        <div className={style.container}>
            <Spin size="large"/>
        </div>
);