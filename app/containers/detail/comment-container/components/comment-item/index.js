import React,{ PureComponent} from 'react'
import { Button, Icon, Popover } from 'antd';
import style from './comment-item.style.css';
import { parseDate, formatDate } from '../../../../util';
import UserList from '../user-list';
import CommentInput from '../comment-input'
import CommentButton from './CommentButton'
import SubComment from './SubComment'

export default class CommentItem extends PureComponent{
    shouldComponentUpdate(nextProps){
        if (this.props.data != nextProps.data ) {
            return true;
        }
        return false;
    }
    
    componentDidMount(){
        console.log('commentitem mounted...');
    }

    componentWillUnmount(){
        console.log('commentitem will unmounted ...');
    }
    render(){
        console.log('commentitem render()...');
        var { data, onAddReply, parentcommentid, uniquekey, onOpenReply, onToggleReply, onLikeAndDislike } = this.props;
        var { content, fromUser, date, fromSubTextarea, replyTo, images, replies, replyObj, isSub, _id, visible } = data;
        return(
            <div className={style.container}>
                <div className={style['avatar-container']}><img src={fromUser && fromUser.userImage} /></div>
                <div className={style['content-container']}>
                    <div className={style.title}>{fromUser && fromUser.username}</div>
                    <div className={style.text}>{formatDate(parseDate(date))}</div>
                    <div className={style.content}>
                        {
                            fromSubTextarea
                            ?
                            <span style={{color:'#108ee9'}}>{`回复@${replyTo.fromUser.username}: ${content}`}</span>
                            :
                            <span>{content}</span>
                        }
                    </div>
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
                    <CommentButton {...this.props} />
                    { visible && <CommentInput uniquekey={uniquekey} commentid={_id} parentcommentid={parentcommentid ? parentcommentid : ''} forReply={true} onAddReply={onAddReply} />}
                    {
                        !isSub && replies && replies.length
                        ?
                        <SubComment 
                            data={replyObj}
                            parentcommentid={_id} 
                            uniquekey={uniquekey}
                            onLikeAndDislike={onLikeAndDislike} 
                            onOpenReply={onOpenReply}
                            onAddReply={onAddReply}
                            onToggleReply={onToggleReply} 
                        />
                        :
                        null
                    }
                </div>
            </div>
        )
    }

}

