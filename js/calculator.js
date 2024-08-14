const card = document.querySelector('#card');
let newStartDate, newEndDate;
let today;

card.insertAdjacentHTML('beforeend', 
	`<div><input type='date' class='date' onChange='calculateDate(0)'/></div>
	<div><input type='date' class='date' onChange='calculateDate(1)'/></div>
	<div id='innerProgressBar'>
		<div id='outerProgressBar'></div>
	</div>
	<div id='progress'>0.0000000%</div>
`)


const outerProgressBar = document.getElementById('outerProgressBar');
let percent;
const calculateDate = (n) => {
	if (n === 0){
		newStartDate = new Date(document.getElementsByClassName('date')[0].value).setHours(0)
		
		
	} else{
		newEndDate = new Date(document.getElementsByClassName('date')[1].value).setHours(0)
	}
	console.log(newStartDate, newEndDate);
	if (newStartDate && newEndDate){
		const counter = setInterval(() => {
			today = new Date();
			percent = (((today - newStartDate) / (newEndDate - newStartDate))*100);
			if (percent >= 100){
				percent = 100;
				clearInterval(counter);
			} else if (percent < 0){
				percent = 0;
			}
			outerProgressBar.style.width = `${percent.toFixed(7)}%`
			progress.innerText = `${percent.toFixed(7)}%`;
		})
	}
}