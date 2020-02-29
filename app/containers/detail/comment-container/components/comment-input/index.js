import React ,{ Component, PureComponent } from 'react';
import { Form, Input, Button ,Select, Icon, Upload, Modal } from 'antd';
import style from './comment-input.style.css';
const FormItem = Form.Item;
const { TextArea } = Input;

class CommentInput extends PureComponent{
    constructor(){
        super();
        this.state= {
            fileList:[]
        }
    }

    handleSubmit(e){
        e.preventDefault();
        var { form, uniquekey, forReply, commentid, parentcommentid, onAddComment, onAddReply } = this.props;
        var { validateFields, setFieldsValue } = form;    
        var { fileList } = this.state;        
        validateFields(['comments'],(errs,values)=>{
            if (!errs){                    
                var formData = new FormData();
                formData.append('content', values.comments);
                formData.append('uniquekey', uniquekey);
                if (fileList && fileList.length){
                    fileList.forEach(file=>{
                        formData.append('images', file.originFileObj);
                    })
                }
                if (forReply){
                    formData.append('commentid', commentid);
                    formData.append('parentcommentid', parentcommentid);
                    if ( onAddReply ) onAddReply(formData);
                } else {
                    if ( onAddComment) onAddComment(formData);
                }                
                this.setState({fileList:[]});
                setFieldsValue({comments:''});
            }
        })
         

    }

    checkComments(rule,value,callback){  
      if (value && value.match(/^\s+$/)){
        callback('请输入正常的评论内容！');
      } else {
        callback();       
      }    
    }
    
    handleBeforeUpload(file){
        //console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isJPEG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        if (!(isJPG || isJPEG || isGIF || isPNG)) {
          Modal.error({
            title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
          });
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          Modal.error({
            title: '超过5M限制，不允许上传~',
          });
          return false;
        }
        return true;
    }

    getBase64(file){
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {file.thumbUrl=reader.result;resolve(reader.result)};
        reader.onerror = error => reject(error);
      });
    }
    
    handlePreview(file){    
        if (!file.url && !file.preview) {            
          var promise = getBase64(file.originFileObj);
          promise.then(data=>{
            file.preview = data;
            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
            });
          })
        } else {
            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
            });
        }         
    }   
        
    handleChange({ fileList }){
        this.setState({ fileList });
    } 

    render(){
        var { getFieldDecorator } = this.props.form;
        var { fileList } = this.state;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        
        return(
                   
                <Form className={style.container} onSubmit={this.handleSubmit.bind(this)} >
                    <FormItem className={style.item}>
                        {getFieldDecorator('comments',{
                            rules:[{
                                required:true,
                                message:'评论不能为空！'
                            },{
                                validator:this.checkComments
                            }]
                        })(
                          <TextArea rows={3} placeholder="发表你的看法吧~" />
                        )}
                    </FormItem>
                    <FormItem className={style.item}>
                            {
                                getFieldDecorator('images')(
                                    <Upload
                                       className={style.images}      
                                       listType="picture-card"                                      
                                       fileList={fileList}
                                       beforeUpload={this.handleBeforeUpload.bind(this)}
                                       onPreview={this.handlePreview.bind(this)}
                                       onChange={this.handleChange.bind(this)}
                                      >
                                       {fileList.length >= 6 ? null : uploadButton}
                                      </Upload>
                                )
                            }
                    </FormItem>
                    <Button type="primary" htmlType="submit">评论</Button>
                </Form>                          
        )
        
    }
}


export default CommentInput = Form.create()(CommentInput);
