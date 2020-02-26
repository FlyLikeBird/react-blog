import React,{ PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import { Icon } from 'antd'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
import reactRenderer from 'remark-react'
import style from './style.css'
import { Loading } from '../components/loading/Loading';
import DetailAction from './components/detail-action';
import DetailContent from './DetailContent'
import CommentContainer from './comment-container';

class Detail extends PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        var { match, userAuth } = this.props;
        var uniquekey = match.params.id;
        console.log('detail render()...');
        return(
            <div>
                <DetailContent uniquekey={uniquekey}/>
                <DetailAction />
                { !userAuth && <CommentContainer uniquekey={uniquekey} /> }               
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        userAuth:state.globalState.userAuth
    }
}
export default Detail = connect(mapStateToProps)(Detail);
