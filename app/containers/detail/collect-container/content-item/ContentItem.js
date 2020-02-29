import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, BackTop, Button, Icon, Tooltip, Popover, Modal, Input, Form, Select, Card, Collapse } from 'antd';
import style from './content_item.style.css'

export default class ContentItem extends React.Component {
    render(){
        var { data } = this.props;
        var { _id, thumbnails, tags, content, title } = data;
        return(
            <Link to={`/detail/${_id}`}>
                <div className={style.container}>
                    <div className={style['img-container']} style={{backgroundImage:`url(${thumbnails[0]})`}}></div>
                    <div className={style['content-container']}>
                        <div className={style.title}>{title}</div>
                        <div className={style.tags}>
                            {
                                tags && tags.length
                                ?
                                tags.map(item=>(
                                    <span key={item._id}>{item.tag}</span>
                                ))
                                :
                                null
                            }
                        </div>
                        <div className={style.content} dangerouslySetInnerHTML = {{ __html: content}}></div>
                    </div>
                </div>
            </Link>
        )
    }
}



