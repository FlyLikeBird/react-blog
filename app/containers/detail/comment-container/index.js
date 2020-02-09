import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Pagination } from 'antd';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { actions } from '../../../reducers/frontReducer';
import { actions as CommentActions, getComments } from '../../../reducers/comments';
import { actions as IndexActions } from '../../../reducers'
import CommentList from './components/comment-list';
import CommentInput from './components/comment-input';

var { set_msg } = IndexActions ;
var { add_comment, get_article_comments, operate_comment, open_reply, add_reply } = CommentActions;

class CommentContainer extends Component{
    render(){
        const { uniquekey, comments, pageNum, total, get_article_comments, add_comment, open_reply, add_reply, onLikeAndDislike } = this.props;
        return(
            <div>
                <CommentInput onAddComment={add_comment} uniquekey={uniquekey}/>
                <CommentList 
                    comments={comments} 
                    onOpenReply={open_reply}
                    onAddReply={add_reply} 
                    uniquekey={uniquekey} 
                    onLikeAndDislike={onLikeAndDislike}
                />
                <Pagination
                    defaultPageSize={10}
                    current={pageNum}
                    total={total}
                    onChange={page=>get_article_comments(uniquekey, page)}
                />
            </div>
        )
    }

    componentDidMount(){
        var { uniquekey, get_article_comments } = this.props;
        get_article_comments(uniquekey);
    }
}

CommentContainer.propTypes = {
    uniquekey:PropTypes.string.isRequired,
    comments:PropTypes.array.isRequired,
    add_comment:PropTypes.func.isRequired,
    onLikeAndDislike:PropTypes.func.isRequired,
    get_article_comments:PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        comments:getComments(state),
        pageNum:state.front.comments.byId.pageNum,
        total:state.front.comments.byId.total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        add_comment : bindActionCreators(add_comment, dispatch),
        get_article_comments:bindActionCreators(get_article_comments, dispatch),
        onLikeAndDislike:bindActionCreators(operate_comment, dispatch),
        open_reply:bindActionCreators(open_reply, dispatch),
        add_reply:bindActionCreators(add_reply, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentContainer)





