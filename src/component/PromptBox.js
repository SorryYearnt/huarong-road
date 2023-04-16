import { Component } from "react";
import { connect } from "react-redux";

import { Mode2ClassName } from "../API";

import "./PromptBox.css";

class PromptBox extends Component {
	render() {
		if (!this.props.OperationState.CanMove) {
			return <div className={"PromptBox"}></div>;
		}
		return (
			<div className={"PromptBox" + Mode2ClassName(this.props.LayoutState[this.props.OperationState.CurrentSelecting].WidthHeight)} style={{
				display: 'block',
				left: `${this.props.OperationState.TargetPositions[0][1] * 25}%`,
				top: `${this.props.OperationState.TargetPositions[0][0] * 20}%`,
				transform: this.props.OperationState.WillSuccess ? `translateY(${100 / 9}%)` : null
			}}></div>
		);
	}
}
/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */

export default connect(state => ({
	OperationState: state.OperationState,
	LayoutState: state.LayoutState
}))(PromptBox);
