# PBUH5Video
> 本地化播放器H5Video封装
#### 安装
```js
npm i pbu-h5-video --save
```

#### 使用
```js
import React from 'react';
import ReactDOM from 'react-dom';
import H5Video from 'pbu-h5-video';

ReactDOM.render(<H5Video 
                width={300}
                 height={180} 
                 vid='url'
                 onCountFrequency={(cur,tot)=>{
                     console.log('当前时间-总时间',cur+"-"+tot)
                 }}
                 onStart={()=>{
                     console.log('视频开始')
                 }}
                 onPause={()=>{
                     console.log('视频暂停或结束')
                 }}
                 />  , 'app');
```

#### 更新记录
- @1.0.5 增加onStart 和 onPause 回调函数
- @1.0.6 禁用了画中画和下载功能
- @1.0.7 禁用了视频右键功能
- @1.0.8 放弃通过id获取videoDom,改用ref | 视频进度回调机制调整
- @1.0.9 针对controlsList可能不生效的问题解决|当未传递vid或vid为空时预处理