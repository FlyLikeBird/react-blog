import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
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

class Home extends PureComponent {
    render() {
        const { tags, articleList } = this.props;
        const { pageNum, total, data, isFetching } = articleList;
        console.log('home render()...');
        return (
            //  当首页或者存在的标签页时才渲染，否则404
            this.props.location.pathname === '/' || ( this.props.match.params.id && tags.map(item=>item._id).indexOf(this.props.match.params.id) ) 
                ?
                <div className={style.container}>
                    {
                        isFetching
                        ?
                        <Loading />
                        :
                        <div>
                            <ArticleList
                                data={data}
                            />
                            <div className={style.paginationContainer}>
                                <Pagination
                                    defaultPageSize={10}
                                    onChange={(pageNum) => {
                                        this.props.get_article_list(this.props.match.params.id || '', pageNum);
                                    }}
                                    current={pageNum}
                                    total={total}/>
                            </div>
                        </div>
                    }                    
                </div>
                :
                <Redirect to='/404'/>          
        )
    }

    componentWillReceiveProps(nextProps){
        if (this.props.match.params.id != nextProps.match.params.id){
            this.props.get_article_list(nextProps.match.params.id || '');
        }
    }

    componentDidMount() {
        this.props.get_article_list(this.props.match.params.id || '');
    }
}

Home.propTypes = {
    tags:PropTypes.array.isRequired,
    articleList: PropTypes.object.isRequired,
    get_article_list:PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        tags:state.admin.tags,
        articleList: state.front.article.articleList
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