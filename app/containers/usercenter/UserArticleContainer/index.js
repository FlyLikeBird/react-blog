import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Button, Modal } from 'antd'
import ArticleList from '../../home/components/article-list/ArticleList';
import style from './userArticle.style.css'

const { TabPane } = Tabs;

export default class UserArticleContainer extends PureComponent {

    render() {
        var { visible, userArticles, isSelf, toggle_visible } = this.props;
        return (
            <div>
                { isSelf && <Button type="primary" onClick={()=>toggle_visible(true)}>写博客</Button> }
                
                <div>
                    {
                        userArticles && userArticles.length
                        ?
                        <ArticleList data={userArticles} />
                        :
                        '还没有发布过任何博客~开始尝试写一篇吧~'
                    }
                </div>
                <Modal visible={visible} destroyOnClose={true} onCancel={()=>toggle_visible(false)}>
                    hello world
                </Modal>
            </div>
        )
    }
}
