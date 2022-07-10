function reverseStr(str){
     let listOfChar = str.split("");
     let reverseListOfChar = listOfChar.reverse();
     let reversedStr = reverseListOfChar.join('');
     return reversedStr;
    // return str.split("").reverse().join('');
}

// console.log(reverseStr("hello"))

function isPalindrome(str){
    let reverse = reverseStr(str);
    return str===reverse
}
// console.log(isPalindrome('racecar'))
// console.log(isPalindrome('mom'))
// console.log(isPalindrome('dad'))
// console.log(isPalindrome('oppo'))
// console.log(isPalindrome('343'))
// console.log(isPalindrome('meme'))

function convertDateToStr(date){
    let dateStr = {day: '', month: '', year: ''}
    if(date.day<10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString()
    }

    if(date.month<10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }
    
    dateStr.year = date.year.toString()
    return dateStr;
}

// let date = {
//     day: 02, 
//     month: 02, 
//     year: 2022,
// }

// console.log(convertDateToStr(date))

function getAllDateFormets(date){
    var dateStr = convertDateToStr(date)
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.month + dateStr.year + dateStr.day;
    let ddmmyy   = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy   =  dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd   = dateStr.month + dateStr.year.slice(-2) + dateStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllDateFormats(date){
    let listOfPalindromes = getAllDateFormets(date);
    let flag = false;
    for(let i=0; i<listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag= true;
            break;
        }
    }
    return flag
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    let day = date.day + 1; // increment the day
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //0-11

    // check for february
     if(month === 2){
        // check for leap year 
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++; // increament  for the month
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    // check for other months
    else{ 
        // check if the day exceeds the max days in month
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    // increment the year if month is greater than 12
    if(month > 12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year,
    };
}

// get next Paliandrome
function getNextPalindromeDate(date){
   let counter = 0;
   let nextDate = getNextDate(date);

   while(1){
    counter++;
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
        break;
    }
     nextDate = getNextDate(nextDate);
 }
 return [counter, nextDate]
}

let date = {
    day: 31,
    month: 12, 
    year: 2022,
};

// // 15 aug 2021, 28 feb 2020, 31 dec 2020

//  console.log(getNextPalindromeDate(date));
//  console.log(getNextDate(date));

let dateInpute = document.getElementById("bday-input");
let showButton = document.getElementById("show-btn");
let results = document.getElementById("result")

function clickHandler(){
    let bdayStr = dateInpute.value;
    if(bdayStr !== ''){
        let listOfDate = bdayStr.split('-')
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year:  Number(listOfDate[0])
        };
        let isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
          results.innerText = 'Yay! your birthday is palindrome! 🥳'
        }else{
          let [counter, nextDate] = getNextPalindromeDate(date);

          results.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days! 😔`        }
        
    }
}

showButton.addEventListener("click", clickHandler);