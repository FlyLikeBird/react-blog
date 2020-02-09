import React,{Component} from 'react'
import {Input,Form, Icon,Button} from 'antd'
const FormItem = Form.Item;
import style from './login.style.css'
import {post} from "../../../../fetch/fetch";
class RegisterForm extends Component{
    constructor(props){
        super(props);
    }

    handleRegister(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var { userName, password, passwordRe } = values;
                var formData = new FormData();
                formData.append('username', userName);
                formData.append('password', password);
                this.props.register(formData);
            }
        });
    };

    checkUserInput(rule,value,callback){
      if (value && value.match(/^\s+$/)){
        callback('请输入合法的数据格式');
      } else {
        callback();       
      }    
    }

    checkPassword(rule, value, callback){
      var { getFieldValue } = this.props.form;
      var password = getFieldValue('password');
      if (value && value.match(/^\s+$/)){
        callback('请输入合法的数据格式');
      } else if ( password != value) {
        callback('两次密码输入不一致')
      } else {
        callback();
      }     
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form onSubmit={this.handleRegister.bind(this)} className={style.formStyle}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}, {validator:this.checkUserInput}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}, {validator:this.checkUserInput}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passwordRe', {
                        rules: [{required: true, message: '请输入密码!'}, {validator:this.checkPassword.bind(this)}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Repeat password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        注册222
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(RegisterForm);
