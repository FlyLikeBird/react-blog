import React,{ PureComponent} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import { Icon } from 'antd'
import remark from 'remark'
import {connect} from 'react-redux'
import reactRenderer from 'remark-react'
import style from './detail.style.css'

export default class DetailContent extends PureComponent{

    render(){
        const { data, commentsNum } = this.props;
        const { content, title, auth, viewcount, newstime } = data;
        console.log('detailContent render()...');
        return(            
            <div className={style.container}>
                <h2>{title}</h2>
                <div className={style.articleInfo}>
                    <span>
                        <span className={style['img-container']}><img src={auth.userImage}/></span>
                        <span>{auth.username}</span>
                    </span>
                    <span>
                        <Icon type="calendar" />{newstime}
                    </span>
                    <span>
                        <Icon type="edit"/>{commentsNum}
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

}
