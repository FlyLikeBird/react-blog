import React,{ PureComponent} from 'react'
import { Button, Icon, Popover } from 'antd';
import style from './comment-item.style.css';
import InfoList from '../info-list';

export default class CommentButton extends PureComponent{

    render(){
        //console.log('commentbutton render()...');
        var { data, user, parentcommentid, onLikeAndDislike, onOpenReply } = this.props;
        var { _id, likeUsers, isSub, dislikeUsers, replyObj, likeMotion, dislikeMotion } = data;
        
        var isLiked = likeUsers.map(item=>item.user._id).includes(user) ? true : false;
        var isDisliked = dislikeUsers.map(item=>item.user._id).includes(user) ? true : false ;
        return(
            
            <div className={style['button-container']}>
                <span>
                    <span className={style.text} onClick={ ()=>onLikeAndDislike( _id, 'like', isLiked==true ? 'true':'', parentcommentid)}>
                        <Icon className={ likeMotion ? style.motion : ''} type="like"  style={{color:isLiked ? '#108ee9' : 'rgba(0, 0, 0, 0.65)'}}/>
                        <span>{ isLiked ? `取消赞成${likeUsers.length}` : `赞成${likeUsers.length}`}</span>
                    </span>
                    <Popover content={<InfoList data={likeUsers} text="赞"/>}>
                        <Icon type="caret-left" className={style.text}/>
                    </Popover>
                </span>
                <span>
                    <span className={style.text} onClick={ ()=>onLikeAndDislike(_id, 'dislike', isDisliked==true ? 'true':'', parentcommentid)}>
                        <Icon className={ dislikeMotion ? style.motion :''} type="dislike"  style={{color:isDisliked ? '#108ee9' : 'rgba(0, 0, 0, 0.65)'}}/>
                        <span>{ isDisliked ? `取消反对${dislikeUsers.length}` : `反对${dislikeUsers.length}`}</span>
                    </span>
                    <Popover content={<InfoList data={dislikeUsers} text="踩"/>}>
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

