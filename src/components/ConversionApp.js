import React, { useState } from "react";
import "./styles.css";

const ConversionCalculator = () => {
  const [conversionType, setConversionType] = useState("kmToMi");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [savedConversions, setSavedConversions] = useState([]);

  const handleConversionTypeChange = (event) => {
    setConversionType(event.target.value);
    setInputValue("");
    setResult("");
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    convertValue(value);
  };

  const convertValue = (value) => {
    if (value === "") {
      setResult("");
      return;
    }

    let convertedValue;
    let originalUnit, convertedUnit;

    switch (conversionType) {
      case "kmToMi":
        convertedValue = parseFloat(value) * 0.621371;
        originalUnit = "km";
        convertedUnit = "miles";
        break;
      case "miToKm":
        convertedValue = parseFloat(value) * 1.60934;
        originalUnit = "miles";
        convertedUnit = "km";
        break;
      case "ftToM":
        convertedValue = parseFloat(value) * 0.3048;
        originalUnit = "feet";
        convertedUnit = "metres";
        break;
      case "mToFt":
        convertedValue = parseFloat(value) * 3.28084;
        originalUnit = "metres";
        convertedUnit = "feet";
        break;
      case "cmToIn":
        convertedValue = parseFloat(value) * 0.393701;
        originalUnit = "cm";
        convertedUnit = "inches";
        break;
      case "inToCm":
        convertedValue = parseFloat(value) * 2.54;
        originalUnit = "inches";
        convertedUnit = "cm";
        break;
      default:
        convertedValue = "";
        originalUnit = "";
        convertedUnit = "";
    }

    setResult(`${convertedValue.toFixed(2)} ${convertedUnit}`);
  };

  const saveConversion = () => {
    if (result !== "") {
      let convertedType;
      switch (conversionType) {
        case "kmToMi":
          convertedType = `${inputValue} km -> ${result}`;
          break;
        case "miToKm":
          convertedType = `${inputValue} miles -> ${result} `;
          break;
        case "ftToM":
          convertedType = `${inputValue} feet -> ${result}`;
          break;
        case "mToFt":
          convertedType = `${inputValue} metros -> ${result}`;
          break;
        case "cmToIn":
          convertedType = `${inputValue} centímetros -> ${result}`;
          break;
        case "inToCm":
          convertedType = `${inputValue} pulgadas -> ${result}`;
          break;
        default:
          convertedType = "";
      }
  
      const conversion = {
        originalValue: inputValue,
        convertedValue: result,
        type: convertedType,
      };
  
      setSavedConversions([...savedConversions, conversion]);
      setInputValue("");
      setResult("");
    }
  };

  const deleteConversion = (index) => {
    const updatedConversions = [...savedConversions];
    updatedConversions.splice(index, 1);
    setSavedConversions(updatedConversions);
  };

  const swapValues = () => {
    setInputValue(result);
    setResult(inputValue);
  };

  return (
    <div>
      <div className="titulo-linea" >        
      <h1 className="titulo">&#8646; unit converter</h1></div>
      <div className="container">
        <h2>convert</h2>

        <div className="input-container">
          <div className="select-container">          <select value={conversionType} onChange={handleConversionTypeChange}>
            <option value="kmToMi">km &rarr; miles</option>
            <option value="miToKm">miles 	&rarr; km</option>
            <option value="ftToM">feet 	&rarr; metres</option>
            <option value="mToFt">metres 	&rarr; feet</option>
            <option value="cmToIn">cm 	&rarr; inches</option>
            <option value="inToCm">inches 	&rarr; cm</option>
          </select>
          </div>
          <button className="swap-button" onClick={swapValues}>&#8646;</button>
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </div>
        <div className="result">{result}</div>
        <button className="save-button" onClick={saveConversion}>
          ❤
        </button>
      </div>
      <div className="container-conversion">
        <ul className="saved-conversions">
          {savedConversions.map((conversion, index) => (
            <li key={index} className="saved-conversion">
              <span className="saved-conversion-text">{conversion.type}</span>
              <button
                className="saved-conversion-delete"
                onClick={() => deleteConversion(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConversionCalculator;
