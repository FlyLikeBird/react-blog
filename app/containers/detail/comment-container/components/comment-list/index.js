import React,{ PureComponent} from 'react'
import { Button, Input } from 'antd';
import CommentItem from '../comment-item';
import style from './comment-list.style.css';
export default class CommentList extends PureComponent{
    render(){
        const { uniquekey, comments, parentcommentid, onOpenReply, onToggleReply, onAddReply, onLikeAndDislike } = this.props;
        console.log('commentlist render()...');
        return(
            
            <div className={style.container}>               
                {
                    comments.map((item, index)=>(
                        <CommentItem
                            data={item} 
                            key={item._id}
                            parentcommentid={parentcommentid} 
                            uniquekey={uniquekey} 
                            onLikeAndDislike={onLikeAndDislike} 
                            onOpenReply={onOpenReply}
                            onAddReply={onAddReply}
                            onToggleReply={onToggleReply}
                        />
                    ))
                }              
            </div>
        )
    }
}




