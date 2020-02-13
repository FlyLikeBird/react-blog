import React,{Component} from 'react'
import { Button, Icon, Popover } from 'antd';
import style from './comment-item.style.css';
import { parseDate, formatDate } from '../../../../util';
import UserList from '../user-list';
import CommentInput from '../comment-input'
import CommentList from '../comment-list'

export default class CommentItem extends Component{
    
    render(){
        var { data, onAddReply, parentcommentid, uniquekey, onOpenReply, onLikeAndDislike } = this.props;
        var { content, fromUser, date, likeUsers, dislikeUsers, isLiked, isDisliked, fromSubTextarea, images, isSub, replies , _id, visible } = data;
        parentcommentid = parentcommentid ? parentcommentid : '';
        return(
            <div className={style.container}>
                <div className={style['avatar-container']}><img src={fromUser && fromUser.userImage} /></div>
                <div className={style['content-container']}>
                    <div className={style.title}>{fromUser && fromUser.username}</div>
                    <div className={style.text}>{formatDate(parseDate(date))}</div>
                    <div className={style.content}>{content}</div>
                    <div className={style['img-container']}>
                        {
                            images && images.length 
                            ?
                            images.map((image, index)=>(
                                <span key={index} style={{backgroundImage:`url(${image})`}}></span>
                            ))
                            :
                            null
                        }
                    </div>
                    <div className={style['button-container']}>
                        <span>
                            <span className={style.text} onClick={ ()=>onLikeAndDislike( _id, 'like', isLiked==true ? 'true':'', parentcommentid)}>
                                <Icon type="like" theme={isLiked ? 'filled':'outlined'} style={{color:isLiked ? '#108ee9' : 'rgba(0, 0, 0, 0.65)'}}/>
                                <span>{ isLiked ? `取消赞成${likeUsers.length}` : `赞成${likeUsers.length}`}</span>
                            </span>
                            <Popover content={<UserList data={likeUsers} text="赞"/>}>
                                <Icon type="caret-left" className={style.text}/>
                            </Popover>
                        </span>
                        <span>
                            <span className={style.text} onClick={ ()=>onLikeAndDislike(_id, 'dislike', isDisliked==true ? 'true':'', parentcommentid)}>
                                <Icon type="dislike" theme={isDisliked ? 'filled':'outlined'} style={{color:isDisliked ? '#108ee9' : 'rgba(0, 0, 0, 0.65)'}}/>
                                <span>{ isDisliked ? `取消反对${dislikeUsers.length}` : `反对${dislikeUsers.length}`}</span>
                            </span>
                            <Popover content={<UserList data={dislikeUsers} text="踩"/>}>
                                <Icon type="caret-left" className={style.text}/>
                            </Popover>
                        </span>
                        <span className={style.text} onClick={()=>onOpenReply(_id)}>
                            <Icon type="eye" />
                            <span>回复{replies.length}</span>
                        </span>
                    </div>
                    <div style={{display:visible ? 'block' : 'none'}}>
                        {
                            visible 
                            ?
                            <CommentInput uniquekey={uniquekey} commentid={_id} parentcommentid={parentcommentid} forReply={true} onAddReply={onAddReply} />
                            :
                            null
                        }
                    </div>
                    {
                        !isSub && replies && replies.length
                        ?
                        <div className={style['sub-container']}>
                            <CommentList 
                                parentcommentid={_id}
                                comments={replies} 
                                onOpenReply={onOpenReply}
                                onAddReply={onAddReply} 
                                uniquekey={uniquekey} 
                                onLikeAndDislike={onLikeAndDislike}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }

}

