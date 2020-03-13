import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Steps, Progress, Icon, Popover  } from 'antd';
import style from './UserItem.style.css'
import { levelArr, formatLevel } from '../../../util';

const { Step } = Steps;

export default class UserItem extends PureComponent {

    render(){
        var { userInfo, user, checkFollow, onFollow, onCheckFollow } = this.props;
        var { userImage, _id, description, level, username } = userInfo;
        var isFollowed = checkFollow[_id];
        // 0 未关注  1 已关注  2 互相关注
        //console.log('info render()');
        var { levelNum, remain } = formatLevel(level);
        const content = (
            <div>
              <p>每次发表评论 <span style={{color:'#1890ff'}}>+5</span> 积分 ,点赞评论 <span style={{color:'#1890ff'}}>+1</span> 积分</p>
              <p>有热门评论 <span style={{color:'#1890ff'}}>+30</span> 积分 </p>
              <Steps progressDot size="small" current={levelNum}>
                 {
                      levelArr.map((level,index)=>{
                          return <Step key={index} title={`${level.text}`} description={`需要等级 ${index}`} />
                  })
                 }
              </Steps>
            </div>
        );

        return (
            <div className={style.container}>
                <div className={style['avatar-container']} style={{backgroundImage:`url(${userImage})`}}></div>
                <div className={style.title}>{username}</div>
                <div>{description}</div>
                <div className={style['level-container']}><span className={style['user-level']}><span className={style.num}>{levelNum}</span><span style={{marginRight:'10px'}}>{ levelArr[levelNum].text } <Popover trigger="hover" content={content}><Icon type="question-circle"/></Popover></span></span></div>
                <div className={style.progress}><Progress size="small" percent={remain} /></div>
                <div className={style['button-group']}>
                    {
                        user === _id 
                        ?
                        null
                        :
                        isFollowed === 2
                        ?
                        <Button  size="small" onClick={()=>onFollow(_id, true)}><Icon type="eye"/>互相关注</Button>
                        :
                        isFollowed === 1
                        ?
                        <Button  size="small" onClick={()=>onFollow(_id, true)}><Icon type="check"/>已关注</Button>
                        :
                        <Button size="small" type="primary" onClick={()=>onFollow(_id, false)}><Icon type="plus"/>关注</Button>
                    }
                    <Button><Link to={`/usercenter/${_id}`} ><Icon type="home"/>主页</Link></Button>
                </div>
            </div>
        )
    }
}



