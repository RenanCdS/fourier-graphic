let coordinates = {};

const POINT_INTERVAL = 0.00001;
const quantityOfPoints = 1000;
let raNumber = 40;
let quantityOfTerms = 4;

function populateCoordinates() {
    manageEquationInfoFromForm();
    coordinates = {};
    for (let xPoint = 0; xPoint < (1 / quantityOfPoints);) {
        coordinates[xPoint] = getResultsFromEquation(xPoint, 100 * raNumber, quantityOfTerms);
        xPoint += POINT_INTERVAL;
    }
    createTermElement(1, quantityOfTerms);

}

function manageEquationInfoFromForm() {
    raNumber = document.querySelector('#fname').value;
    quantityOfTerms = +document.querySelector('#lname').value - 1;
}

/**
 * @description recupera o resultado da seguinte equação 
 * f(t) = (1 / 2) + (2 * PI) * (sen(2 * PI * f * t) + (1 / 3) * (sen(2 * PI * f * t) + (1 / 5) * (sen(2 * PI * f * t) ...) 
 * onde f = 100 * RA number - por exemplo, se o RA for 40 será f = 100 * 40 = 4000
 * @param {*} xPoint 
 * @param {*} quantityOfTerms quantidade de termos da equação
 * @returns o valor de f(t)
 */
function getResultsFromEquation(xPoint, frequency, quantityOfTerms = 1) {
    let resultOfTerms = getResultsOfTerms(xPoint, frequency, quantityOfTerms);
    return 0.5 + (2 / Math.PI) * resultOfTerms;
}

/**
 * @description recupera o valor de acordo com o número de termos da equação
 * (2 * PI) * (sen(2 * PI * f * t) + (1 / 3) * (sen(2 * PI * f * t) + (1 / 5) * (sen(2 * PI * f * t) ...)
 * @param {*} xPoint 
 * @param {*} frequency 
 * @param {*} quantityOfTerms 
 * @returns 
 */
function getResultsOfTerms(xPoint, frequency, quantityOfTerms) {
    let finalResult = 0;
    for (let termNumber = 0; termNumber < quantityOfTerms; termNumber++) {
        finalResult += (1 / ((termNumber * 2) + 1)) * Math.sin(2 * Math.PI * frequency * xPoint);
    }

    return finalResult;
}

// TODO: Separar responsabildiades dessa função
function createTermElement(divisor, quantityOfTerms) {
    document.querySelector('.equation-label').classList.remove('hidden');
    const existingParenthese = document.querySelector('.parentheses');
    if (existingParenthese) {
        document.querySelector('.equation-label').removeChild(existingParenthese);
    }
    const oldTermsInHTML = document.querySelectorAll('.equation-term');
    oldTermsInHTML.forEach(oldTerm => {
        document.querySelector('.equation-label').removeChild(oldTerm);
    });

    for (var i = 0; i < quantityOfTerms; i++) {
        let dividend = (i * 2) + 1;
        const equationTerm = document.createElement('span');
        equationTerm.classList.add('equation-term');

        const divisionBlock = document.createElement('span');
        divisionBlock.classList.add('division-block');

        const plusDigit = document.createElement('span');
        plusDigit.classList.add('mr-1');
        plusDigit.textContent = ' + ';

        const divisionGroup = document.createElement('span');
        divisionGroup.classList.add('d-flex', 'flex-direction-column', 'mr-1');

        const divisorElement = document.createElement('span');
        divisorElement.classList.add('divisor');
        divisorElement.textContent = divisor;

        const dividendElement = document.createElement('span');
        dividendElement.textContent = dividend;

        divisionGroup.appendChild(divisorElement);
        divisionGroup.appendChild(dividendElement);

        const sinElement = document.createElement('span');
        sinElement.textContent = dividend + ' sen(ω0t)';

        if (i !== 0)
            divisionBlock.appendChild(plusDigit);

        divisionBlock.appendChild(divisionGroup);
        divisionBlock.appendChild(sinElement);

        equationTerm.appendChild(divisionBlock);
        document.querySelector('.equation-label').appendChild(equationTerm);
    }

    if (quantityOfTerms < 1) {
        document.querySelectorAll('.default').forEach(element => {
            element.classList.add('hidden');
        });
    } else {
        document.querySelectorAll('.default').forEach(element => {
            element.classList.remove('hidden');
        });

        const parenthesesElement = document.createElement('span');
        parenthesesElement.classList.add('parentheses');
        parenthesesElement.textContent = ' ) ';
        document.querySelector('.equation-label').appendChild(parenthesesElement);
    }

}

let createGraphic = function () {
    populateCoordinates();
    let xPoints = Object.keys(coordinates);
    let yPoints = Object.values(coordinates);

    new Chartist.Line('.ct-chart', {
        labels: xPoints,
        series: [
            yPoints
        ]
    }, {
        axisY: {
            type: Chartist.FixedScaleAxis,
            ticks: [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8],
            high: 1.8,
            low: -0.8
        },
        width: '1000px',
        height: '200px',
        fullWidth: false
    });
}

document.querySelectorAll('.mdc-text-field').forEach((element, index) => {
    new mdc.textField.MDCTextField(element);

    if (index === 0)
        element.focus();
});