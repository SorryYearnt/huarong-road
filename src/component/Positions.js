import { Component, forwardRef } from "react";
import { connect } from "react-redux";

import "./Positions.css";

class _Position extends Component {
	render() {
		return (
			<div className='Position' data-index={this.props.index} style={{
				backgroundColor: this.props.Target ? '#96AFB8' : null
			}}></div>
		);
	}
}
/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */

const Position = connect((state, ownProps) => ({
	Target: state.PositionState.Individual[ownProps.index].Target
}))(_Position);

const Positions = forwardRef((props, ref) => {
	function CreatePositions() {
		let Positions = [];
		for (let i = 0; i < 20; i++) {
			Positions.push(
				<Position index={i} key={i}></Position>
			);
		}
		return Positions;
	}

	return (
		<div {...props} className='Positions' ref={ref}>
			{CreatePositions()}
			{props.children}
		</div>
	);
});

export default Positions;
