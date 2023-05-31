const perKanalRate = document.getElementById("perKanalRate");
const calBtn = document.getElementById("calBtn");
const kanal = document.getElementById("kanal");
const marla = document.getElementById("marla");
const sirsai = document.getElementById("sirsai");
const sQft = document.getElementById("sqft");
const gender = document.getElementById("gender");

let result = 0;
let eStamp = 0;

calBtn.addEventListener("click", function () {
    let kanalValue = perKanalRate.value * kanal.value;
    let marlaValue = (perKanalRate.value / 20) * marla.value;
    let sirsaiValue = (perKanalRate.value / 20 / 9) * sirsai.value;
    let sQftValue = (perKanalRate.value / 20 / 9 / 30.25) * sQft.value;

    result = kanalValue + marlaValue + sirsaiValue + sQftValue;
    let final = Math.floor(result);

    if (gender.value == "Male") {
        eStamp = (final * 7) / 100;
    } else if (gender.value == "Female") {
        eStamp = (final * 3) / 100;
    } else if (gender.value == "Both") {
        eStamp = (final * 5) / 100;
    }
    let estimateValue = roundToNearestTen(eStamp);
    let registationFee = (final * 1.2) / 100;

    document.getElementById("kanalOutput").innerText = kanal.value;
    document.getElementById("marlaOutput").innerText = marla.value;
    document.getElementById("sirsaiOutput").innerText = sirsai.value;
    document.getElementById("SqftOutput").innerText = sQft.value;
    document.getElementById("TotatCostLand").innerText =
        formatNumberWithCommas(final);
    document.getElementById("finalEstamp").innerText =
        formatNumberWithCommas(estimateValue);
    document.getElementById("Registation").innerText = formatNumberWithCommas(
        roundToNearestTen(registationFee)
    );
    document.getElementById("totalAmountPaid").innerHTML = formatNumberWithCommas(
        roundToNearestTen(registationFee + estimateValue)
    );
});




function roundToNearestTen(number) {
    return Math.ceil(number / 10) * 10;
}


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
