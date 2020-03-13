import React, { PureComponent } from 'react';
import { Row, Col, BackTop, Button, Icon, Tooltip, Popover, Modal, Input, Form, Select, Card, Collapse } from 'antd';
import { parseDate, formatDate, translateType, formatContent } from '../../../util';
import style from './collect_item.style.css'
import InfoList from '../../comment-container/components/info-list'
import ContentItem from '../content-item/ContentItem';

const { Option } = Select;
const { Meta } = Card;
const { Panel } = Collapse;

var privacyObj = {
    '0':'公开的',
    '1':'仅对关注的人可见',
    '2':'私密的仅自己可见'
}


export default class CollectItem extends PureComponent {
    shouldComponentUpdate(nextProps){
        if (this.props.data != nextProps.data) {
            return true;
        }
        return false;
    }
    
    render(){
        console.log('collectItem render()...');
        var { data, forUser, uniquekey, onExpand, onAddIntoContent } = this.props;
        var { _id, createtime, defaultCollect, followedBy, privacy, tag, content, showContent, hasMotion  } = data;

        var collected = content.map(item=>item._id).includes(uniquekey) ? true : false;
        var caret = showContent ? 'caret-down' : 'caret-right';
        console.log(hasMotion);
        return(
            <div className={style.container}>
                <div className={style.header} onClick={()=>onExpand(_id)}>
                    <Icon type={caret} />
                    <div className={style.card}>
                        <div className={style['icon-container']}>                            
                            <span style={{fontSize:'30px',color:'#1890ff'}}><Icon type="folder-add"/></span>                           
                            <span className={ hasMotion ? `${style.motion} ${style[hasMotion]}` : style.motion}><Icon type="file-text" /></span>                                                  
                        </div>
                        <div className={style.content}>
                            <span className={style.title}>{tag}</span>
                            <div>
                                <span className={style.text}>{`创建于${formatDate(parseDate(createtime))}`}</span>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <span className={style.text}>{`${privacyObj[privacy]}`}</span>
                                    
                                    <span className={style.text}>{`${content?content.length:0}条内容`}</span>
                                    
                                    {
                                        defaultCollect || privacy == 2
                                        ?
                                        null
                                        :                                       
                                        <Popover content={<InfoList data={followedBy} text="收藏" />}>
                                            <span className={style.text}>{`${followedBy?followedBy.length:0}人收藏`}<Icon type="caret-left" /></span>                                            
                                        </Popover>
                                        
                                    }
                                
                                </div>
                            </div>
                        </div>
                        <div className={style['button-group']}>
                            {
                                collected
                                ?
                                <Button size="small" className={`${style.button} ${style.remove}`} onClick={(e)=>{e.stopPropagation();onAddIntoContent(uniquekey, _id, true)}} shape="circle" icon="check"/> 
                                :
                                <Button size="small" className={`${style.button} ${style.add}`} onClick={(e)=>{e.stopPropagation();onAddIntoContent(uniquekey, _id, false)}} shape="circle" icon="plus"/>
                            }

                        </div>
                    </div>
                </div>
                <div style={{display: showContent ? 'block':'none'}}>
                    {
                        content && content.length 
                        ?
                        content.map(item=>(
                            <ContentItem data={item} key={item._id} />
                        ))
                        :
                        '还没有收藏任何内容'
                    }
                </div>
            </div>
        )
    }
}

/*

<div className={ forSimple ? "collect-container forSimple" : "collect-container"}>
                <div className="collect-header" onClick={this.handleShowContent.bind(this)}>
                    <Icon type={iconType} />
                    <div className="collect-card">
                        <span style={{flex:'1',position:'relative'}}>
                            <span style={{fontSize:'30px',color:'#1890ff'}}><Icon className={className} type="folder-add" theme="filled" /></span>
                            
                                <span ref={rollOut=>this.rollOut=rollOut} className='motion rollOut'><Icon type="file-text" /></span>
                                
                                <span ref={rollIn=>this.rollIn=rollIn} className='motion rollIn'><Icon type="file-text" /></span>
                            
                            
                        </span>
                        <div style={{flex:'7'}}>
                            <span style={{color:'#000',fontWeight:'500'}}>{tag}</span>
                            <div>
                                <span className="text">{`创建于${formatDate(parseDate(createtime))}`}</span>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <span className="text">{`${privacyObj[privacy]}`}</span>
                                    
                                    <span className="text">{`${collectItem?collectItem.length:0}条内容`}</span>
                                    
                                    {
                                        defaultCollect 
                                        ?
                                        null
                                        :
                                        privacy == 2 
                                        ?
                                        null
                                        :
                                        <Popover onVisibleChange={this.handleChangeIcon.bind(this)} autoAdjustOverflow={false} content={<TopicItemPopover data={followedBy} text="收藏" history={history}/>}>
                                            <span className="text">{`${followedBy?followedBy.length:0}人收藏`}<Icon type={innerIcon} /></span>
                                            
                                        </Popover>
                                        
                                    }
                                
                                </div>
                            </div>
                        </div>
                        {
                            forUser
                            ?
                            null
                            :
                            <div>
                                {
                                    forSimple
                                    ?
                                    null
                                    :
                                    isCollected
                                    ?
                                    <Button size="small" className="button" onClick={this.handleRemoveContent.bind(this,_id, uniquekey)} shape="circle" icon="check"/> 
                                    :
                                    <Button size="small" className="button"  style={{backgroundColor:'rgb(24, 144, 255)'}} onClick={this.handleAddIntoCollect.bind(this,_id)} shape="circle" icon="plus"/> 
                                }
                                <Button size="small" className="button" style={{backgroundColor:'rgb(24, 144, 255)'}} onClick={this.handleShareCollect.bind(this,_id)} shape="circle" icon="export"/>
                            </div>
                            
                        }
                        
                        {
                            forUser
                            ?
                            defaultCollect
                            ?
                            null
                            :
                            isSelf
                            ?
                            <div>
                                <Button size="small"  className="button" style={{backgroundColor:'rgb(24, 144, 255)'}} onClick={this.handleRemoveCollect.bind(this,_id)} shape="circle" icon="close"/>
                                <Button size="small" className="button" style={{backgroundColor:'rgb(24, 144, 255)'}} onClick={this.handleShareCollect.bind(this,_id)} shape="circle" icon="export"/>
                            </div> 
                            :
                            
                            <div>
                            <Tooltip title={collectedByUser?'取消收藏':'收藏'}>
                                <Icon type="star" className={addFlash} theme={collectedByUser?'filled':'outlined'} style={{color:collectedByUser?'#1890ff':'rgba(0, 0, 0, 0.65)'}} onClick={this.handleFollowCollect.bind(this,_id,collectedByUser?true:'')} />
                                 <Button size="small" style={{backgroundColor:collectedByUser?'#dadada':'#1890ff'}} className="button" onClick={this.handleFollowCollect.bind(this,_id,collectedByUser?true:'')} shape="circle">
                                    <Icon type="star" theme={collectedByUser?'filled':'outlined'} style={{color:'#fff'}}/>
                                 </Button>

                            </Tooltip>
                            <Button size="small" className="button" style={{backgroundColor:'rgb(24, 144, 255)'}} onClick={this.handleShareCollect.bind(this,_id)} shape="circle" icon="export"/>

                            </div>
                            :
                            null
                        }
                       
                    
                    </div>
                </div>
                <div style={{display:visible?'block':'none'}}>
                    {
                        collectItem && collectItem.length
                        ?
                        collectItem.map((item, index)=>(
                            <CollectContentItem data={item} key={index} forSimple={forSimple}/>
                        ))
                        :
                        <div>还没有收藏任何内容</div>

                    }
                </div>
            </div>
*/

