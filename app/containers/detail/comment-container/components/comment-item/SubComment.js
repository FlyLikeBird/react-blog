import React,{ PureComponent} from 'react'
import { Button, Icon, Popover, Pagination } from 'antd';
import style from './comment-item.style.css';
import CommentItem from './index';

export default class SubComment extends PureComponent{

    shouldComponentUpdate(nextProps){
        if (this.props.data != nextProps.data || this.props.user != nextProps.user){
            return true;
        } else {
            return false;
        }
    }

    render(){
        //console.log('subCommentList render()...');
        var { data, user, onAddReply, parentcommentid, uniquekey, onOpenReply, onToggleReply, onLikeAndDislike } = this.props;
        var { subComments, pageNum, total } = data;
        return(           
            <div className={style['sub-container']}>               
                {
                    subComments.map((item, index)=>(
                        <CommentItem
                            data={item}
                            key={item._id}
                            user={user}
                            parentcommentid={parentcommentid} 
                            uniquekey={uniquekey} 
                            onLikeAndDislike={onLikeAndDislike} 
                            onOpenReply={onOpenReply}
                            onAddReply={onAddReply}
                        />
                    ))
                }
                { total >= 5 ? <Pagination 
                    size="small"
                    defaultPageSize={5}
                    current={pageNum}
                    total={total}
                    onChange={(pageNum)=>onToggleReply(pageNum, parentcommentid)}
                    /> : null }            
            </div>
                       
        )
    }

}

