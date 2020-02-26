import React,{ PureComponent} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Menu, Icon} from 'antd'
import style from './menu.style.css'
import { actions } from '../../../reducers/adminManagerTags';

const { get_all_tags } = actions;

class Menus extends PureComponent{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouserOut = this.handleMouserOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.state = {
            current:'首页',
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

    componentDidMount(){
        this.props.get_all_tags();
    }

    render(){
        var { categories } = this.props;
        var { iconType, open } = this.state;
        return(
            <div onMouseOut={this.handleMouserOut} className={style.container}>
                <Menu
                    onClick={this.handleClick}
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
                <span className={style.button} onMouseOver={this.handleMouseOver}><Icon type={iconType} /></span>                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        categories:state.admin.tags
    }
}

function mapDispatchToProps(dispatch){
    return {
        get_all_tags:bindActionCreators(get_all_tags,dispatch)

    }
}



export default Menus = connect(mapStateToProps,mapDispatchToProps)(Menus);
