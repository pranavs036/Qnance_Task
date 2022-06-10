import "./App.css";
import React, { useState, useEffect } from "react";

function BidLists(props) {
  const getData = async () => {
    const url =
      "https://api.binance.com/api/v3/depth?symbol=" + props.sym + "&limit=10";
    const url2 =
      "https://api.binance.com/api/v3/ticker/price?symbol=" + props.sym;
    const response = await fetch(url);
    const response2 = await fetch(url2);
    const data = await response.json();
    const data2 = await response2.json();
    setBids(data.bids);
    setAsks(data.asks);
    setPrice(data2.price);
  };
  useEffect(() => {
    getData();
  }, []);
  const [curr_bids, setBids] = useState(sample);
  const [curr_asks, setAsks] = useState(sample);
  const [price, setPrice] = useState(0.0592);
  return (
    <div>
      <div className='list-body'>
        <div className='list-tile'>Price{"(" + props.sym + ")"}</div>
        <div className='list-tile'>Quantity{"(" + props.sym + ")"}</div>
        <div className='list-tile'>Amount</div>
      </div>
      {curr_asks.map((item) => (
        <div className='list-body'>
          <div className='list-tile0'>{parseFloat(item[0]).toFixed(4)}</div>
          <div className='list-tile1'>{parseFloat(item[1]).toFixed(4)}</div>
          <div className='list-tile1'>
            {parseFloat(item[0] * item[1]).toFixed(4)}
          </div>
        </div>
      ))}
      <div className='list-price'>{parseFloat(price).toFixed(6)}</div>
      {curr_bids.map((item) => (
        <div className='list-body'>
          <div className='list-tile5'>{parseFloat(item[0]).toFixed(4)}</div>
          <div className='list-tile1'>{parseFloat(item[1]).toFixed(4)}</div>
          <div className='list-tile1'>
            {parseFloat(item[0] * item[1]).toFixed(4)}
          </div>
        </div>
      ))}
    </div>
  );
}
var sample = [
  ["0.05940900", "41.29250000"],
  ["0.05940800", "30.87740000"],
  ["0.05940400", "0.16380000"],
  ["0.05940000", "0.84180000"],
  ["0.05939900", "4.98500000"],
  ["0.05939800", "0.85280000"],
  ["0.05939700", "5.69170000"],
  ["0.05939600", "2.44810000"],
  ["0.05939500", "0.09000000"],
  ["0.05939400", "0.02500000"],
];
export default BidLists;
