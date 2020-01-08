/**
 * @author wangbing
 * @description h5播放器
 */
import React from 'react';
import PropTypes from 'prop-types';

const inter_time = 10 * 1000 //10秒检查一次 

class H5Video extends React.Component {
    state = {
        pass_auth: true,//视频权限认证
        errMsg: '',//错误提示
    }

    timer = null //定时器 监听播放进度是否达到百分之80
    videoRef = null //video实例

    // 获取播放进度和播放总时长
    handleCurrentTime = () => {
        const { onCountFrequency } = this.props
        if (!onCountFrequency) {
            return
        }
        const currentTime = Math.floor(this.videoRef.currentTime)
        const duration = Math.floor(this.videoRef.duration)
        onCountFrequency(currentTime, duration)
    }

    // 视频开始
    play = () => {
        const { onCountFrequency } = this.props
        this.props.onStart()
        this.handleCurrentTime()
        // 不需要进度的视频播放 不开启定时器
        if (onCountFrequency) {
            this.openInter()
        }
    }

    // 视频结束
    complete = () => {
        this.handleCurrentTime()
    }

    // 暂停播放
    pause = () => {
        this.props.onPause()
        this.handleCurrentTime()
        this.pauseInter()
    }

    // 播放失败
    error = () => {
        this.setState({
            errMsg: '视频正在转码中，请稍后刷新重试。',
            pass_auth: false
        })
    }

    // 开启定时
    openInter = () => {
        this.timer = setInterval(() => {
            const currentTime = Math.ceil(this.videoRef.currentTime)
            const duration = Math.ceil(this.videoRef.duration)
            if ((currentTime / duration) > 0.8) {
                this.handleCurrentTime()
                this.pauseInter()
            }

        }, inter_time);
    }
    // 关闭定时
    pauseInter = () => {
        clearInterval(this.timer)
    }

    // 添加监听事件
    init = () => {
        // 屏蔽右键点击事件，下载功能，画中画功能
        this.videoRef.disablePictureInPicture = true;
        this.videoRef.setAttribute('controlsList', 'nodownload')

        this.videoRef.addEventListener("contextmenu", e => e.preventDefault());
        this.videoRef.addEventListener('playing', this.play)
        this.videoRef.addEventListener('ended', this.complete)
        this.videoRef.addEventListener('pause', this.pause)
        this.videoRef.addEventListener('error', this.error)
    }

    // 无权限播放视频页面
    noPermiss = () => {
        return (
            <div style={{ width: '100%', height: '100%', background: '#000', paddingTop: 10 }}>
                <p style={{ textAlign: 'center', color: '#fff' }}>{this.state.errMsg}</p>
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.vid) {
            this.setState({
                errMsg: '未获取到视频文件',
                pass_auth: false
            })
            return
        }

        if (!this.videoRef) {
            return
        }

        this.init()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vid
            && nextProps.vid != this.props.vid) {
            this.setState({
                pass_auth: true
            },()=>{
                this.init()
            })
        }
    }

    componentWillUnmount() {
        this.pauseInter()
        if (!this.videoRef) {
            return
        }
        this.videoRef.removeEventListener('playing', this.play)
        this.videoRef.removeEventListener('ended', this.complete)
        this.videoRef.removeEventListener('pause', this.pause)
        this.videoRef.removeEventListener('error', this.error)
    }

    render() {
        const { pass_auth } = this.state
        const { vid, height, width } = this.props
        return <div style={{ height, width }}>
            {pass_auth ?
                <video
                    ref={videoRef => { this.videoRef = videoRef }}
                    src={vid}
                    id='video_player'
                    controls="controls"
                    height='100%'
                    width='100%' />
                : this.noPermiss()}
        </div>
    }
}
export default H5Video

H5Video.propTypes = {
    /**
     * 视频唯一标识符
     */
    vid: PropTypes.string.isRequired,
    /**
     * 刚开始和当前播放时长占总时长百分之80 回调一次
     * @param currentPosition  当前播放的秒数
     * @param totalDuration  总时间
     */
    onCountFrequency: PropTypes.func,
    /**
     * 是否允许播放（必填,无鉴权返回true即可）
     * @return {boolean}
     */
    onGetVerificationCode: PropTypes.func,
    /**
     * 视频开始
     * @return {string}
     */
    onStart: PropTypes.func,
    /**
     * 视频暂停
     * @return {string}
     */
    onPause: PropTypes.func,
}
H5Video.defaultProps = {
    vid: '',
    onGetVerificationCode: () => {
        return true;
    },
    width: '100%',
    height: '100%',
    onStart: () => { },
    onPause: () => { }
}

