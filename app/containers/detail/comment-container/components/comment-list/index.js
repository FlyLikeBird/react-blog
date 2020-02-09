import React,{Component} from 'react'
import { Button, Input } from 'antd';
import CommentItem from '../comment-item';
import style from './comment-list.style.css';
export default class CommentList extends Component{

    render(){
        const { uniquekey, comments, parentcommentid, onOpenReply, onAddReply, onLikeAndDislike } = this.props;
    
        return(
            <div className={style.container}>               
                {
                    comments.map((item, index)=>(
                        <CommentItem
                            data={item} 
                            key={index}
                            parentcommentid={parentcommentid} 
                            uniquekey={uniquekey} 
                            onLikeAndDislike={onLikeAndDislike} 
                            onOpenReply={onOpenReply}
                            onAddReply={onAddReply}
                        />
                    ))
                }              
            </div>
        )
    }
}




