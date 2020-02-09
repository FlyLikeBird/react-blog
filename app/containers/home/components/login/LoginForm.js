import React, {Component} from 'react'
import {Input, Form, Icon, Button} from 'antd'
const FormItem = Form.Item;
import style from './login.style.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    handleLogin(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var { userName, password } = values;
                var formData = new FormData();
                formData.append('username', userName);
                formData.append('password', password);
                this.props.login(formData);
            }
        });
    }

    checkUserInput(rule,value,callback){
      if (value && value.match(/^\s+$/)){
        callback('请输入合法的数据格式');
      } else {
        callback();       
      }    
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleLogin.bind(this)} className={style.formStyle}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'},{validator:this.checkUserInput}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'},{validator:this.checkUserInput}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default LoginForm = Form.create()(LoginForm);