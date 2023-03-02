const h1 = document.querySelector('h1');
const form = document.querySelector('form');

const inputName = document.querySelector('#input-name');
const inputEmail = document.querySelector('#input-email');
const inputYearBorn = document.querySelector('#input-year-born');
const inpuPasswordRecovery = document.querySelector('#input-password-recovery');

const selectCities = document.querySelector('select');

const periods = document.querySelectorAll('input[type="radio"]');

const courses = document.querySelectorAll('input-[type="checkbox]');

const errorMessage = document.querySelector('.error-message');

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";

form.addEventListener('submit', (event) => {
    event.preventDefault();

    errorMessage.textContent = "";

    const age = new Date().getFullYear() - inputYearBorn.value;

    if (!inputYearBorn.value || age < 18) {
        errorMessage.textContent = "Você é menor de idade!";
        return;
    }

    const currentCity = selectCities.options[selectCities.selectedIndex].value;

    if (currentCity === "empty") {
        errorMessage.textContent = "Selecione uma cidade";
        return;
    }

    const checkedCourses = [];

    for (const course of courses) {
        if (course.checked) {
            checkedCourses.push(course.name);
        }
    }

    if (!checkedCourses.length) {
        errorMessage.textContent = "Selecione pelo menos um curso";
        return;
    }

    if (inpuPasswordRecovery.value.length < 8) {
        errorMessage.textContent = "Sua precisa ter no mínimo 8 caracteres";
        return;
    }

    let containUpperCaseLetter = false;
    let containLowerCaseLetter = false;
    let containNumbers = false;

    const passwordCaracters = inpuPasswordRecovery.value.split("");

    for (const caracter of passwordCaracters) {
        if (!containUpperCaseLetter && LETTERS.toUpperCase().indexOf(caracter) !== -1) {
            containUpperCaseLetter = true;
        }

        if (!containLowerCaseLetter && LETTERS.toLowerCase().indexOf(caracter) !== -1) {
            containLowerCaseLetter = true;
        }

        if (!containNumbers && NUMBERS.indexOf(caracter) !== -1) {
            containNumbers = true;
        }
    }

    if (!containUpperCaseLetter || !containLowerCaseLetter || !containNumbers) {
        errorMessage.textContent = "A senha deve conter letras maiúsculas, minúsculas e números.";
        return;
    }

    let currentPeriodChecked = "";

    for (const period of periods) {
        if (period.checked) {
            currentPeriodChecked = period.value;
        }
    }

    const data = {
        name: inputName.value,
        email: inputEmail.value,
        yearBorn: inputYearBorn.value,
        city: currentCity,
        courses: checkedCourses,
        inpuPasswordRecovery: inpuPasswordRecovery.value,
        period: currentPeriodChecked,
    }

    form.style.display = "none";
    h1.textContent = "Parabéns, você já está inscrito!";
});


