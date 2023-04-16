import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { C2P, Mode2ClassName } from "../API";
import OperationStateSlice from "../redux/OperationState";

import "./Piece.css";

export default function Piece(props) {
	let OperationState = useSelector(state => state.OperationState.CurrentSelecting == props.Character ? state.OperationState : void 0);
	let dispatch = useDispatch();
	let TransitioningCharacter = useSelector(state => state.OperationState.TransitioningCharacter == props.Character);
	let TransitionFlag = useRef(false);
	let Success = useSelector(state => state.OperationState.Success);
	function WhenDragged(clientX, clientY) {
		TransitionFlag.current = true;
		dispatch(OperationStateSlice.actions.SelectingStart(props.Character, [clientX, clientY]));
	}
	function OnMouseDown(event) {
		WhenDragged(event.clientX, event.clientY);
	}
	function OnTouchStart(event) {
		if (event.touches.length == 1) {
			WhenDragged(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
		}
		else {
			dispatch(OperationStateSlice.actions.Dropped());
		}
	}
	function OnTransitionEnd() {
		if (TransitionFlag.current) {
			TransitionFlag.current = false;
			dispatch(OperationStateSlice.actions.MovingEnd(props.Character));
		}
	}
	let CharacterLayoutState = useSelector(state => state.LayoutState[props.Character]);
	let BaseClassName1 = 'Piece ' + Mode2ClassName(CharacterLayoutState.WidthHeight);
	let BaseClassName2 = C2P(props.Character);
	let BaseStyle1 = {
		left: `${CharacterLayoutState.ColumnPosition * 25}%`,
		top: `${CharacterLayoutState.RowPosition * 20}%`,
		zIndex: TransitioningCharacter ? 1 : null,
	};
	let BorderWidth = useSelector(state => state.PositionState.SideLength) / 15;
	let BaseStyle2 = {
		borderWidth: `${BorderWidth}px`
	};
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	if (Success && props.Character == 'CaoCao') {
		BaseStyle1.transform = `translateY(${100 / 9}%)`;
	}
	let EventProps = {
		onTransitionEnd: OnTransitionEnd
	};
	if (!Success) {
		EventProps.onMouseDown = OnMouseDown;
		EventProps.onTouchStart = OnTouchStart;
	}
	if (OperationState) {
		return (
			<div className={BaseClassName1 + ' Dragging'} style={{
				...BaseStyle1,
				transform: `translate(${OperationState.DragDisplacement[0]}px,${OperationState.DragDisplacement[1]}px)`
			}}>
				<div className={BaseClassName2} style={{
					...BaseStyle2,
					borderColor: OperationState.CanMove !== undefined ? OperationState.CanMove ? 'var(--CanMove-Color)' : 'var(--CanNotMove-Color)' : null
				}}></div>
			</div>
		);
	}
	else {
		return (
			<div className={BaseClassName1} style={BaseStyle1} title={props.CharacterName} {...EventProps}>
				<div className={BaseClassName2} style={BaseStyle2}></div>
			</div>
		);
	}
}
