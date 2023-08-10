const otherRent = document.querySelector(".other-rent");
const rent = document.querySelector(".rent");
const typeOfDeed = document.getElementById("typeOfDeed");
const years = document.getElementById("LeaseinYears");
const Rent = document.getElementById("annualRent");
const gender = document.getElementById("gender");
const calBtn = document.getElementById("calBtn");

let regFee = 0.0;
let eStamp = 0.0;
let per = 0.0;

Rent.focus();
window.scrollTo({ top: 0, behavior: "smooth" });

typeOfDeed.addEventListener('click', function () {
    otherRent.style.display = typeOfDeed.value === "rent" ? "none" : "flex";
    rent.style.display = typeOfDeed.value === "rent" ? "flex" : "none";
});

calBtn.addEventListener('click', function () {
    const annualRent = parseInt(Rent.value);

    regFee = annualRent * 0.1 / 100;

    switch (gender.value) {
        case "Male":
            per = 0.07;
            break;
        case "Female":
            per = 0.03;
            break;
        case "Both":
            per = 0.05;
            break;
        default:
            per = 0.0;
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

    if (typeOfDeed.value === "rent" && annualRent > 0) {
        popupContainer.style.cssText = "display: flex; opacity: 1; visibility: visible;";
        backgroundOverlay.style.cssText = "display: block; opacity: 1; visibility: visible;";
    } else {
        Rent.focus();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    resetBtn.addEventListener("click", () => {
        popupContainer.style.cssText = "opacity: 0; visibility: hidden;";
        backgroundOverlay.style.cssText = "opacity: 0; visibility: hidden;";
    });

    document.getElementById("rentYear").innerText = leaseYears;
    document.getElementById("annualrentOP").innerText = formatNumberWithCommas(annualRent);
    document.getElementById("rentfinalEstamp").innerText = formatNumberWithCommas(roundToNearestTen(eStamp));
    document.getElementById("rentRegistration").innerText = formatNumberWithCommas(roundToNearestTen(regFee));
});

function roundToNearestTen(number) {
    return Math.ceil(number / 10) * 10;
}

function formatNumberWithCommas(number) {
    return number.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).replace(/\.00$/, "");
}
