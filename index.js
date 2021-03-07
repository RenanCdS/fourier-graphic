let coordinates = {};

const POINT_INTERVAL = 0.00001;
const quantityOfPoints = 1000;
let RaNumber = 40;
let quantityOfTerms = 4;


function populateCoordinates() {
    manageEquationInfoFromForm();
    coordinates = {};
    for (let xPoint = 0; xPoint < (1 / quantityOfPoints);) {
        coordinates[xPoint] = getResultsFromEquation(xPoint, 100 * RaNumber, quantityOfTerms);
        xPoint += POINT_INTERVAL;
    }
}

function manageEquationInfoFromForm() {
    raNumber = document.querySelector('#fname').value;
    quantityOfTerms = document.querySelector('#lname').value;
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