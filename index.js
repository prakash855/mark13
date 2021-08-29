function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = `0${date.day}`;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = `0${date.month}`;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToStr(date);

  let ddmmyyy = `${dateStr.day}${dateStr.month}${dateStr.year}`;
  let mmddyyy = `${dateStr.month}${dateStr.day}${dateStr.year}`;
  let yyyymmdd = `${dateStr.year}${dateStr.month}${dateStr.day}`;
  let ddmmyy = `${dateStr.day}${dateStr.month}${dateStr.year.slice(-2)}`;
  let mmddyy = `${dateStr.month}${dateStr.day}${dateStr.year.slice(-2)}`;
  let yymmdd = `${dateStr.year.slice(-2)}${dateStr.month}${dateStr.day}`;

  return [ddmmyyy, mmddyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  let listOfPalindromes = getAllDateFormats(date);
  let palindrome = false;
  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      palindrome = true;
      break;
    }
  }
  return palindrome;
}

function leapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 4 === 0) return true;
  if (year % 100 === 0) return false;
  return false;
}

function getNextDate(date) {
  let day = date.day + 1,
    month = date.month,
    year = date.year;

  let theDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    //   check for february
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    //   check for rest of the months
    if (day > theDayInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    //   check if it is the last day of the year
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) break;
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

const dateInput = document.querySelector("#bday_input");
const button = document.querySelector("#show_btn");
const output = document.querySelector("#output");

function palindromeHandler(e) {
  let birthdayStr = dateInput.value;
  if (birthdayStr !== "") {
    let listOfDate = birthdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    let isPalindrome = checkPalindromeForAllDateFormats(date);
    if (isPalindrome) output.innerText = "Yay! Your birthday is palindrome!";
    else {
      let [counter, nextDate] = getNextPalindromeDate(date);
      output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days!`;
    }
  }
}

button.addEventListener("click", palindromeHandler);
