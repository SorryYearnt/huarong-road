import { Component } from "react";

import HTMLComment from "./HTMLComment";
import Piece from "./Piece";

import "./Characters.css";

class Character extends Component {
	constructor(props, Character, CharacterName) {
		super(props);
		this.Character = Character;
		this.CharacterName = CharacterName;
	}
	render() {
		return (
			<Piece Character={this.Character} CharacterName={this.CharacterName}></Piece>
		);
	}
}

function CharacterClassConstructor(_Character, CharacterName) {
	function CharacterConstructor(props) {
		return new Character(props, _Character, CharacterName);
	}
	CharacterConstructor.prototype = Character.prototype;
	return CharacterConstructor;
}
/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */

const CaoCao = CharacterClassConstructor('CaoCao', '曹操');
const GuanYu = CharacterClassConstructor('GuanYu', '关羽');
const ZhangFei = CharacterClassConstructor('ZhangFei', '张飞');
const ZhaoYun = CharacterClassConstructor('ZhaoYun', '赵云');
const MaChao = CharacterClassConstructor('MaChao', '马超');
const HuangZhong = CharacterClassConstructor('HuangZhong', '黄忠');
const Soldier1 = CharacterClassConstructor('Soldier1', '兵');
const Soldier2 = CharacterClassConstructor('Soldier2', '兵');
const Soldier3 = CharacterClassConstructor('Soldier3', '兵');
const Soldier4 = CharacterClassConstructor('Soldier4', '兵');

class Characters extends Component {
	render() {
		return (
			<div className="Characters">
				<CaoCao />
				<GuanYu />
				<ZhangFei />
				<ZhaoYun />
				<MaChao />
				<HuangZhong />
				<HTMLComment> 本网页由SorryYearnt制作，转载请注明出处。This web page is produced by SorryYearnt. Please indicate the source for reprinting. このページはSorryYearntで作成されています。転載は出典を明記してください。 </HTMLComment>
				<Soldier1 />
				<Soldier2 />
				<Soldier3 />
				<Soldier4 />
			</div>
		);
	}
}

export default Characters;
