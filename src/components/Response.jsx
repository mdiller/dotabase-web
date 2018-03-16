import React, { Component } from 'react';
import Sound from 'react-sound';
import dotabase from '../Dotabase.js';
soundManager.setup({
	debugMode: false,
	ignoreMobileRestrictions: true
});

var pause_path = "M0,0 L33.33,0 33.33,100 0,100  M66.66,0 L100,0 100,100 66.66,100";
var play_path =  "M50,25 L100,50 100,50 50,75 M0,0 L50,25 50,75 0,100";

class Response extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playStatus: Sound.status.STOPPED
		};
		this.speakerClicked = this.speakerClicked.bind(this);
		this.audioFinished = this.audioFinished.bind(this);
	}
	speakerClicked() {
		var new_state = this.state.playStatus == Sound.status.PLAYING ? Sound.status.PAUSED : Sound.status.PLAYING
		this.setState({ playStatus: new_state });
		this.animate_element.beginElement();
	}
	audioFinished() {
		this.setState({ playStatus: Sound.status.STOPPED });
		this.animate_element.beginElement();
	}
	render() {
		var { response } = this.props;
		return (
			<div className="response">
				<div className="soundtitle">
					<span>
						<span className="link-menu-list">
							<a className="link-button" href={dotabase.vpk_path + response.mp3}>
								<img src="/images/link.svg"/>
							</a>
							<a className="link-button" href={dotabase.vpk_path + response.mp3} download>
								<img src="/images/download.svg"/>
							</a>
						</span>
						<span className="speaker" onMouseUp={this.speakerClicked} onTouchEnd={this.speakerClicked} onTouchStart={(e) => {e.preventDefault()}}>
							<svg viewBox="0 0 100 100">
								<path d="M 0,0 L 100,50 0,100 Z">
									<animate 
										attributeName="d" 
										dur="200ms" 
										fill="freeze"
										begin="indefinite"
										ref={(element) => { this.animate_element = element }}
										from={this.state.playStatus == Sound.status.PLAYING ? play_path : pause_path}
										to={this.state.playStatus != Sound.status.PLAYING ? play_path : pause_path} />
								</path>
							</svg>
							<Sound 
								url={dotabase.vpk_path + response.mp3} 
								playStatus={this.state.playStatus}
								onFinishedPlaying={this.audioFinished} />
						</span>
					</span>
					<span>
						<img src={dotabase.vpk_path + response.voice_icon} />
						{response.name}
					</span>
				</div>
				<div>
					{response.text}
				</div>
			</div>);
	}
}

export default Response;