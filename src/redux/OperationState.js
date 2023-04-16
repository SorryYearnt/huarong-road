import { createSlice } from "@reduxjs/toolkit";
import LayoutStateSlice from "./LayoutState";

function ToNoOperationState(state) {
	state.CurrentSelecting = null;
	state.TargetPositionDisplaying = false;
	state.CanMove = undefined;
	state.SelectingStartCoordinate = null;
	state.DragDisplacement = null;
	state.TargetPositions = null;
	state.WillSuccess = false;
	return state;
};

const OperationStateSlice = createSlice({
	name: 'OperationState',
	initialState: ToNoOperationState({
		TransitioningCharacter: null,
		Success: false
	}),
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	reducers: {
		SelectingStart: {
			reducer: (state, action) => {
				state.TransitioningCharacter = state.CurrentSelecting = action.payload.Character;
				state.SelectingStartCoordinate = action.payload.MouseCoordinate;
				state.DragDisplacement = [0, 0];
			},
			prepare: (Character, MouseCoordinate) => ({
				payload: {
					Character,
					MouseCoordinate
				}
			})
		},
		Dragging: {
			reducer: (state, action) => {
				let SorryYearnt = action.payload;
				state.DragDisplacement = SorryYearnt.DragDisplacement;
				state.TargetPositions = SorryYearnt.TargetPositions;
				state.CanMove = SorryYearnt.CanMove;
				state.WillSuccess = SorryYearnt.WillSuccess;
			},
			prepare: (DragDisplacement, TargetPositions, CanMove, WillSuccess) => ({
				payload: {
					DragDisplacement,
					TargetPositions,
					CanMove,
					WillSuccess
				}
			})
		},
		Dropped: state => {
			if (state.WillSuccess) {
				state.Success = true;
			}
			ToNoOperationState(state);
		},
		MovingEnd: (state, action) => {
			if (state.TransitioningCharacter == action.payload) {
				state.TransitioningCharacter = null;
			}
		}
	},
	extraReducers: builder => {
		builder.addCase(LayoutStateSlice.actions.SetLayout, state => {
			state.TransitioningCharacter = null;
			state.Success = false;
		});
	}
});

export default OperationStateSlice;
