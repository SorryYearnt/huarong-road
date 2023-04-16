import { Component, createRef } from 'react';
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Store from "../redux/Store";
import PositionStateSlice from "../redux/PositionState";

import Select, { Option } from './Select';
import Game from './Game';

import './Gamer.css';

class Gamer extends Component {
	LayoutRef = createRef();
	GamerRef = createRef();
	SetupRef = createRef();
	state = {
		LayoutTime: new Date(),
		SelectClosed: true,
		SelectFocused: false
	};
	LayoutTime = this.state.LayoutTime;
	ReStart() {
		this.setState({
			LayoutTime: new Date()
		});
	}
	WhenSelectFocus() {
		this.setState({
			SelectFocused: true
		});
	}
	WhenSelectBlur() {
		this.setState({
			SelectFocused: false
		});
	}
	WhenSelectOpen = () => {
		this.setState({
			SelectClosed: false
		});
	}
	WhenSelectClose = () => {
		this.setState({
			SelectClosed: true
		});
	}
	whenResize = () => {
		let Gamer = this.GamerRef.current;
		let Game = Gamer.querySelector('.Game');
		let Title = Gamer.getElementsByClassName('Title')[0];
		let H1 = Title.getElementsByTagName('h1')[0];
		let Setup = Title.querySelector('.Setup');
		let MinimunHeight = 490 + 127.5;
		let AvailableWidth = window.innerWidth;
		let AvailableHeight = window.innerHeight * 0.9;
		let BorderRadius;
		if (AvailableWidth <= 450) {
			Gamer.style.margin = '0 auto';
			AvailableHeight *= 0.95 / 0.9;
		}
		else {
			Gamer.style.margin = null;
		}
		if (AvailableWidth <= 400) {
			MinimunHeight = 490 * AvailableWidth / 400 + 127.5;
		}
		else {
			AvailableWidth = 400;
			BorderRadius = true;
		}
		Gamer.style.height = `${AvailableHeight}px`;
		if (AvailableHeight < MinimunHeight) {
			let HeightScale = AvailableHeight / MinimunHeight;
			Gamer.style.width = `${HeightScale * AvailableWidth}px`;
			Title.style.height = `${HeightScale * 127.5}px`;
			H1.style.height = `${HeightScale * 70}px`;
			Setup.style.transform = `scale(${HeightScale})`;
			BorderRadius = true;
		}
		else {
			Gamer.style.width = null;
			let GamerStyle = window.getComputedStyle(Gamer);
			Title.style.height = `${Number.parseFloat(GamerStyle.height) - Number.parseFloat(GamerStyle.width) * 1.225}px`;
			H1.style.height = null;
			Setup.style.transform = null;
			Game.style.borderRadius = null;
		}
		Game.style.borderRadius = BorderRadius ? 'inherit' : null;
		Store.dispatch(PositionStateSlice.actions.SetSideLength(Game.clientWidth * 0.9 / 4));
	};
	WhenTouchOperate = () => {
		this.SetupRef.current.children[1].blur();
	}
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	constructor(props) {
		super(props);
		this.WhenSelectFocus = this.WhenSelectFocus.bind(this);
		this.WhenSelectBlur = this.WhenSelectBlur.bind(this);
	}
	componentDidMount() {
		this.whenResize();
		window.addEventListener('resize', this.whenResize);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.whenResize);
	}
	render() {
		return (
			<HashRouter>
				<div className='Gamer' ref={this.GamerRef}>
					{this.state.LayoutTime !== this.LayoutTime && (this.LayoutTime = this.state.LayoutTime, setTimeout(() => this.forceUpdate()), (<Navigate to={'/' + this.LayoutRef.current} replace />))}
					<div className='Title'>
						<h1></h1>
						<div className='Setup' style={{
							zIndex: this.state.SelectFocused || !this.state.SelectClosed ? 2 : null
						}} ref={this.SetupRef}>
							<button onClick={() => this.ReStart()}>重新开始</button>
							<Select valueRef={this.LayoutRef} onBlur={this.WhenSelectBlur} onFocus={this.WhenSelectFocus} whenOpen={this.WhenSelectOpen} whenClose={this.WhenSelectClose}>
								<Option value='横刀立马' selected>横刀立马</Option>
								<Option value='别无选择'>别无选择</Option>
								<Option value='乱石崩云'>乱石崩云</Option>
							</Select>
						</div>
					</div>
					<Provider store={Store}>
						<Game LayoutTime={this.LayoutTime} WhenTouchOperate={this.WhenTouchOperate} />
					</Provider>
				</div>
			</HashRouter>
		);
	}
}
export default Gamer;
