import React,{ PureComponent} from 'react'
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

class DetailContent extends PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        const { data } = this.props;
        const { content,title,author,viewcount,commentcount, newstime } = data;
        console.log('detailContent render()...');
        return(            
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
                <div id='preview' className={style.content} dangerouslySetInnerHTML = {{ __html: content}}>
                    {/*remark().use(reactRenderer).processSync(articleContent).contents*/}
    
                </div>   
            </div>           
        )
    }

    componentDidMount() {
        this.props.get_article_detail(this.props.uniquekey);
    }
}


function mapStateToProps(state){
    return {
        data:state.front.article.articleDetail
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
)(DetailContent);