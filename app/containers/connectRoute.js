import React from 'react'

export default function connectRoute(WrappedComponent){
    class WrappedRoute extends React.Component {
        
        shouldComponentUpdate(nextProps){
            return nextProps.location !== this.props.location;
        }
        
        render(){
            return <WrappedComponent {...this.props} />
        }
    }
    return WrappedRoute;
}