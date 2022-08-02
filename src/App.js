import "./styles/App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import MyInput from "./components/UI/Input/MyInput";
import MySelect from "./components/UI/Select/MySelect";

function App() {
  const [value, setValue] = useState([]);
  const getCurrency = async () => {
    const response = await axios.get(process.env.REACT_APP_CURRENCY_API);
    setValue(response.data);
  };

  const recalculateCurrency = (e, currency, type) => {
    if (currency === "UAH") {
      if (type === 1) {
        if (currFrom === "UAH") return setCalcFrom(e);
        if (currFrom === "USD")
          return setCalcFrom((e / Number(value[0]?.buy)).toFixed(2));
        if (currFrom === "EUR")
          return setCalcFrom((e / Number(value[1]?.buy)).toFixed(2));
      } else if (type === 2) {
        if (currTo === "UAH") return setCalcTo(e);
        if (currTo === "USD")
          return setCalcTo((e / Number(value[0]?.buy)).toFixed(2));
        if (currTo === "EUR")
          return setCalcTo((e / Number(value[1]?.buy)).toFixed(2));
      }
    }
    if (currency === "USD") {
      if (type === 1) {
        if (currFrom === "UAH")
          return setCalcFrom((e * Number(value[0]?.buy)).toFixed(2));
        if (currFrom === "USD") return setCalcFrom(e);
        if (currFrom === "EUR")
          return setCalcFrom(
            (Number(value[0]?.buy) / Number(value[1]?.buy)).toFixed(2) * e
          );
      } else if (type === 2) {
        if (currTo === "UAH")
          return setCalcTo((e * Number(value[0]?.buy)).toFixed(2));
        if (currTo === "USD") return setCalcTo(e);
        if (currTo === "EUR")
          return setCalcTo(
            (Number(value[0]?.buy) / Number(value[1]?.buy)).toFixed(2) * e
          );
      }
    }
    if (currency === "EUR") {
      if (type === 1) {
        if (currFrom === "UAH")
          return setCalcFrom((e * Number(value[1]?.buy)).toFixed(2));
        if (currFrom === "USD")
          return setCalcFrom(
            (Number(value[1]?.buy).toFixed(2) / Number(value[0]?.buy)).toFixed(
              2
            ) * e
          );
        if (currFrom === "EUR") return setCalcFrom(e);
      } else if (type === 2) {
        if (currTo === "UAH")
          return setCalcTo((e * Number(value[1]?.buy)).toFixed(2));
        if (currTo === "USD")
          return setCalcTo(
            (Number(value[1]?.buy).toFixed(2) / Number(value[0]?.buy)).toFixed(
              2
            ) * e
          );
        if (currTo === "EUR") return setCalcTo(e);
      }
    }
  };

  const [currFrom, setCurrFrom] = useState("UAH");
  const changeCurrencyFrom = (value) => {
    setCurrFrom(value);
    recalculateCurrency(calcFrom, value, 2);
  };

  const [currTo, setCurrTo] = useState("UAH");
  const changeCurrencyTo = (value) => {
    setCurrTo(value);
    recalculateCurrency(calcTo, value, 1);
  };

  const [calcFrom, setCalcFrom] = useState("0");
  const [calcTo, setCalcTo] = useState("0");
  const calculateCurrencyFrom = (e) => {
    if (currFrom === "UAH" && currTo === "USD") {
      setCalcFrom(e);
      setCalcTo((e / Number(value[0]?.buy)).toFixed(2));
    } else if (currFrom === "UAH" && currTo === "EUR") {
      setCalcFrom(e);
      setCalcTo((e / Number(value[1]?.buy)).toFixed(2));
    } else if (currFrom === "UAH" && currTo === "UAH") {
      setCalcFrom(e);
      setCalcTo(e);
    }
    if (currFrom === "USD" && currTo === "USD") {
      setCalcFrom(e);
      setCalcTo(e);
    } else if (currFrom === "USD" && currTo === "EUR") {
      setCalcFrom(e);
      setCalcTo((Number(value[0]?.buy) / Number(value[1]?.buy)).toFixed(2) * e);
    } else if (currFrom === "USD" && currTo === "UAH") {
      setCalcFrom(e);
      setCalcTo((e * Number(value[0]?.buy)).toFixed(2));
    }
    if (currFrom === "EUR" && currTo === "USD") {
      setCalcFrom(e);
      setCalcTo(
        (Number(value[1]?.buy).toFixed(2) / Number(value[0]?.buy)).toFixed(2) *
          e
      );
    } else if (currFrom === "EUR" && currTo === "EUR") {
      setCalcFrom(e);
      setCalcTo(e);
    } else if (currFrom === "EUR" && currTo === "UAH") {
      setCalcFrom(e);
      setCalcTo((e * Number(value[1]?.buy)).toFixed(2));
    }
  };

  const calculateCurrencyTo = (e) => {
    if (currFrom === "UAH" && currTo === "USD") {
      setCalcTo(e);
      setCalcFrom((e * Number(value[0]?.buy)).toFixed(2));
    } else if (currFrom === "UAH" && currTo === "EUR") {
      setCalcTo(e);
      setCalcFrom((e * Number(value[1]?.buy)).toFixed(2));
    } else if (currFrom === "UAH" && currTo === "UAH") {
      setCalcTo(e);
      setCalcFrom(e);
    }

    if (currFrom === "USD" && currTo === "USD") {
      setCalcTo(e);
      setCalcFrom(e);
    } else if (currFrom === "USD" && currTo === "EUR") {
      setCalcTo(e);
      setCalcFrom(
        (Number(value[1]?.buy) / Number(value[0]?.buy)).toFixed(2) * e
      );
    } else if (currFrom === "USD" && currTo === "UAH") {
      setCalcTo(e);
      setCalcFrom((e / Number(value[0]?.buy)).toFixed(2));
    }

    if (currFrom === "EUR" && currTo === "USD") {
      setCalcTo(e);
      setCalcFrom(
        (Number(value[0]?.buy).toFixed(2) / Number(value[1]?.buy)).toFixed(2) *
          e
      );
    } else if (currFrom === "EUR" && currTo === "EUR") {
      setCalcFrom(e);
      setCalcTo(e);
    } else if (currFrom === "EUR" && currTo === "UAH") {
      setCalcTo(e);
      setCalcFrom((e / Number(value[1]?.buy)).toFixed(2));
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);
  return (
    <div className="App p-5 bg-light border rounded-3">
      <h1 className="title">Курс валют</h1>
      <div className="top_content border">
        1 USD = {Number(value[0]?.buy).toFixed(2)} UAH <br />1 EUR ={" "}
        {Number(value[1]?.buy).toFixed(2)} UAH <br />
        <Moment format="YYYY-MM-DD HH:mm" interval={1000} />
      </div>
      <br />

      <div className="mid_content">
        <MyInput
          value={calcFrom}
          min="0"
          type="number"
          placeholder="0.00"
          onChange={(e) => calculateCurrencyFrom(e.target.value)}
        />
        <MySelect
          options={["UAH", "USD", "EUR"]}
          changeCurrency={changeCurrencyFrom}
        />
        <h1>=</h1>
        <MyInput
          value={calcTo}
          min="0"
          type="number"
          placeholder="0.00"
          onChange={(e) => calculateCurrencyTo(e.target.value)}
        />
        <MySelect
          options={["UAH", "USD", "EUR"]}
          changeCurrency={changeCurrencyTo}
        />
      </div>
    </div>
  );
}

export default App;
