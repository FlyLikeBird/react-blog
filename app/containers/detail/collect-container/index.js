import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Row, Col, BackTop, Button, Icon, Popover, Modal, Input, Spin, Form, message, Select, Tabs } from 'antd';
import CollectItem from './collect-item';
import CollectForm from './collectForm';
import {actions} from "../../../reducers/collects";

const { fetch_collects, toggle_modal, expand_content, addInto_content, add_collect } = actions;
const TabPane = Tabs.TabPane;
const { Option } = Select;

class CollectContainer extends PureComponent {
    componentDidMount(){

    }
    
    render(){
        var { visible, data, uniquekey, onVisible, onExpand, onAddIntoContent, onAddCollect } = this.props;
        console.log('collect container render()....');
        return(
            <Modal visible={visible} footer={null} destroyOnClose={true} onCancel={()=>onVisible(false)}>                
                <CollectForm onAddCollect={onAddCollect}/>                
                <div>
                {
                    data && data.length
                    ?
                    data.map(item=>(
                        <CollectItem
                            key={item._id}
                            data={item}
                            uniquekey={uniquekey}
                            onExpand={onExpand}
                            onAddIntoContent={onAddIntoContent}
                        />
                    ))
                    :
                    null
                }
                </div>
            </Modal>

        )
    }
}
/*
<div style={{position:'relative',textAlign:'left',minHeight:'200px'}}>
                {
                    isSelf
                    ?
                    <Button type="primary" style={{fontSize:'12px'}} onClick={this.handleCollectShow.bind(this)}>创建收藏夹</Button>
                    :
                    null
                }
                
                
                {
                    isLoading
                    ?
                    <Spin/>
                    :
                    <Tabs defaultActiveKey="0">
                        <TabPane tab={isSelf ? "我创建的":"TA创建的"} key="0">
                            {
                                userCollect.length
                                ?
                                userCollect.map((item,index)=>(
                                    <CollectItem 
                                        data={item}
                                        key={index}
                                        forUser={forUser}
                                        isSelf={isSelf}
                                        history={history}
                                        uniquekey={uniquekey}                                       
                                    />
                                ))
                                :
                                <div>还没有创建收藏夹</div>
                            }
                        </TabPane>
                    
                        {
                            forUser
                            ?
                            <TabPane tab={isSelf?"我收藏的":"TA收藏的"} key="1">
                                {
                                    followedCollect.length
                                    ?
                                    followedCollect.map((item,index)=>(
                                        <CollectItem  
                                            data={item} 
                                            forUser={forUser}
                                            key={index}
                                            history={history}
                                            isSelf={false}
                                            uniquekey={uniquekey}
                                            onModel={onModel}                                             
                                            onVisible={this.handleModalVisible.bind(this)}
                                            onShareVisible={this.handleShareVisible.bind(this)}                                           
                                        />
                                    ))
                                    :
                                    <span>还没有收藏他人的收藏夹</span>
                                }
                                
                            </TabPane>
                            :
                            null
                        }
                    
                    </Tabs>
                }
                            
            </div>
*/
const mapStateToProps = (state)=>{
    console.log(state);
    return {
        visible:state.front.collects.visible,
        data:state.front.collects.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onVisible:bindActionCreators( toggle_modal, dispatch),
        onExpand:bindActionCreators( expand_content, dispatch),
        onAddIntoContent:bindActionCreators( addInto_content, dispatch),
        onAddCollect:bindActionCreators( add_collect, dispatch)
    }
}





export default CollectContainer = connect(mapStateToProps, mapDispatchToProps)(CollectContainer);



