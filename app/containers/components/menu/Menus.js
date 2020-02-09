import React,{Component} from 'react'
import {Menu, Icon} from 'antd'
import style from './menu.style.css'

export default class Menus extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:this.props.categories[0].tag,
            open:false,
            iconType:'caret-down'
        }
    }

    handleClick(e){
        var current = e.key;
        if(current === '首页'){
            this.props.getArticleList('');
        }else{
            this.props.getArticleList(current);
        }
        let toPath = current === '首页'?'/':'/tag/'+current;
        this.setState({
            current: current,
        });
        this.props.history.push(toPath);
    }

    handleMouseOver(e){        
        this.setState({open:true, iconType:'caret-up'});  
    }

    handleMouserOut(e){
        var target = e.currentTarget;
        var other = e.toElement || e.relatedTarget;
        if (!target.contains(other)){
            this.setState({open:false, iconType:'caret-down'});
        }  
    }

    render(){
        var { iconType, open } = this.state;
        return(
            <div onMouseOut={this.handleMouserOut.bind(this)} className={style.container}>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className={style['menu']} 
                >
                    {
                        open
                        ?
                        this.props.categories.map((item,index)=>(
                            <Menu.Item key={item._id ? item._id : '首页'}>
                                <span className={style['item']}><span>{item.tag}</span><span className={style.num}>{item.content > 99 ? '99+' : item.content}</span></span>
                            </Menu.Item>
                        ))
                        :
                        this.props.categories.slice(0,10).map((item,index)=>(
                            <Menu.Item key={item._id ? item._id : '首页'}>
                                <span className={style['item']}><span>{item.tag}</span><span className={style.num}>{item.content > 99 ? '99+' : item.content}</span></span>
                            </Menu.Item>
                        ))
                    }
                </Menu>
                <span className={style.button} onMouseOver={this.handleMouseOver.bind(this)}><Icon type={iconType} /></span>
                
            </div>
        )
    }
    /*
    componentDidMount() {
        this.setState({
            current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }
    */

}
