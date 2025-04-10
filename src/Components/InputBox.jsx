import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-gray-900 bg-opacity-80 p-4 rounded-lg text-sm flex border border-indigo-500/30 backdrop-blur-sm shadow-lg shadow-indigo-500/20 ${className}`}
    >
      <div className="w-1/2">
        {label && (
          <label
            htmlFor={amountInputId}
            className="text-indigo-300 mb-2 inline-block font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5 text-gray-100 border-b border-indigo-500/40 focus:border-indigo-400 transition-colors placeholder-gray-500"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-indigo-300 mb-2 w-full font-medium">Currency Type</p>
        <select
          className="rounded-lg px-3 py-1.5 bg-gray-800 text-gray-100 cursor-pointer outline-none border border-indigo-500/40 focus:border-indigo-400 hover:bg-gray-700 transition-colors"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency} className="bg-gray-800">
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
