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

calBtn.addEventListener("click", function () {
    const landValues = calculateLandValues();
    const deedPercentages = getDeedPercentages(typeOfDeed.value, gender.value);

    result = landValues.kanalValue + landValues.marlaValue + landValues.sirsaiValue + landValues.sQftValue;
    let final = Math.floor(result);

    eStamp = (final * deedPercentages.percenOfEstamp) / 100;

    let totalEstampValue = roundToNearestTen(eStamp);
    let registationFee = (final * deedPercentages.percenOfReg) / 100;

    updateDOM(landValues, final, totalEstampValue, registationFee);
    console.log(landValues, final, totalEstampValue, registationFee);
});

//Function to calculate the land values
function calculateLandValues() {
    let kanalValue = perKanalRate.value * kanal.value;
    let marlaValue = (perKanalRate.value / 20) * marla.value;
    let sirsaiValue = (perKanalRate.value / 20 / 9) * sirsai.value;
    let sQftValue = (perKanalRate.value / 20 / 9 / 30.25) * sQft.value;

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
function updateDOM(landValues, final, totalEstampValue, registationFee) {
    document.getElementById("kanalOutput").innerText = kanal.value;
    document.getElementById("marlaOutput").innerText = marla.value;
    document.getElementById("sirsaiOutput").innerText = sirsai.value;
    document.getElementById("SqftOutput").innerText = sQft.value;

    let totalCostOfLand = formatNumberWithCommas(final);
    let finalEstamp = formatNumberWithCommas(totalEstampValue);
    let totalResgitationFee = formatNumberWithCommas(roundToNearestTen(registationFee));
    let totalAmountToBePaid = roundToNearestTen(registationFee + totalEstampValue);

    document.getElementById("TotatCostLand").innerText = totalCostOfLand;
    document.getElementById("finalEstamp").innerText = finalEstamp;
    document.getElementById("Registration").innerText = totalResgitationFee;
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
