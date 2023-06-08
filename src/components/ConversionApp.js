import React, { useState } from "react";
import "./styles.css";

const ConversionApp = () => {
  const [conversionType, setConversionType] = useState("kmToMiles");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [savedConversions, setSavedConversions] = useState([]);

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
    setInputValue("");
    setResult("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const convertedValue = convert(value, conversionType);
    setResult(convertedValue);
  };

  const convert = (value, type) => {
    switch (type) {
      case "kmToMiles":
        return (value * 0.621371).toFixed(2);
      case "milesToKm":
        return (value * 1.60934).toFixed(2);
      case "feetToMeters":
        return (value * 0.3048).toFixed(2);
      case "metersToFeet":
        return (value * 3.28084).toFixed(2);
      case "cmToInches":
        return (value * 0.393701).toFixed(2);
      case "inchesToCm":
        return (value * 2.54).toFixed(2);
      default:
        return "";
    }
  };

  const saveConversion = () => {
    const savedConversion = {
      type: conversionType,
      input: inputValue,
      result: result,
    };
    setSavedConversions([...savedConversions, savedConversion]);
    setInputValue("");
    setResult("");
  };

  const deleteConversion = (index) => {
    const updatedConversions = [...savedConversions];
    updatedConversions.splice(index, 1);
    setSavedConversions(updatedConversions);
  };

  const swapConversion = () => {
    setInputValue(result);
    setResult(inputValue);
  };

  return (
    <div className="container">
      <h1>convert</h1>
      <div className="content">
        <div className="input-select-wrapper">
          <select
            className="select"
            value={conversionType}
            onChange={handleConversionTypeChange}
          >
            <option value="kmToMiles">Kilómetros a Millas</option>
            <option value="milesToKm">Millas a Kilómetros</option>
            <option value="feetToMeters">Pies a Metros</option>
            <option value="metersToFeet">Metros a Pies</option>
            <option value="cmToInches">Centímetros a Pulgadas</option>
            <option value="inchesToCm">Pulgadas a Centímetros</option>
          </select>
          <button className="swap-button" onClick={swapConversion}>
          &#8646;
          </button>
          <input
            className="input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="result">{result}</div>
        </div>
        <button className="save-button" onClick={saveConversion}>
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </button>
      </div>
      <h2>saved</h2>
      <ul>
        {savedConversions.map((conversion, index) => (
          <li key={index}>
            {conversion.input} {conversion.type === conversionType ? "=" : "↔"}{" "}
            {conversion.result}{" "}
            <button onClick={() => deleteConversion(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversionApp;
