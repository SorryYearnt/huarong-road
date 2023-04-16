import { createSlice } from "@reduxjs/toolkit";

import LayoutStateSlice from "./LayoutState";

import { C2P, Coordinate2Index } from "../API";

function NewPositionIndividualStates() {
	return [...new Array(20)].map((element, index) => ({
		RowIndex: Math.trunc(index / 4),
		ColumnIndex: index % 4,
		Piece: null,
		Occupied: null,
		Target: false
	}));
}

const PositionStateSlice = createSlice({
	name: 'PositionState',
	initialState: () => ({
		SideLength: void 0,
		Individual: NewPositionIndividualStates()
	}),
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	reducers: {
		SetSideLength: (state, action) => {
			state.SideLength = action.payload;
		}
	},
	extraReducers: {
		[LayoutStateSlice.actions.SetLayout]: (state, { payload: SorryYearnt }) => {
			state.Individual = NewPositionIndividualStates();
			Object.getOwnPropertyNames(SorryYearnt.Positions).forEach(element => {
				state.Individual[SorryYearnt.PositionIndexs[element]].Piece = element;
				for (let i = 0; i < SorryYearnt.Mode[C2P(element)][0]; i++) {
					for (let j = 0; j < SorryYearnt.Mode[C2P(element)][1]; j++) {
						state.Individual[Coordinate2Index(SorryYearnt.Positions[element][0] + j, SorryYearnt.Positions[element][1] + i)].Occupied = element;
					}
				}
			});
		},
		'LayoutState/MoveCharacter': (state, action) => {
			let CurrentSelecting = action.payload.CurrentSelecting;
			let TargetPositions = action.payload.TargetPositions;
			state.Individual.forEach(element => {
				if (element.Occupied == CurrentSelecting) {
					element.Piece = null;
					element.Occupied = null;
				}
			});
			state.Individual[TargetPositions[1]].Piece = CurrentSelecting;
			for (let i = 1; i < TargetPositions.length; i++) {
				state.Individual[TargetPositions[i]].Occupied = CurrentSelecting;
			}
		}
	}
});

export default PositionStateSlice;
