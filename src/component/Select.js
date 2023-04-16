import { cloneElement, createRef, forwardRef, isValidElement, useEffect, useState } from 'react';

import './Select.css';

const Select = forwardRef(({ value, children, valueRef, onChange, onClick, onBlur, className, onTransitionEnd, whenClose, whenOpen, style, ...otherProps }, ref) => {
	const [state, setState] = useState({
		selectingIndex: 0,
		haveSelected: false,
		spreading: false,
	});
	let optionIndex = 0;
	let selectingIndex;
	let haveSelected = false;
	const selectingRef = createRef();
	function linkOption(element, key) {
		if (isValidElement(element)) {
			if (element.type === Option) {
				let selecting = false;
				if (selectingIndex === void 0) {
					if (value !== void 0) {
						if (element.props.value === value) {
							selectingIndex = optionIndex;
							selecting = true;
							haveSelected = true;
						}
					}
					else {
						if (optionIndex === state.selectingIndex) {
							selectingIndex = optionIndex;
							value = element.props.value;
							selecting = true;
							haveSelected = true;
						}
					}
				}
				return cloneElement(element, {
					index: optionIndex++,
					whenSelected: whenOptionSelected,
					key: element.key || key,
					selecting: selecting,
					selectingRef: selecting ? selectingRef : void 0
				});
			}
			else {
				return cloneElement(element, {
					key: element.key || key
				});
			}
		}
		else {
			return element;
		}
	}
	let newChildren = Array.isArray(children) ? children.map((element, index) => linkOption(element, index)) : [linkOption(children)];
	state.selectingIndex = selectingIndex || 0;
	state.haveSelected = haveSelected;
	if (!haveSelected) {
		value = void 0;
	}
	valueRef && (valueRef.current = value);
	useEffect(() => {
		if (typeof onChange === 'function') {
			onChange();
		}
	}, [selectingIndex, haveSelected, value]);
	const inputRef = createRef();
	const optionsRef = createRef();
	const dropdowmMenuRef = createRef();
	useEffect(() => {
		let optionsMaxHeight = parseInt(getComputedStyle(inputRef.current).height) * 5;
		let optionsContentHeight = optionsRef.current.scrollHeight;
		if (optionsMaxHeight < optionsContentHeight + 0.5) {
			optionsRef.current.classList.remove('NotOverHeight');
			if (state.haveSelected) {
				optionsRef.current.scrollTop = selectingRef.current.offsetTop - optionsRef.current.offsetTop;
			}
		}
		else {
			optionsRef.current.classList.add('NotOverHeight');
		}
		optionsRef.current.style.maxHeight = optionsMaxHeight + 'px';
		if (state.spreading) {
			dropdowmMenuRef.current.style.maxHeight = optionsMaxHeight + 'px';
		}
		else {
			dropdowmMenuRef.current.style.maxHeight = null;
		}
	});
	function whenOptionSelected(index) {
		setState({
			...state,
			selectingIndex: index,
			spreading: false
		});
	}
	function whenClick(event) {
		onClick?.call(this, event);
		if (event.defaultPrevented) {
			return;
		}
		let spreading = !state.spreading;
		setState({
			...state,
			spreading
		});
		if (spreading) {
			whenOpen();
		}
	}
	function whenBlur(event) {
		onBlur?.call(this, event);
		if (event.defaultPrevented) {
			return;
		}
		setState({
			...state,
			spreading: false
		});
	}
	function whenTransitionEnd(event) {
		onTransitionEnd?.call(this, event);
		if (event.defaultPrevented) {
			return;
		}
		if (!state.spreading && event.target === dropdowmMenuRef.current) {
			whenClose();
		}
	}
	/* 本代码由SorryYearnt编写，转载请注明出处。This code is written by SorryYearnt. Please indicate the source for reprinting. このコードはSorryYearntによって書かれており、転載は出典を明記してください。 */
	if (!ref) {
		ref = createRef();
	}
	useEffect(() => {
		ref.current.style.setProperty('--height', window.getComputedStyle(ref.current).height);
	});
	return (
		<div tabIndex="0" {...otherProps} className={"Select" + (state.spreading ? ' Spreading' : '') + (className || '')} onBlur={whenBlur} ref={ref} style={style} onTransitionEnd={whenTransitionEnd}>
			<div className="Input" ref={inputRef} onClick={whenClick}>
				{haveSelected && newChildren.find(element => isValidElement(element) && element.type === Option && element.props.index === state.selectingIndex)}
			</div>
			<div className='Drop-downMenu' ref={dropdowmMenuRef}>
				<div className='Options' ref={optionsRef}>
					{newChildren}
				</div>
			</div>
		</div>
	);
});

const Option = forwardRef(({ index, children, onClick, whenSelected, selected, selectingRef, selecting, className, ...otherProps }, ref) => {
	function whenClick(event) {
		onClick?.call(this, event);
		if (event.defaultPrevented) {
			return;
		}
		if (typeof whenSelected === 'function') {
			whenSelected(index);
		}
	}
	useEffect(() => {
		if (selected) {
			whenSelected(index);
		}
	}, [selected]);
	useEffect(() => {
		if (ref) {
			selectingRef.current = ref.current;
		}
	});
	return (
		<div {...otherProps} className={'Option' + (selecting ? ' Selecting' : '') + (className || '')} onClick={whenClick} ref={ref || selectingRef}>
			{children}
		</div>
	);
});

export default Select;
export { Option };
