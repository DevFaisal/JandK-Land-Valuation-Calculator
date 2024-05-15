function convert(fromValue, fromUnit, toUnit) {
  let result = 0;
  let conversionFunction;

  switch (fromUnit) {
    case "kanal":
      conversionFunction = kanalCovertor;
      break;
    case "marla":
      conversionFunction = marlaConvertor;
      break;
    case "sirsai":
      conversionFunction = sirsaiConvertor;
      break;
    case "sqft":
      conversionFunction = SqftConvertor;
      break;
    default:
      break;
  }

  if (conversionFunction) {
    const convertedValues = conversionFunction(fromValue);
    result = convertedValues[toUnit];
  }

  const final = parseFloat(result).toFixed(2);
  return final;
}

function kanalCovertor(KanalValue) {
  return {
    kanal: KanalValue,
    marla: KanalValue * 20,
    sirsai: KanalValue * 180,
    sqft: KanalValue * 5445,
  };
}

function marlaConvertor(MarlaValue) {
  return {
    kanal: MarlaValue * 0.05,
    marla: MarlaValue,
    sirsai: MarlaValue * 9,
    sqft: MarlaValue * 272.25,
  };
}

function sirsaiConvertor(SirsaiValue) {
  return {
    kanal: SirsaiValue * 0.0055555555555556,
    marla: SirsaiValue * 0.11111111111111,
    sirsai: SirsaiValue,
    sqft: SirsaiValue * 30.25,
  };
}

function SqftConvertor(SqftValue) {
  return {
    kanal: SqftValue * 0.00018365472910927,
    marla: SqftValue * 0.0036730945821855,
    sirsai: SqftValue * 0.033057851239669,
    sqft: SqftValue,
  };
}

function finalConversion() {
  const fromValue = document.getElementById("fromValue").value; //1 kanal
  const fromUnit = document.getElementById("fromUnit").value; //kanal
  let toUnit = document.getElementById("fromUnit").value;
  //   console.log(fromValue, fromUnit, toUnit);
  let kanalResult = 0;
  let marlaResult = 0;
  let sirsaiResult = 0;
  let sqftResult = 0;

  if (fromUnit == "kanal") {
    kanalResult = convert(fromValue, fromUnit, toUnit);
    marlaResult = convert(fromValue, fromUnit, "marla");
    sirsaiResult = convert(fromValue, fromUnit, "sirsai");
    sqftResult = convert(fromValue, fromUnit, "sqft");
  }
  if (fromUnit == "marla") {
    kanalResult = convert(fromValue, fromUnit, "kanal");
    marlaResult = convert(fromValue, fromUnit, toUnit);
    sirsaiResult = convert(fromValue, fromUnit, "sirsai");
    sqftResult = convert(fromValue, fromUnit, "sqft");
  }
  if (fromUnit == "sirsai") {
    kanalResult = convert(fromValue, fromUnit, "kanal");
    marlaResult = convert(fromValue, fromUnit, "marla");
    sirsaiResult = convert(fromValue, fromUnit, toUnit);
    sqftResult = convert(fromValue, fromUnit, "sqft");
  }
  if (fromUnit == "sqft") {
    kanalResult = convert(fromValue, fromUnit, "kanal");
    marlaResult = convert(fromValue, fromUnit, "marla");
    sirsaiResult = convert(fromValue, fromUnit, "sirsai");
    sqftResult = convert(fromValue, fromUnit, toUnit);
  }
  console.log(kanalResult, marlaResult, sirsaiResult, sqftResult);
  document.getElementById("kanalResult").innerText = kanalResult;
  document.getElementById("marlaResult").innerText = marlaResult;
  document.getElementById("sirsaiResult").innerText = sirsaiResult;
  document.getElementById("sqftResult").innerText = sqftResult;
}
