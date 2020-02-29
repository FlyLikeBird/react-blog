import React, { PureComponent } from 'react';
import { Row, Col, BackTop, Button, Icon, Popover, Modal, Input, Form, message, Select, Tabs } from 'antd';
import style from './collect-item/collect_item.style.css'

const { Option } = Select;

class CollectForm extends PureComponent {
    constructor(){
        super();
        this.state = {
            privacy:0
        }
    }

    handleSelect(value){
        this.setState({privacy:value})
    }

    createCollect(e){
        e.preventDefault();
        var { form, onAddCollect } = this.props;
        var { validateFields, setFieldsValue } = form;
        var { privacy } = this.state;
        validateFields(['collect'],(errs,values)=>{
            if(!errs){
                var { collect } = values; 
                if (onAddCollect) onAddCollect(collect, privacy);
                setFieldsValue({'collect':''});         
            }  
        })      
    }

    handleCheckCollectName(rule,value,callback){
        var regSpace = /^\s+$/;
        if ( value.match(regSpace)) {
            callback('收藏夹名称不能为空!')
        } else {
            callback();
        }
    }

    render(){
        var { form, onShowForm } = this.props;
        var { getFieldDecorator } = form;
        console.log('collect form render()...');
        return(
            <Form layout="inline" className={style.form} onSubmit={this.createCollect.bind(this)}>
                <Form.Item>
                    {
                        getFieldDecorator('collect',{
                            rules:[
                                {
                                    required:true,
                                    message:'收藏夹名称不能为空!'
                                },
                                {
                                    validator:this.handleCheckCollectName.bind(this)
                                }
                            ]
                        })(
                            <Input size="small" placeholder="请输入收藏夹名称"/>
                        )                           
                    }
                </Form.Item>
                <Form.Item>
                    <Select size="small" defaultValue={0} onSelect={this.handleSelect.bind(this)} dropdownMatchSelectWidth={false}>
                        <Option value={0}>公开的</Option>
                        <Option value={1}>仅对关注的人可见</Option>
                        <Option value={2}>私密的仅自己可见</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="small" style={{marginRight:'4px'}}>确定</Button>
                </Form.Item>
                
            </Form>
               
        )
    }
}

export default CollectForm = Form.create()(CollectForm);

