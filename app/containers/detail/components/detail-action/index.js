import React,{Component} from 'react'
import { Button } from 'antd';
import style from './detail-action.style.css';

export default class DetailAction extends Component{

    render(){
        const { onModalVisible } = this.props;
        
        return(
            <div className={style.container}>
                <Button type="primary" shape="circle" icon="star" onClick={()=>onModalVisible(true)}/>
                <Button type="primary" shape="circle" icon="eye" />
            </div>
        )
    }

}

