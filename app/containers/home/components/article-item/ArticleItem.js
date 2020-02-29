import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import style from './articleItem.style.css'

export const ArticleItem = (props)=>{
    var { data } = props;
    var { _id, thumbnails, title, tags, content, time, viewcount, comments } = data;
    return (<Link to={`/detail/${_id}`}>
        <div className={style.container}>
            <div className={style['img-container']} style={{backgroundImage:`url(${thumbnails[0]})`}}>
            </div>
            <div className={style.bottomContainer}>
                <div className={style.title}>
                    {title}
                </div>
                <div className={style['tag-container']}>
                    {
                        tags.map((item,index)=>(
                            <span key={index}>{item.tag}</span>
                        ))
                    }
                </div>
                <div className={style.summary}>
                    {content}
                </div>
                <div className={style['data-container']}>          
                    <span>
                        <Icon type="eye"/>
                        时间:
                        {time}
                    </span>
                    <span>
                        <Icon type="eye"/>
                        浏览量:
                        {viewcount}
                    </span>
                    <span>
                        <Icon type="eye"/>
                        评论数:
                        {comments}
                    </span>
                    <span className={style.lastSpan}>
                        阅读全文 <span>》</span>
                    </span>
                </div>
            </div>
        </div>
    </Link>
);
}