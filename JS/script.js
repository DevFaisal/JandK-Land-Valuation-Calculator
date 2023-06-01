const perKanalRate = document.getElementById("perKanalRate");
const calBtn = document.getElementById("calBtn");
const kanal = document.getElementById("kanal");
const marla = document.getElementById("marla");
const sirsai = document.getElementById("sirsai");
const sQft = document.getElementById("sqft");
const gender = document.getElementById("gender");
const typeOfDeed = document.getElementById("typeOfDeed");

let result = 0;
let eStamp = 0;
let valuation = 0;

calBtn.addEventListener("click", function (event) {
    const landValues = calculateLandValues();
    const deedPercentages = getDeedPercentages(typeOfDeed.value, gender.value);
    valuation = parseInt(document.getElementById("valuation-input").value) || 0;

    console.log(valuation);

    result = landValues.kanalValue + landValues.marlaValue + landValues.sirsaiValue + landValues.sQftValue;

    let onlyLand = Math.floor(result);

    let addVal = result + valuation;
    let final = Math.floor(addVal);


    eStamp = (final * deedPercentages.percenOfEstamp) / 100;

    let totalEstampValue = roundToNearestTen(eStamp);
    let registationFee = (final * deedPercentages.percenOfReg) / 100;

    updateDOM(landValues, onlyLand, valuation, totalEstampValue, registationFee);


    event.preventDefault();

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

//Function to calculate the land values
function calculateLandValues() {
    let kanalValue = 0;
    let marlaValue = 0;
    let sirsaiValue = 0;
    let sQftValue = 0;

    const perKanalRateValue = parseFloat(perKanalRate.value);
    const kanalValueInput = parseFloat(kanal.value);
    const marlaValueInput = parseFloat(marla.value);
    const sirsaiValueInput = parseFloat(sirsai.value);
    const sQftValueInput = parseFloat(sQft.value);

    if (!isNaN(perKanalRateValue) && !isNaN(kanalValueInput)) {
        kanalValue = perKanalRateValue * kanalValueInput;
    }
    if (!isNaN(perKanalRateValue) && !isNaN(marlaValueInput)) {
        marlaValue = (perKanalRateValue / 20) * marlaValueInput;
    }
    if (!isNaN(perKanalRateValue) && !isNaN(sirsaiValueInput)) {
        sirsaiValue = (perKanalRateValue / 20 / 9) * sirsaiValueInput;
    }
    if (!isNaN(perKanalRateValue) && !isNaN(sQftValueInput)) {
        sQftValue = (perKanalRateValue / 20 / 9 / 30.25) * sQftValueInput;
    }

    return {
        kanalValue,
        marlaValue,
        sirsaiValue,
        sQftValue
    };
}


//Function for Getting the Percentage
function getDeedPercentages(typeOfDeed, gender) {
    let percenOfEstamp = 0.0;
    let percenOfReg = 0.0;

    if (typeOfDeed === "sale") {
        if (gender === "Male") {
            percenOfEstamp = 7;
            percenOfReg = 1.2;
        } else if (gender === "Female") {
            percenOfEstamp = 3;
            percenOfReg = 1.2;
        } else if (gender === "Both") {
            percenOfEstamp = 5;
            percenOfReg = 1.2;
        }
    } else if (typeOfDeed === "gift") {
        if (gender === "Male") {
            percenOfEstamp = 7;
            percenOfReg = 0.5;
        } else if (gender === "Female") {
            percenOfEstamp = 3;
            percenOfReg = 0.5;
        } else if (gender === "Both") {
            percenOfEstamp = 5;
            percenOfReg = 0.5;
        }
    }

    return {
        percenOfEstamp,
        percenOfReg
    };
}

//Function to update the DOM with calculated values
function updateDOM(landValues, onlyLand, valuation, totalEstampValue, registationFee) {
    document.getElementById("kanalOutput").innerText = kanal.value;
    document.getElementById("marlaOutput").innerText = marla.value;
    document.getElementById("sirsaiOutput").innerText = sirsai.value;
    document.getElementById("SqftOutput").innerText = sQft.value;

    if (isNaN(valuation)) {
        valuation = 0;
    }

    let totalCostOfLand = formatNumberWithCommas(onlyLand);
    let finalEstamp = formatNumberWithCommas(totalEstampValue);
    let totalResgitationFee = formatNumberWithCommas(roundToNearestTen(registationFee));
    let totalAmountToBePaid = roundToNearestTen(registationFee + totalEstampValue);
    let govtRate = parseInt(perKanalRate.value);

    document.getElementById("TotatCostLand").innerText = totalCostOfLand;
    document.getElementById("valuation").innerText = formatNumberWithCommas(valuation);
    document.getElementById("finalEstamp").innerText = finalEstamp;
    document.getElementById("govt-rate").innerText = formatNumberWithCommas(govtRate);
    document.getElementById("Registration").innerText = totalResgitationFee;
    document.getElementById("consideration").innerText = formatNumberWithCommas(onlyLand + valuation);
    document.getElementById("totalAmountPaid").innerHTML = formatNumberWithCommas(totalAmountToBePaid);
}

//Function to get the Ten if the number is near to Ten
function roundToNearestTen(number) {
    return Math.ceil(number / 10) * 10;
}

//Function for comma in Indian Currency
function formatNumberWithCommas(number) {
    return number
        .toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })
        .replace(/\.00$/, "");
}

