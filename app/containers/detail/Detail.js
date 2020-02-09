import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import { Icon } from 'antd'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
import reactRenderer from 'remark-react'
import style from './style.css'
import { Loading } from '../components/loading/Loading';
import DetailAction from './components/detail-action';
import CommentContainer from './comment-container';
const {get_article_detail} = actions;
class Detail extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        const {articleContent,title,author,viewcount,commentcount, newstime, isFetching} = this.props;
        var uniquekey = this.props.match.params.id;
        return(
            <div>
                <div className={style.container}>
                    <h2>{title}</h2>
                    <div className={style.articleInfo}>
                        <span >
                            <img className={style.authorImg} src={require('./author.png')}/> {author}
                        </span>
                        <span>
                            <Icon type="eye"/>{newstime}
                        </span>
                        <span>
                            <Icon type="eye"/>{commentcount}
                        </span>
                        <span>
                            <Icon type="eye"/>{viewcount}
                        </span>
                    </div>
                    <div id='preview' className={style.content} dangerouslySetInnerHTML = {{ __html: articleContent}}>
                        {/*remark().use(reactRenderer).processSync(articleContent).contents*/}
    
                    </div>
    
                </div>
                <DetailAction />
                <CommentContainer uniquekey={uniquekey}/>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_article_detail(this.props.match.params.id);
    }
}

function mapStateToProps(state) {
    const { isFetching } = state.globalState;
    const { content, title, author, viewcount, commentcount, newstime} = state.front.article.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewcount,
        commentcount,
        newstime,
        isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);