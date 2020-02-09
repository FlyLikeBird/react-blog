import React from 'react'
import { Icon } from 'antd'
import style from './articleItem.style.css'

export const ArticleItem = (props)=>(
    <div className={`${style.container} `} onClick={()=>{props.history.push(`/detail/${props.data._id}`)}}>
        <div className={style['img-container']} style={{backgroundImage:`url(${props.data.thumbnails[0]})`}}>
        </div>
        <div className={style.bottomContainer}>
            <div className={style.title}>
                {props.data.title}
            </div>
            <div className={style['tag-container']}>
                {
                    props.data.tags.map((item,index)=>(
                        <span key={index}>{item.tag}</span>
                    ))
                }
            </div>
            <div className={style.summary}>
                {props.data.content}
            </div>
            <div className={style['data-container']}>          
                <span>
                    <Icon type="eye"/>
                    时间:
                    {props.data.time}
                </span>
                <span>
                    <Icon type="eye"/>
                    浏览量:
                    {props.data.viewcount}
                </span>
                <span>
                    <Icon type="eye"/>
                    评论数:
                    {props.data.comments}
                </span>
                <span className={style.lastSpan}>
                    阅读全文 <span>》</span>
                </span>
            </div>
        </div>
    </div>
);