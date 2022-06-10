import "./App.css";
import React, { useState, useEffect } from "react";
import "./styled.scss";
import BidLists from "./Bid_list";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function App() {
  const addSymbol = async (data) => {
    var temp = await data.symbols.slice(0, 7);
    var curr_s = [];
    for (let i = 0; i < temp.length; i++) {
      //    curr_s.push(temp[i].symbol);
      curr_s.push(temp[i].symbol);
      //  console.log(temp[i].symbol);
    }
    setSymbols(curr_s);
  };

  function toggle() {
    setOpen(!open);
    //  console.log(open);
    //  console.log(symbols[0]);
  }
  const getSymbols = async () => {
    const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const data = await response.json();

    addSymbol(data);
    //  console.log(data);
  };

  useEffect(() => {
    getSymbols();
  }, []);
  function handleClick(item) {
    symbol_update(item);
    setOpen(!open);
  }
  const [curr_symbol, symbol_update] = useState("ETHBTC");
  const [open, setOpen] = useState(false);
  const [symbols, setSymbols] = useState([]);
  return (
    <div className='App'>
      <div className='dd-wrapper'>
        <div
          tabIndex={0}
          className='dd-header'
          role='button'
          onClick={() => toggle()}
        >
          <div className='dd-header__title'>
            <p className='dd-header__title--bold'>{curr_symbol}</p>
          </div>
          <div className='dd-header__action'>
            <p>{open ? <FaArrowUp /> : <FaArrowDown />}</p>
          </div>
        </div>
        {open && (
          <ul className='dd-list'>
            {symbols.map((item) => (
              <li className='dd-list-item' key={item.id}>
                <button
                  type='button'
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <BidLists key={curr_symbol} sym={curr_symbol} />
      </div>
    </div>
  );
}

export default App;
