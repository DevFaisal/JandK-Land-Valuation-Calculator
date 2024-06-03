function convert(fromValue, fromUnit, toUnit) {
  let conversionFunction;

  switch (fromUnit) {
    case "kanal":
      conversionFunction = kanalConverter;
      break;
    case "marla":
      conversionFunction = marlaConverter;
      break;
    case "sirsai":
      conversionFunction = sirsaiConverter;
      break;
    case "sqft":
      conversionFunction = sqftConverter;
      break;
    default:
      throw new Error("Unsupported unit");
  }

  if (conversionFunction) {
    const convertedValues = conversionFunction(fromValue);
    if (convertedValues[toUnit] === undefined) {
      throw new Error("Conversion to target unit not supported");
    }
    return parseFloat(convertedValues[toUnit]).toFixed(2);
  }

  throw new Error("Conversion function not found");
}

function kanalConverter(kanalValue) {
  return {
    kanal: kanalValue,
    marla: kanalValue * 20,
    sirsai: kanalValue * 180,
    sqft: kanalValue * 5445,
  };
}

function marlaConverter(marlaValue) {
  return {
    kanal: marlaValue * 0.05,
    marla: marlaValue,
    sirsai: marlaValue * 9,
    sqft: marlaValue * 272.25,
  };
}

function sirsaiConverter(sirsaiValue) {
  return {
    kanal: sirsaiValue * 0.0055555555555556,
    marla: sirsaiValue * 0.11111111111111,
    sirsai: sirsaiValue,
    sqft: sirsaiValue * 30.25,
  };
}

function sqftConverter(sqftValue) {
  return {
    kanal: sqftValue * 0.00018365472910927,
    marla: sqftValue * 0.0036730945821855,
    sirsai: sqftValue * 0.033057851239669,
    sqft: sqftValue,
  };
}

function unitConversion(fromValue, fromUnit) {
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
  const kanalValue =
    parseFloat(document.getElementById("kanalValue").value) || 0;
  const marlaValue =
    parseFloat(document.getElementById("marlaValue").value) || 0;
  const sirsaiValue =
    parseFloat(document.getElementById("sirsaiValue").value) || 0;
  const sqftValue = parseFloat(document.getElementById("sqftValue").value) || 0;

  const convertedKanalValue = kanalConverter(kanalValue).sqft;
  const convertedMarlaValue = marlaConverter(marlaValue).sqft;
  const convertedSirsaiValue = sirsaiConverter(sirsaiValue).sqft;
  const convertedSqftValue = sqftConverter(sqftValue).sqft;

  const totalSqft =
    convertedKanalValue +
    convertedMarlaValue +
    convertedSirsaiValue +
    convertedSqftValue;

  unitConversion(totalSqft, "sqft");
}
