import { Component, createRef } from "react"
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";

import Store from "../redux/Store";
import PositionStateSlice from "../redux/PositionState";
import OperationStateSlice from "../redux/OperationState";
import LayoutStateSlice from "../redux/LayoutState";
import { Coordinate2Index } from "../API";

import './Game.css';

import Layouts from "./Layouts";
import Positions from "./Positions";
import Characters from "./Characters";
import PromptBox from "./PromptBox";
import PromptInformation from "./PromptInformation";

class Game extends Component {
	PositionsRef = createRef();
	PromptInformationRef = createRef();
	WhenDragging(clientX, clientY, callback) {
		let state = Store.getState();
		let OperationState = state.OperationState;
		if (!OperationState.CurrentSelecting) {
			return;
		}
		callback?.();
		let SelectingCharacterInformation = state.LayoutState[OperationState.CurrentSelecting];
		let SideLength = state.PositionState.SideLength;
		let DragDisplacement = [clientX - OperationState.SelectingStartCoordinate[0], clientY - OperationState.SelectingStartCoordinate[1]];
		let TargetPositions = [];
		let CanMove;
		let LastStep = false;
		if (OperationState.CurrentSelecting == 'CaoCao') {
			switch (SelectingCharacterInformation.PositionIndex) {
				case 9:
				case 12:
				case 14:
					LastStep = 2;
					break;
				case 13:
					LastStep = 1;
			}
		}
		let WillSuccess = false;
		if (Math.abs(DragDisplacement[0]) > SideLength / 2 || Math.abs(DragDisplacement[1]) > SideLength / 2 || LastStep == 1 && DragDisplacement[1] > SideLength / 9) {
			CanMove = true;
			TargetPositions[0] = [];
			if (DragDisplacement[0] > 0) {
				let MaxDragXDisplacement = (4.5 - SelectingCharacterInformation.ColumnPosition - SelectingCharacterInformation.WidthHeight[0]) * SideLength;
				TargetPositions[0][1] = SelectingCharacterInformation.ColumnPosition + Math.trunc(DragDisplacement[0] / SideLength + 0.5);
				if (DragDisplacement[0] >= MaxDragXDisplacement) {
					if (DragDisplacement[0] == MaxDragXDisplacement) {
						TargetPositions[0][1]--;
					}
					else {
						DragDisplacement[0] = MaxDragXDisplacement;
						CanMove = false;
					}
				}
			}
			else {
				let MaxDragXDisplacement = (-0.5 - SelectingCharacterInformation.ColumnPosition) * SideLength;
				TargetPositions[0][1] = SelectingCharacterInformation.ColumnPosition + Math.trunc(DragDisplacement[0] / SideLength - 0.5);
				if (DragDisplacement[0] <= MaxDragXDisplacement) {
					if (DragDisplacement[0] == MaxDragXDisplacement) {
						TargetPositions[0][1]++;
					}
					else {
						DragDisplacement[0] = MaxDragXDisplacement;
						CanMove = false;
					}
				}
			}
			if (DragDisplacement[1] > 0) {
				let MaxDragYDisplacement = (5.5 - SelectingCharacterInformation.RowPosition - SelectingCharacterInformation.WidthHeight[1]) * SideLength;
				if (LastStep && TargetPositions[0][1] == 1) {
					if (LastStep == 2) {
						if (DragDisplacement[1] >= SideLength * 10 / 9) {
							WillSuccess = true;
						}
					}
					else {
						if (DragDisplacement[1] >= SideLength / 9) {
							WillSuccess = true;
						}
					}
				}
				TargetPositions[0][0] = SelectingCharacterInformation.RowPosition + Math.trunc(DragDisplacement[1] / SideLength + 0.5);
				if (DragDisplacement[1] >= MaxDragYDisplacement) {
					if (DragDisplacement[1] == MaxDragYDisplacement) {
						TargetPositions[0][0]--;
					}
					else {
						DragDisplacement[1] = MaxDragYDisplacement;
						if (!WillSuccess) {
							CanMove = false;
						}
						else {
							TargetPositions[0] = [3, 1];
						}
					}
				}
			}
			else {
				let MaxDragYDisplacement = (-0.5 - SelectingCharacterInformation.RowPosition) * SideLength;
				TargetPositions[0][0] = SelectingCharacterInformation.RowPosition + Math.trunc(DragDisplacement[1] / SideLength - 0.5);
				if (DragDisplacement[1] <= MaxDragYDisplacement) {
					if (DragDisplacement[1] == MaxDragYDisplacement) {
						TargetPositions[0][0]++;
					}
					else {
						DragDisplacement[1] = MaxDragYDisplacement;
						CanMove = false;
					}
				}
			}
			if (CanMove) {
				let TargetDistanceComponents = [Math.abs(TargetPositions[0][1] - SelectingCharacterInformation.ColumnPosition), Math.abs(TargetPositions[0][0] - SelectingCharacterInformation.RowPosition)];
				let TargetDistance = TargetDistanceComponents[0] + TargetDistanceComponents[1];
				if (TargetDistance > 2) {
					CanMove = false;
				}
				else {
					let PositionIndividualStates = state.PositionState.Individual;
					TestIfOccupied: for (let i = 0; i < SelectingCharacterInformation.WidthHeight[0]; i++) {
						for (let j = 0; j < SelectingCharacterInformation.WidthHeight[1]; j++) {
							let PositionIndex = Coordinate2Index(TargetPositions[0][0] + j, TargetPositions[0][1] + i)
							let SorryYearnt = PositionIndividualStates[PositionIndex].Occupied;
							if (SorryYearnt != OperationState.CurrentSelecting && SorryYearnt != null) {
								CanMove = false;
								break TestIfOccupied;
							}
							else {
								TargetPositions.push(PositionIndex);
							}
						}
					}
					if (CanMove && TargetDistance == 2) {
						if (TargetDistanceComponents[0] == 2) {
							let SorryYearnt = PositionIndividualStates[Coordinate2Index(SelectingCharacterInformation.RowPosition, (SelectingCharacterInformation.ColumnPosition + TargetPositions[0][1]) / 2)].Occupied;
							if (SorryYearnt != OperationState.CurrentSelecting && SorryYearnt != null) {
								CanMove = false;
							}
						}
						else if (TargetDistanceComponents[1] == 2) {
							let SorryYearnt = PositionIndividualStates[Coordinate2Index((SelectingCharacterInformation.RowPosition + TargetPositions[0][0]) / 2, SelectingCharacterInformation.ColumnPosition)].Occupied;
							if (SorryYearnt != OperationState.CurrentSelecting && SorryYearnt != null) {
								CanMove = false;
							}
						}
						else {
							if (PositionIndividualStates[Coordinate2Index(SelectingCharacterInformation.RowPosition, TargetPositions[0][1])].Occupied != null && PositionIndividualStates[Coordinate2Index(TargetPositions[0][0], SelectingCharacterInformation.ColumnPosition)].Occupied != null) {
								CanMove = false;
							}
						}
					}
				}
			}
		}
		this.props.Dragging(DragDisplacement, TargetPositions, CanMove, WillSuccess);
	}
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	OnMouseMove = event => {
		this.WhenDragging(event.clientX, event.clientY);
	}
	OnTouchMove = event => {
		this.WhenDragging(event.changedTouches[0].clientX, event.changedTouches[0].clientY, this.props.WhenTouchOperate);
	}
	WhenDropped() {
		let state = Store.getState();
		if (state.OperationState.CurrentSelecting) {
			if (state.OperationState.CanMove) {
				this.props.MoveCharacter(state.OperationState.CurrentSelecting, state.OperationState.TargetPositions);
			}
			this.props.Dropped();
		}
	}
	OnMouseUP = event => {
		this.WhenDropped(event.clientX, event.clientY);
	}
	OnTouchEnd = event => {
		this.WhenDropped(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
	}
	componentDidMount() {
		this.props.dispatch({
			type: 'PositionState/SetSideLength',
			payload: this.PositionsRef.current.getBoundingClientRect().width / 4
		});
		document.addEventListener('mousemove', this.OnMouseMove);
		document.addEventListener('touchmove', this.OnTouchMove);
		document.addEventListener('mouseup', this.OnMouseUP);
		document.addEventListener('touchend', this.OnTouchEnd);
		Store.subscribe(() => {
			let OperationState = Store.getState().OperationState;
			if (OperationState.Success && !OperationState.TransitioningCharacter) {
				this.PromptInformationRef.current.setState({
					Display: true
				});
			}
		});
	}
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.OnMouseMove);
		document.removeEventListener('touchmove', this.OnTouchMove);
		document.removeEventListener('mouseup', this.OnMouseUP);
		document.removeEventListener('touchend', this.OnTouchEnd);
	}
	render() {
		return (
			<div className="Game" ref={this.Ref}>
				<Routes>
					<Route path="/">
						<Route index element={<Layouts.HengDaoLiMa LayoutTime={this.props.LayoutTime} />} />
						<Route path="横刀立马" element={<Layouts.HengDaoLiMa LayoutTime={this.props.LayoutTime} />} />
						<Route path="别无选择" element={<Layouts.BieWuXuanZe LayoutTime={this.props.LayoutTime} />} />
						<Route path="乱石崩云" element={<Layouts.LuanShiBengYun LayoutTime={this.props.LayoutTime} />} />
					</Route>
				</Routes>
				<Positions ref={this.PositionsRef}>
					<Characters />
					<PromptBox />
				</Positions>
				<div className="Exit"></div>
				<PromptInformation ref={this.PromptInformationRef} />
			</div>
		);
	}
}

export default connect(undefined, dispatch => ({
	Dragging: (...args) => dispatch(OperationStateSlice.actions.Dragging(...args)),
	MoveCharacter: (...args) => dispatch(LayoutStateSlice.actions.MoveCharacter(...args)),
	Dropped: (...args) => dispatch(OperationStateSlice.actions.Dropped(...args)),
	dispatch
}))(Game);
