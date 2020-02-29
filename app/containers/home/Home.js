import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BaseComponent from '../BaseComponent'
import {
    Redirect
} from 'react-router-dom'
import style from './style.css'
import ArticleList from "./components/article-list/ArticleList";
import {Pagination } from 'antd';
import { Loading } from '../components/loading/Loading'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_article_list } = frontActions;

class Home extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        const { tags, isFetching } = this.props;
        console.log('home render()...');
        return (
            tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
                ?
                <Redirect to='/404'/>
                :
                <div className={style.container}>
                    {
                        isFetching
                        ?
                        <Loading />
                        :
                        <div>
                            <ArticleList
                                data={this.props.articleList}
                            />
                            <div className={style.paginationContainer}>
                                <Pagination
                                    defaultPageSize={10}
                                    onChange={(pageNum) => {
                                        this.props.get_article_list(this.props.match.params.id || '', pageNum);
                                    }}
                                    current={this.props.pageNum}
                                    total={this.props.total}/>
                            </div>
                        </div>
                    }                    
                </div>
        )
    }

    componentDidMount() {
        this.props.get_article_list(this.props.match.params.tag || '');
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

Home.propsTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching:state.front.article.isFetching,
        tags: state.admin.tags,
        pageNum: state.front.article.pageNum,
        total: state.front.article.total,
        articleList: state.front.article.articleList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);