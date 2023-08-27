const otherRent = document.getElementsByClassName("other-rent")[0];
const rent = document.getElementsByClassName("rent")[0];
const typeOfDeed = document.getElementById("typeOfDeed");

otherRent.style.display = "flex";
rent.style.display = "none";

typeOfDeed.addEventListener('change', function () {
    if (typeOfDeed.value === "rent") {
        rent.style.display = "flex";
        otherRent.style.display = "none";
        // years.focus();

        // years.focus();
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // });

    } else {
        rent.style.display = "none";
        otherRent.style.display = "flex";
    }
});

const years = document.getElementById("LeaseinYears");
const Rent = document.getElementById("annualRent");
const gender = document.getElementById("gender");
const calBtn = document.getElementById("calBtn");


let regFee = 0.0;
let eStamp = 0.0;
let per = 0.0;

calBtn.addEventListener('click', function () {
    const annualRent = parseInt(Rent.value);

    regFee = annualRent * 0.1 / 100;

    if (gender.value === "Male") {
        per = 0.07;
    } else if (gender.value === "Female") {
        per = 0.03;
    } else if (gender.value === "Both") {
        per = 0.05;
    }

    const leaseYears = parseInt(years.value);
    if (leaseYears >= 1 && leaseYears <= 5) {
        eStamp = annualRent * 2 / 100;
    } else if (leaseYears >= 6 && leaseYears <= 10) {
        eStamp = (annualRent * 1.5) * per;
    } else if (leaseYears >= 11 && leaseYears <= 20) {
        eStamp = (annualRent * 3) * per;
    } else if (leaseYears >= 21 && leaseYears <= 29) {
        eStamp = (annualRent * 5) * per;
    } else if (leaseYears >= 30) {
        eStamp = (annualRent * 10) * per;
    }

    const popupContainer = document.querySelector("#rent-tables");
    const backgroundOverlay = document.querySelector("#backgroundOverlayNew");
    const resetBtn = document.querySelector("#Newreset");
    const sC = document.getElementById("ServiceCharges");
    let serviceCharge = parseFloat(sC.value) || 0;


    if (typeOfDeed.value == "rent" && annualRent > 0) {
        popupContainer.style.display = "flex";
        backgroundOverlay.style.display = "block";
        popupContainer.style.setProperty("opacity", "1");
        popupContainer.style.setProperty("visibility", "visible");
        backgroundOverlay.style.setProperty("opacity", "1");
        backgroundOverlay.style.setProperty("visibility", "visible");

    } else {
        years.focus();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    resetBtn.addEventListener("click", () => {
        popupContainer.style.opacity = "0";
        popupContainer.style.visibility = "hidden";
        backgroundOverlay.style.opacity = "0";
        backgroundOverlay.style.visibility = "hidden";
    });

    let finalregFee = parseInt(roundToNearestTen(regFee));

    let totalAmountToBePaid = finalregFee + serviceCharge + eStamp;


    document.getElementById("rentYear").innerText = leaseYears;
    document.getElementById("annualrentOP").innerText = formatNumberWithCommas(annualRent);
    document.getElementById("rentfinalEstamp").innerText = formatNumberWithCommas(eStamp);
    document.getElementById("rentRegistration").innerText = formatNumberWithCommas(finalregFee);
    document.getElementById("rentCharge").innerText = formatNumberWithCommas(serviceCharge);
    document.getElementById("renttotalAmountPaid").innerText = formatNumberWithCommas(totalAmountToBePaid);


    console.log("Check Result")

});







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