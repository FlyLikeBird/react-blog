import React,{Component} from 'react'
import { Button, Icon, Popover } from 'antd';
import style from './user-list.style.css';
import { parseDate, formatDate } from '../../../../util';

export default class UserList extends Component{
    
    render(){
        var { data, text } = this.props;
        return(
            <div>
                {
                    data && data.length 
                    ?
                    <ul>
                        {
                            data.map((item,index)=>(
                                <li key={index} className={style.container}>
                                    <div className={style['avatar-container']}>
                                        <img src={item.user.userImage}/>
                                        <div className={style.title}>{item.user.username}</div>
                                    </div>
                                    <div className={style.text}>{`${text}于${formatDate(parseDate(item.date))}`}</div>
                                </li>
                            ))
                        }
                    </ul>
                    :
                    `暂时没有人${text}`
                }
            </div>
        )
    }

}

