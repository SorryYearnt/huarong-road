import React from 'react';
import ReactDOM from 'react-dom/client';

import './initialization.css';
import './index.css';

import App from './App';

console.log('本网页由SorryYearnt制作，转载请注明出处。');
console.log('This web page is produced by SorryYearnt. Please indicate the source for reprinting.');
console.log('このページはSorryYearntで作成されています。転載は出典を明記してください。');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

window.addEventListener('contextmenu', event => {
	event.preventDefault();
});

let accessStatisticsList = ['https://visitor-badge.laobi.icu/badge?page_id=SorryYearnt.huarong-road&right_color=green&left_text=Visitors', 'https://count.getloli.com/get/@SorryYearnt.huarong-road?theme=moebooru'];
accessStatisticsList.forEach(async (value, index, array) => {
	let accessStatistics = new Image();
	accessStatistics.alt = '访问统计';
	accessStatistics.unavailable = false;
	accessStatistics.index = index;
	accessStatistics.addEventListener('error', event => {
		accessStatistics.unavailable = true;
		accessStatistics.whenError?.();
	});
	await (array[index] = accessStatistics);
	accessStatistics.src = value;
});
let accessStatisticsDiv = document.getElementsByClassName('access-statistics')[0];
accessStatisticsDiv.append(accessStatisticsList[0]);
function replaceByNextAccessStatistics() {
	for (let i = this.index + 1; i < accessStatisticsList.length; i++) {
		if (!accessStatisticsList[i].unavailable) {
			accessStatisticsDiv.replaceChildren(accessStatisticsList[i]);
			accessStatisticsList[i].whenError = replaceByNextAccessStatistics;
			break;
		}
	}
}
accessStatisticsList[0].whenError = replaceByNextAccessStatistics;
