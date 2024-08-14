let generation = 842;
let today = new Date();
const joinedDate = ['1999-07-01', '2022-12-05', '2023-01-09', '2023-02-13', '2023-03-20', '2023-04-24', '2023-05-30', '2023-07-10', '2023-08-14', '2023-09-18', '2023-10-30', '2023-12-04', '2024-01-08', '2024-02-13', '2024-03-18', '2024-04-22', '2024-05-27', '2024-07-01', '2024-08-05', '2024-09-09', '2024-10-14', '2024-11-18', '2024-12-23'];
const graduateDate = ['1999-07-01', '2024-09-04', '2024-10-08', '2024-11-12', '2024-12-19', '2025-01-23', '2025-02-28', '2025-04-09', '2025-05-13', '2025-06-17', '2025-07-29', '2025-09-03', '2025-10-07', '2025-11-12', '2025-12-17', '2026-01-21', '2026-02-26', '2026-03-31', '2026-05-04', '2026-06-08', '2026-07-13', '2026-08-17', '2026-09-22'];
const generationTable = document.querySelector('#generationTable');
let generatedGeneration = 0;
for (let i = 0; i < joinedDate.length; i++){
	if (new Date(graduateDate[i]) > today && new Date(joinedDate[i]) <= today){
		generationTable.insertAdjacentHTML('beforeend',
			`<div class='tr' onclick='gotoInfo(${i})'>
				<div class='generationColor' ></div>
				<div class='generation'>${generation+i}</div>
				<div class='innerProgressBar'>
					<div class='outerProgressBar'></div>
				</div>
				<div class='progress'></div>
				<img id='arrow' src='./img/arrow.png' />
			</div>`
		)
	} else if (new Date(graduateDate[i]) < today) generatedGeneration++;
}

const generationColor = document.getElementsByClassName('generationColor');
const outerProgressBar = document.getElementsByClassName('outerProgressBar');

for (let i = 0; generationColor[i] !== undefined; i++){
	generationColor[i].style.backgroundColor = `rgb(${0+i*5}, ${0+i*15}, ${0+i*20})`
	outerProgressBar[i].style.backgroundColor = `rgb(${0+i*5}, ${0+i*15}, ${0+i*20})`
}


const progress = document.getElementsByClassName('progress')
let percent;

setInterval(() => {
	today = new Date();
	
	for (let i = 0; joinedDate[i] !== undefined; i++){
		if (new Date(graduateDate[i]) > today && outerProgressBar[i-generatedGeneration] !== undefined){
			percent = (today - new Date(joinedDate[i]).setHours(0)) / (new Date(graduateDate[i]).setHours(0) - new Date(joinedDate[i]).setHours(0))*100;
			outerProgressBar[i-generatedGeneration].style.width = `${percent.toFixed(7)}%`;
			progress[i-generatedGeneration].innerText = `${percent.toFixed(7)}%`;
		}
	}
})

const gotoInfo = (i) => {
	localStorage.setItem('generation', generation+i);
	localStorage.setItem('joinedDate', joinedDate[i]);
	localStorage.setItem('graduateDate', graduateDate[i]);
	location.href='./html/generation.html';
	
}