document.addEventListener("DOMContentLoaded", () => {
  const perKanalRate = document.getElementById("perKanalRate");
  const calBtn = document.getElementById("calBtn");
  const kanal = document.getElementById("kanal");
  const marla = document.getElementById("marla");
  const typeOfDeed = document.getElementById("typeOfDeed");
  const sirsai = document.getElementById("sirsai");
  const sQft = document.getElementById("sqft");
  const gender = document.getElementById("gender");

  let result = 0;
  let eStamp = 0;
  let valuation = 0;

  calBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const landValues = calculateLandValues();
    const deedPercentages = getDeedPercentages(typeOfDeed.value, gender.value);
    valuation = parseInt(document.getElementById("valuation-input").value) || 0;

    result =
      landValues.kanalValue +
      landValues.marlaValue +
      landValues.sirsaiValue +
      landValues.sQftValue;

    let onlyLand = Math.floor(result);

    let addVal = result + valuation;
    let final = Math.floor(addVal);

    eStamp = (final * deedPercentages.percenOfEstamp) / 100;
    console.log(eStamp)
    let totalEstampValue = Math.round(eStamp);
    let registationFee = (final * deedPercentages.percenOfReg) / 100;
    console.log(totalEstampValue)


    if (typeOfDeed.value === "gift" && registationFee >= 10000) {
      registationFee = 10000;
    }

    updateDOM(
      landValues,
      onlyLand,
      valuation,
      totalEstampValue,
      registationFee,
    );



    let landValCheck = parseInt(perKanalRate.value) || 0;

    if (landValCheck > 0 && typeOfDeed.value != "rent") {
      popupContainer.style.display = "flex";
      backgroundOverlay.style.display = "block";
      setTimeout(() => {
        popupContainer.style.setProperty("opacity", "1");
        popupContainer.style.setProperty("visibility", "visible");
        backgroundOverlay.style.setProperty("opacity", "1");
        backgroundOverlay.style.setProperty("visibility", "visible");
      }, 300);
    } else {
      perKanalRate.focus();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
      sQftValue,
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
      percenOfReg,
    };
  }

  //Function to update the DOM with calculated values
  function updateDOM(
    landValues,
    onlyLand,
    valuation,
    totalEstampValue,
    registationFee,
  ) {

    document.getElementById("kanalOutput").innerText = kanal.value || 0;
    document.getElementById("marlaOutput").innerText = marla.value || 0;
    document.getElementById("sirsaiOutput").innerText = sirsai.value || 0;
    document.getElementById("SqftOutput").innerText = sQft.value || 0;
    const sC = document.getElementById("ServiceCharges");
    let serviceCharge = parseFloat(sC.value) || 0;

    if (isNaN(valuation)) {
      valuation = 0;
    }
    let roundStamp = roundToNearestTen(totalEstampValue)
    let totalCostOfLand = formatNumberWithCommas(onlyLand);
    let finalEstamp = formatNumberWithCommas(roundStamp);
    let totalResgitationFee = formatNumberWithCommas(
      roundToNearestTen(registationFee)
    );

    console.log("Final " + finalEstamp)
    let totalAmountToBePaid = registationFee + roundStamp + serviceCharge;
    let govtRate = parseInt(perKanalRate.value) || 0;

    document.getElementById("TotatCostLand").innerText = totalCostOfLand;
    document.getElementById("valuation").innerText =
      formatNumberWithCommas(valuation);
    document.getElementById("finalEstamp").innerText = finalEstamp;
    document.getElementById("govt-rate").innerText =
      formatNumberWithCommas(govtRate);
    document.getElementById("Registration").innerText = totalResgitationFee;
    document.getElementById("consideration").innerText = formatNumberWithCommas(
      onlyLand + valuation
    );
    document.getElementById("Charge").innerText = formatNumberWithCommas(serviceCharge);
    document.getElementById("totalAmountPaid").innerHTML =
      formatNumberWithCommas(totalAmountToBePaid);
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

  const popupContainer = document.querySelector("#all-tables");
  const backgroundOverlay = document.querySelector("#backgroundOverlay");
  const resetBtn = document.querySelector("#reset");

  resetBtn.addEventListener("click", () => {
    popupContainer.style.opacity = "0";
    popupContainer.style.visibility = "hidden";
    backgroundOverlay.style.opacity = "0";
    backgroundOverlay.style.visibility = "hidden";
  });
});


//Testing new Things here
const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", shareTableInfo);


function shareTableInfo() {
  const tableInfo = getTableInfo(); // Get the information from the tables

  if (navigator.share) { // Check if the Web Share API is supported
    navigator.share({
      title: "Table Information",
      text: tableInfo,
    })
      .then(() => console.log("Table shared successfully."))
      .catch((error) => console.error("Error sharing table:", error));
  } else {
    alert("Table sharing is not supported on this device.");
  }
}

function getTableInfo() {
  // Get the necessary values from the DOM
  const kanalValue = document.getElementById("kanalOutput").innerText;
  const marlaValue = document.getElementById("marlaOutput").innerText;
  const sirsaiValue = document.getElementById("sirsaiOutput").innerText;
  const sqftValue = document.getElementById("SqftOutput").innerText;
  const totalCostOfLand = document.getElementById("TotatCostLand").innerText;
  const valuation = document.getElementById("valuation").innerText;
  const finalEstamp = document.getElementById("finalEstamp").innerText;
  const govtRate = document.getElementById("govt-rate").innerText;
  const registration = document.getElementById("Registration").innerText;
  const consideration = document.getElementById("consideration").innerText;
  const serviceCharge = document.getElementById("Charge").innerText;
  const totalAmountPaid = document.getElementById("totalAmountPaid").innerText;

  // Construct the table information string
  const tableInfo = ` 
  *FINAL VALUATION SUMMARY*
  --------------------------------
  *Land Information*
    Kanal: ${kanalValue}
    Marla: ${marlaValue}
    Sirsai: ${sirsaiValue}
    Sqft: ${sqftValue}
  --------------------------------
  *Rates*  
    Govt Rate Per Kanal: ${govtRate}
    Total Cost of Land: ${totalCostOfLand}
    Valuation: ${valuation}
    Total Consideration: ${consideration}
  -------------------------------
  *Fees Calculation*  
    eStamp: ${finalEstamp}
    Registration Fee: ${registration}
    Service Charge : ${serviceCharge}
  --------------------------------
    *Total Amount Paid: ${totalAmountPaid}*
  `;

  return tableInfo;
}
