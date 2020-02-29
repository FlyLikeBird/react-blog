import React,{ PureComponent } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {ArticleItem} from "../article-item/ArticleItem";

export default class ArticleList extends PureComponent{
    
    render(){
        return(
            <div>
                {
                    this.props.data.map((item,index)=>(
                        <ArticleItem key={item._id} data={item}/>
                    ))
                }
            </div>
        )
    }
}