import React,{ Component, PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import { Icon } from 'antd'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions as collectActions } from "../../reducers/collects";
import {actions as frontActions } from "../../reducers/frontReducer";
import reactRenderer from 'remark-react'
import style from './detail.style.css'
import { Loading } from '../components/loading/Loading';
import DetailAction from './components/detail-action';
import DetailContent from './DetailContent'
import CommentContainer from './comment-container';
import CollectContainer from './collect-container';

const {get_article_detail, reload_article_detail} = frontActions;
const { open_modal } = collectActions;

class Detail extends PureComponent{
    
    componentWillReceiveProps(nextProps){
        var nextId = nextProps.match.params.id;
        if (this.props.match.params.id != nextId ){
            this.props.onReloadArticle(nextId);
        }
    }

    render(){
        var { match, userAuth, onModalVisible, detailContent, commentsNum, isFetching } = this.props;
        var uniquekey = match.params.id;
        console.log('detail render()...');
        return(
            <div>
                {
                    isFetching
                    ?
                    null
                    :
                    <div>
                        <DetailContent data={detailContent} commentsNum={commentsNum}/>
                        <DetailAction onModalVisible={onModalVisible}/>
                        <CollectContainer uniquekey={uniquekey}/>
                        { !userAuth && <CommentContainer uniquekey={uniquekey} /> }
                    </div>
                }                              
            </div>
        )
    }

    componentDidMount(){
        this.props.onFetchArticle(this.props.match.params.id);
    }
}

const mapStateToProps = (state)=>{
    //console.log(state);
    return {
        commentsNum:state.front.comments.total,
        userAuth:state.globalState.userAuth,
        detailContent:state.front.article.articleDetail.data,
        isFetching:state.front.article.articleDetail.isFetching
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onModalVisible:bindActionCreators(open_modal, dispatch),
        onFetchArticle:bindActionCreators(get_article_detail, dispatch),
        onReloadArticle:bindActionCreators(reload_article_detail, dispatch)
    }
}

export default Detail = connect(mapStateToProps, mapDispatchToProps)(Detail);
