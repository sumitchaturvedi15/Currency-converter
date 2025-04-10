import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    const rate = currencyInfo[to];
    if (rate) {
      setConvertedAmount(amount * rate);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-black"
      style={{
        backgroundImage: "url('https://cdnjs.cloudflare.com/ajax/libs/images/space-stars-bg.jpg'), radial-gradient(circle, #0f172a, #020617)",
        backgroundBlendMode: "overlay"
      }} 
    >
      <div className="stars absolute inset-0 z-0"></div>
      
      <div className="w-full z-10 relative setmargin mr-1 ml-1">
        <div className="w-full max-w-md mx-auto border border-indigo-500 rounded-lg p-6 backdrop-blur-md bg-slate-900/80 shadow-lg shadow-indigo-500/20">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Currency Converter</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} 
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5 my-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-400 rounded-md bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-700 transition-colors duration-300 shadow-md shadow-indigo-500/50"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to} 
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-indigo-500/30"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;