import { Component } from "react";
import { connect } from "react-redux";

import LayoutStateSlice from "../redux/LayoutState";
import { Coordinate2Index, Modes } from "../API";

import "./Layouts.css";

class Layout extends Component {
	LayoutInformation;
	get ComputedInformation() {
		let SorryYearnt = {
			PositionIndexs: {}
		};
		let Positions = this.LayoutInformation.Positions;
		Object.keys(Positions).forEach(element => {
			SorryYearnt.PositionIndexs[element] = Coordinate2Index(Positions[element][0], Positions[element][1]);
		});
		return SorryYearnt;
	}
	componentDidMount = this.Load;
	componentDidUpdate = this.Load;
	Load() {
		this.props.SetLayout({ ...this.LayoutInformation, ...this.ComputedInformation });
	}
	render = () => null;
}
/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
class HengDaoLiMa extends Layout {
	LayoutInformation = {
		Mode: Modes[1],
		Positions: {
			CaoCao: [0, 1],
			GuanYu: [2, 1],
			ZhangFei: [0, 0],
			ZhaoYun: [0, 3],
			MaChao: [2, 0],
			HuangZhong: [2, 3],
			Soldier1: [4, 0],
			Soldier2: [3, 1],
			Soldier3: [3, 2],
			Soldier4: [4, 3]
		}
	};
}
class BieWuXuanZe extends Layout {
	LayoutInformation = {
		Mode: Modes[1],
		Positions: {
			CaoCao: [0, 0],
			GuanYu: [2, 2],
			ZhangFei: [0, 2],
			ZhaoYun: [2, 1],
			MaChao: [3, 0],
			HuangZhong: [3, 3],
			Soldier1: [2, 0],
			Soldier2: [3, 2],
			Soldier3: [4, 1],
			Soldier4: [4, 2]
		},
	};
}
class LuanShiBengYun extends Layout {
	LayoutInformation = {
		Mode: Modes[1],
		Positions: {
			CaoCao: [0, 1],
			GuanYu: [2, 0],
			ZhangFei: [0, 0],
			ZhaoYun: [1, 3],
			MaChao: [2, 2],
			HuangZhong: [3, 0],
			Soldier1: [0, 3],
			Soldier2: [3, 1],
			Soldier3: [3, 3],
			Soldier4: [4, 3]
		}
	};
}

const Layouts = {
	HengDaoLiMa: connect(undefined, {
		SetLayout: LayoutStateSlice.actions.SetLayout
	})(HengDaoLiMa),
	BieWuXuanZe: connect(undefined, {
		SetLayout: LayoutStateSlice.actions.SetLayout
	})(BieWuXuanZe),
	LuanShiBengYun: connect(undefined, {
		SetLayout: LayoutStateSlice.actions.SetLayout
	})(LuanShiBengYun)
};

export default Layouts;
