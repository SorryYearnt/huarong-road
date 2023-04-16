import { useEffect, useRef } from "react";

function HTMLComment(props) {
	let placeholdingDivRef = useRef();
	useEffect(() => {
		let placeholdingDiv = placeholdingDivRef.current;
		let comment = new Comment(props.children);
		placeholdingDiv.replaceWith(comment);
		return () => {
			comment.replaceWith(placeholdingDiv);
		}
	});
	return (
		<div ref={placeholdingDivRef}></div>
	);
}

export default HTMLComment;
