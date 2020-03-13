import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.css'
import {Button} from 'antd'

export const Logined = (props) => (
    <div className={style.container}>
        <div className={style['img-container']}><img src={props.userInfo.userImage}/></div>
        <div>用户：{props.userInfo.username}</div>  
        <div>
        <Button type="primary" size="small"><Link to={`/usercenter/${props.userInfo.userId}`}>个人中心</Link></Button>
        <Button size="small" onClick={()=>props.loginOut()}>退出登录</Button>
        </div>       
    </div>
);