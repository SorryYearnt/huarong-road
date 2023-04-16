import { createSlice } from "@reduxjs/toolkit";
import { C2P } from "../API";


const LayoutStateSlice = createSlice({
	name: 'LayoutState',
	initialState: {
		CaoCao: {},
		GuanYu: {},
		ZhangFei: {},
		ZhaoYun: {},
		MaChao: {},
		HuangZhong: {},
		Soldier1: {},
		Soldier2: {},
		Soldier3: {},
		Soldier4: {}
	},
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	reducers: {
		SetLayout: (state, action) => {
			Object.keys(state).forEach(element => {
				let SorryYearnt = action.payload;
				state[element].WidthHeight = SorryYearnt.Mode[C2P(element)];
				state[element].RowPosition = SorryYearnt.Positions[element][0];
				state[element].ColumnPosition = SorryYearnt.Positions[element][1];
				state[element].PositionIndex = SorryYearnt.PositionIndexs[element];
			});
		},
		MoveCharacter: {
			reducer: (state, action) => {
				let CurrentSelecting = action.payload.CurrentSelecting;
				let TargetPositions = action.payload.TargetPositions;
				state[CurrentSelecting].RowPosition = TargetPositions[0][0];
				state[CurrentSelecting].ColumnPosition = TargetPositions[0][1];
				state[CurrentSelecting].PositionIndex = TargetPositions[1];
			},
			prepare: (CurrentSelecting, TargetPositions) => ({
				payload: {
					CurrentSelecting,
					TargetPositions,
				}
			})
		}
	}
});

export default LayoutStateSlice;
