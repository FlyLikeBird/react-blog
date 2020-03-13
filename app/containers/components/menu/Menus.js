import React,{ PureComponent} from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon} from 'antd'
import style from './menu.style.css'

export default class Menus extends PureComponent{
    constructor(props){
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouserOut = this.handleMouserOut.bind(this);
    }
    
    handleMouseOver(e){  
        if (!this.props.menuVisible) {
            this.props.toggle_menu_visible(true);
        }                 
    }

    handleMouserOut(e){
        var target = e.currentTarget;
        var other = e.toElement || e.relatedTarget;
        if (!target.contains(other)){
            this.props.toggle_menu_visible(false);
        }  
    }
    
    componentDidMount(){
        this.props.get_all_tags();
    }

    
    render(){
        var { categories, currentTag, menuVisible } = this.props;
        var iconType = menuVisible ? 'caret-up' : 'caret-down';
        // 判断当前tag所在的行数
        var index = categories.map(item=>item._id).indexOf(currentTag) 
        var line = index == -1 ? 0 : Math.floor(index/10);
        return(
            <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouserOut} className={style.container}>
                <Menu
                    //onClick={this.handleClick}
                    
                    selectedKeys={[currentTag]}
                    mode="horizontal"
                    className={`self-menu ${style.menu}`}
                >
                    {
                        menuVisible
                        ?
                        categories.map((item,index)=>(
                            <Menu.Item key={item._id ? item._id : '首页'}>
                                <Link to={item._id?`/tag/${item._id}`:'/'}><span className={style['item']}><span>{item.tag}</span><span className={style.num}>{item.content > 99 ? '99+' : item.content}</span></span></Link>
                            </Menu.Item>
                        ))
                        :
                        categories.slice(line*10,line*10+10).map((item,index)=>(
                            <Menu.Item key={item._id ? item._id : '首页'}>
                                <Link to={item._id?`/tag/${item._id}`:'/'}><span className={style['item']}><span>{item.tag}</span><span className={style.num}>{item.content > 99 ? '99+' : item.content}</span></span></Link>
                            </Menu.Item>
                        ))
                    }
                    
                </Menu>
                <span className={style.button}><Icon type={iconType} /></span>                
            </div>
        )
    }
}


