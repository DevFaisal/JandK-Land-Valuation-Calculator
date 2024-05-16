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

function UnitConversion(fromValue, fromUnit) {
  let kanalResult = convert(fromValue, fromUnit, "kanal");
  let marlaResult = convert(fromValue, fromUnit, "marla");
  let sirsaiResult = convert(fromValue, fromUnit, "sirsai");
  let sqftResult = convert(fromValue, fromUnit, "sqft");

  document.getElementById("kanalResult").innerText = kanalResult;
  document.getElementById("marlaResult").innerText = marlaResult;
  document.getElementById("sirsaiResult").innerText = sirsaiResult;
  document.getElementById("sqftResult").innerText = sqftResult;
}

function collectConversion() {
  const kanalValue = document.getElementById("kanalValue").value;
  const marlaValue = document.getElementById("marlaValue").value;
  const sirsaiValue = document.getElementById("sirsaiValue").value;
  const sqftValue = document.getElementById("sqftValue").value;

  const convertedKanalValue = kanalCovertor(kanalValue)["sqft"];
  const convertedMarlaValue = marlaConvertor(marlaValue)["sqft"];
  const convertedSirsaiValue = sirsaiConvertor(sirsaiValue)["sqft"];
  const convertedSqftValue = SqftConvertor(sqftValue)["sqft"];

  const totalSqft =
    convertedKanalValue +
    convertedMarlaValue +
    convertedSirsaiValue +
    convertedSqftValue;

  UnitConversion(totalSqft, "sqft");
}
