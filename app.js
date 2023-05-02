let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");

let dayText = document.getElementById("day-text");
let monthText = document.getElementById("month-text");
let yearText = document.getElementById("year-text");
let btn = document.getElementById("btn");

btn.onclick = function (e) {
  if (dayInput.value == "" || monthInput.value == "" || yearInput.value == "") {
    e.preventDefault();
    validate();
  } else {
    e.preventDefault();
    ageCalculate();
  }
};

function validate() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((inp) => {
    const parentInput = inp.parentElement;
    function checkInput() {
      if (inp.value == "") {
        parentInput.querySelector("small").innerHTML = "This field is required";
      } else {
        parentInput.querySelector("small").innerHTML = "";
      }
    }

    checkInput();
    inp.oninput = function (e) {
      checkInput();
    };
  });
}

function ageCalculate() {
  let dateNow = new Date();
  let dayNow = dateNow.getDay();
  let monthNow = dateNow.getMonth() + 1;
  let yearNow = dateNow.getFullYear();

  let day = dayInput.value;
  let month = monthInput.value;
  let year = yearInput.value;
  let monthNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let checker = true;

  function ageCheckBeforeCalculate() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((inp) => {
      const parentInput = inp.parentElement;
      const label = parentInput.querySelector("label");
      function notValidMsg() {
        parentInput.querySelector(
          "small"
        ).innerHTML = `Must be a valid ${label.innerHTML.toLowerCase()}`;
      }

      function validMsg() {
        parentInput.querySelector("small").innerHTML = "";
      }

      if (inp.id === "day") {
        if (
          inp.value > monthNum[month - 1] ||
          inp.value > 31 ||
          inp.value < 1
        ) {
          notValidMsg();
          checker = false;
        } else {
          validMsg();
        }
      }
      if (inp.id === "month") {
        if (inp.value > 12 || inp.value < 1) {
          notValidMsg();
          checker = false;
        } else {
          validMsg();
        }
      }
      if (inp.id === "year") {
        if (inp.value > yearNow || inp.value < 1923) {
          notValidMsg();
          checker = false;
        } else if (inp.value == yearNow) {
          if (month > monthNow) {
            notValidMsg();
            checker = false;
          } else if (month == monthNow) {
            if (day >= dayNow) {
              notValidMsg();
              checker = false;
            }
          }
        } else {
          validMsg();
        }
      }
    });
  }

  ageCheckBeforeCalculate();

  if (checker !== true) {
    return;
  }

  if (day > dayNow) {
    dayNow += monthNum[month - 1];
    monthNow -= 1;
  }

  if (month > monthNow) {
    monthNow += 12;
    yearNow -= 1;
  }

  let yearsCalc = yearNow - Number(year);
  let monthCalc = monthNow - month;
  let dayCalc = dayNow - day;

  yearText.innerHTML = yearsCalc;
  monthText.innerHTML = monthCalc;
  dayText.innerHTML = dayCalc;
}
