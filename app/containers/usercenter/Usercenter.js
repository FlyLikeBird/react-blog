import React, {Component, PropTypes} from 'react'

export default class Usercenter extends Component {

    constructor(props) {
        super(props);
        
    }

    openNotification(type, message) {
        let that = this;
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    };

    render() {
        let {isFetching} = this.props;
        return (
            <div>usercenter</div>
        )
    }


}

/*
function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)
*/