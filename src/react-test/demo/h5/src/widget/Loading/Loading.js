import React, { Component } from 'react'
import './style.less'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render () {
        return (
            <div className="loading-box-1">
                <div className="spinner">
                    <div className="bounce1 bounce"></div>
                    <div className="bounce2 bounce"></div>
                    <div className="bounce3 bounce"></div>
                </div>
            </div>
        )
    }
}
export default Loading