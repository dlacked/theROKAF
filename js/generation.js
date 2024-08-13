const generationCard = document.querySelector('#generationCard');
const joinedDate = localStorage.getItem('joinedDate');
const graduateDate = localStorage.getItem('graduateDate');
const newJoinedDate = new Date(joinedDate);
const newGraduateDate = new Date(graduateDate);
let today = new Date();;

generationCard.insertAdjacentHTML('beforeend', 
	`<h1>${localStorage.getItem('generation')}</h1>
	<div class='innerProgressBar'>
		<div class='outerProgressBar'></div>
	</div>
	<div class='progress'></div>
	<!--<div class='stack'>
		<p class='pName'>다음 진급</p>
		<div class='innerProgressBar'>
			<div class='outerProgressBar'></div>
		</div>
		<div class='progress'></div>
	</div>
	<div class='stack'>
		<p class='pName'>다음 호봉</p>
		<div class='innerProgressBar'>
			<div class='outerProgressBar'></div>
		</div>
		<div class='progress'></div>
	</div>-->
	<div class='stack'>
		<p class='pName'>D+</p>
		<div class='clock'></div>
	</div>
	<div class='stack'>
		<p class='pName'>D-</p>
		<div class='clock'></div>
	</div>
	<div class='stack'>
		<p class='pName'>${today.getFullYear()}년 복무율</p>
		<div class='innerProgressBar'>
			<div class='outerProgressBar'></div>
		</div>
		<div class='progress'></div>
	</div>
	<div class='stack'>
		<p>국방시계</p>
		<div class='clock'></div>
	</div>
	`
)

const innerProgressBar = document.getElementsByClassName('innerProgressBar');
const outerProgressBar = document.getElementsByClassName('outerProgressBar');
const progress = document.getElementsByClassName('progress');

const progress1 = new SetProgress({
	startDate: joinedDate, 
	endDate: graduateDate,
	classNum: 0
});


//progress3 Algorithm 구현 완료
//입대 년도가 현재 년도와 같으면 입대 일자부터 다음 해 1월 1일까지 복무율 퍼센트를 계산
//전역 년도가 현재 년도와 같으면 현재년도 1월 1일부터 전역일자까지의 복무율 퍼센트를 계산
//이외 현재년도 1월 1일부터 다음 해 1월 1일까지 복무율 퍼센트를 계산
let progress3 = new SetProgress({
	startDate: `${today.getFullYear()}/1/1`, 
	endDate: `${today.getFullYear()+1}/1/1`,
	classNum: 1
});
if (newGraduateDate.getFullYear() === today.getFullYear()){
	progress3 = new SetProgress({
		startDate: `${today.getFullYear()}/1/1`, 
		endDate: `${newGraduateDate.getFullYear()}/${newGraduateDate.getMonth()+1}/${newGraduateDate.getDate()}`,
		classNum: 1
	});
}else if (newJoinedDate.getFullYear() === today.getFullYear()){
	progress3 = new SetProgress({
		startDate: `${newJoinedDate.getFullYear()}/${newJoinedDate.getMonth()+1}/${newJoinedDate.getDate()}`, 
		endDate: `${today.getFullYear()+1}/1/1`,
		classNum: 1
	});
}

const now = document.getElementsByClassName('clock')[0];
const left = document.getElementsByClassName('clock')[1];
const clock = document.getElementsByClassName('clock')[2];
let clockTime;
let nowTime;
let leftTime;
setInterval(() => {
	clockTime = (((today - newJoinedDate) / (newGraduateDate - newJoinedDate)*100)*24)/100;
	
	hour = Math.floor(clockTime);
	clockTime -= hour;
	minute = ((clockTime*100*60)/100).toFixed()
	if (minute == 60){
		minute = 0;
		hour += 1;
	}
	if (minute < 10){
		minute = `0${minute}`;
	}
	if (hour < 10){
		hour = `0${hour}`;
	}
	clock.innerText = `${hour}:${minute}`
	today = new Date();
	progress1.showProgress();
	progress3.showProgress();
	
	nowTime = (today - newJoinedDate);
	leftTime = (newGraduateDate - today);
	now.innerText = `${(nowTime/(8.64e+7)+1).toFixed()}`;
	left.innerText = `${(leftTime/(8.64e+7)).toFixed()}`;
})

function SetProgress (obj) {
	this.startDate = obj.startDate;
	this.endDate = obj.endDate;
	this.classNumber = obj.classNum;
}

SetProgress.prototype.showProgress = function () {
	percent = (today - new Date(this.startDate)) / (new Date(this.endDate) - new Date(this.startDate))*100;
	outerProgressBar[this.classNumber].style.width = `${percent.toFixed(7)}%`;
	progress[this.classNumber].innerText = `${percent.toFixed(7)}%`;
}