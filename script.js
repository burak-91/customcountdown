//input side
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const complete = document.getElementById("complete");
const dateEl = document.getElementById("date-picker");
//counter side
const countdownElement = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('reset');
const timeElements = document.querySelectorAll('span');
//finish side
const countdownComplete = document.getElementById('complete');
const countdownInfo = document.getElementById('complete-info');
const newCountdownBtn = document.getElementById('complete-button');



let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let countdownSaved;

//Time expression
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;



// Set date Input Min with Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute("min",today);

//Update the form
function updateTheFrom(e){
    e.preventDefault();

    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
   
    countdownSaved = {
        title: countdownTitle,
        date: countDownDate
    }

    localStorage.setItem("countdown", JSON.stringify(countdownSaved));
    //countdownValue
    if(countDownDate ===''){
        alert('Please choose a valid date')
    }else{
        countDownValue = new Date(countDownDate).getTime();
        
        //update DOM
        updateDOM();
    }
   

    
}

//Update DOM
function updateDOM(){

    countDownActive = setInterval(()=>{
        const now = new Date().getTime();
        const distance = countDownValue - now;
        //console.log('distance: ',distance);

        

        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/ minute);
        const seconds = Math.floor((distance % minute)/second);
    
        //console.log(days, hours, minutes, seconds);

         //hide input
         inputContainer.hidden = true;
        
        //populate countdown
        countdownTitle.textContent = `${countDownTitle}`;
        timeElements[0].textContent= `${days}`;
        timeElements[1].textContent= `${hours}`;
        timeElements[2].textContent= `${minutes}`;
        timeElements[3].textContent= `${seconds}`;
        //countdownComplete.hidden = true;


        // show countdown
        countdownElement.hidden = false;


        if(distance < 0 ){
         countdownElement.hidden = true;
         clearInterval(countDownActive);

         countdownInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
         countdownComplete.hidden =false;


        }
    },second);

    


}

//Reset All Values
function reset(){
    //hide countdowns , show input
    countdownElement.hidden = true;
    countdownComplete.hidden = true;
    inputContainer.hidden = false;
    //stop the countdown
    clearInterval(countDownActive);
    //reset values
    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
    
}

//New Countdown
function newCountDown(){
    countdownComplete.hidden =true;
    inputContainer.hidden = false;
    countdownComplete.hidden = true

}

function restorePrevious (){
    if(localStorage.getItem('countdown')){
        //inputContainer.hidden = true;
       countdownSaved = JSON.parse(localStorage.getItem('countdown'));
       countDownTitle = countdownSaved.title;
       countDownDate = countdownSaved.date;
       countDownValue = new Date(countDownDate).getTime();
       updateDOM();
    }

}

// Event listeners
countdownForm.addEventListener("submit",updateTheFrom);
countdownBtn.addEventListener("click",reset);
newCountdownBtn.addEventListener('click',newCountDown)

//on load from local storage
restorePrevious();