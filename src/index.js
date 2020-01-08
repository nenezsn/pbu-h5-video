import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import H5Video from './video'
// import H5Video from '../lib/Video.js'

class TestComponent extends Component {
    state={
        // vid:'https://pbu-public.oss-cn-beijing.aliyuncs.com/webapps/default_media/recruit-students.mp4',
        vid:'',
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                vid:'https://pbu-public.oss-cn-beijing.aliyuncs.com/webapps/default_media/recruit-students.mp4',
            })
        }, 3000);
    }
    render() {
        return (
            <div>
                <H5Video 
                width={300}
                 height={180} 
                 vid={this.state.vid}
                 onCountFrequency={(cur,tot)=>{
                     console.log('cur-tot',cur+"-"+tot)
                 }}
                 onStart={()=>{
                     console.log('start')
                 }}
                 onPause={()=>{
                     console.log('pause')
                 }}
                 />  
            </div>

        )
    }
}

// Render
ReactDOM.render((<TestComponent />), document.getElementById('app'));
