import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs } from 'antd'
import UserItem from './components/UserItem'

export default class UserList extends PureComponent {

    render() {
        var { data, text } = this.props;
        return (
            <div>
                {
                    data && data.length 
                    ?
                    data.map(item=>(
                        <UserItem
                            key={item._id}
                            data={item}
                        />
                    ))
                    :
                    `${text==='follow'?'暂时还没有关注任何人':'暂时还没有任何粉丝'}`
                }
            </div>
        )
    }
}


