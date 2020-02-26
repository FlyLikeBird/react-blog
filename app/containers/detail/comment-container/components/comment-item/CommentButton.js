import React,{ PureComponent} from 'react'
import { Button, Icon, Popover } from 'antd';
import style from './comment-item.style.css';
import { parseDate, formatDate } from '../../../../util';
import UserList from '../user-list';
import CommentInput from '../comment-input'
import CommentList from '../comment-list'

export default class CommentButton extends PureComponent{

    render(){
        console.log('commentbutton render()...');
        var { data, parentcommentid, onLikeAndDislike, onOpenReply } = this.props;
        var { _id, likeUsers, isSub, dislikeUsers, isLiked, isDisliked, replyObj } = data;
        
        return(
            
            <div className={style['button-container']}>
                <span>
                    <span className={style.text} onClick={ ()=>onLikeAndDislike( _id, 'like', isLiked==true ? 'true':'', parentcommentid)}>
                        <Icon type="like"  style={{color:isLiked ? '#108ee9' : 'rgba(0, 0, 0, 0.65)'}}/>
                        <span>{ isLiked ? `取消赞成${likeUsers.length}` : `赞成${likeUsers.length}`}</span>
                    </span>
                    <Popover content={<UserList data={likeUsers} text="赞"/>}>
                        <Icon type="caret-left" className={style.text}/>
                    </Popover>
                </span>
                <span>
                    <span className={style.text} onClick={ ()=>onLikeAndDislike(_id, 'dislike', isDisliked==true ? 'true':'', parentcommentid)}>
                        <Icon type="dislike"  style={{color:isDisliked ? '#108ee9' : 'rgba(0, 0, 0, 0.65)'}}/>
                        <span>{ isDisliked ? `取消反对${dislikeUsers.length}` : `反对${dislikeUsers.length}`}</span>
                    </span>
                    <Popover content={<UserList data={dislikeUsers} text="踩"/>}>
                        <Icon type="caret-left" className={style.text}/>
                    </Popover>
                </span>
                <span className={style.text} onClick={()=>onOpenReply(_id, parentcommentid)}>
                    <Icon type="eye" />
                    <span>回复{ isSub ? '' : replyObj && replyObj.total ? replyObj.total : 0}</span>
                </span>
            </div>
                  
        
        )
    }

}

