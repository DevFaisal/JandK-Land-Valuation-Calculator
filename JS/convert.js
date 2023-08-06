function convert() {
    const fromValue = parseFloat(document.getElementById("fromValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

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

    document.getElementById("result").innerHTML = `${fromValue} ${fromUnit} = ${final} ${toUnit}`;
}

function kanalCovertor(KanalValue) {
    return {
        kanal: KanalValue,
        marla: KanalValue * 20,
        sirsai: KanalValue * 180,
        sqft: KanalValue * 5445
    };
}

function marlaConvertor(MarlaValue) {
    return {
        kanal: MarlaValue * 0.05,
        marla: MarlaValue,
        sirsai: MarlaValue * 9,
        sqft: MarlaValue * 272.25
    };
}

function sirsaiConvertor(SirsaiValue) {
    return {
        kanal: SirsaiValue * 0.0055555555555556,
        marla: SirsaiValue * 0.11111111111111,
        sirsai: SirsaiValue,
        sqft: SirsaiValue * 30.25
    };
}

function SqftConvertor(SqftValue) {
    return {
        kanal: SqftValue * 0.00018365472910927,
        marla: SqftValue * 0.0036730945821855,
        sirsai: SqftValue * 0.033057851239669,
        sqft: SqftValue
    };
}
