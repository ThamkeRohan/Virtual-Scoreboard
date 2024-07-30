import React from 'react'

export default function Counter({label, value, setValue}) {
    function increment() {
        setValue(prevValue => prevValue + 1)
    }
    function decrement() {
      setValue((prevValue) => prevValue - 1);
    }
  return (
    <div className="counter text-center">
      <label className="text-md">{label}</label>
      <div className="counter-input">
        <button onClick={decrement} type="button" className="counter-btn btn">
          <span className="material-symbols-outlined">remove</span>
        </button>
        <input
          className="form-input"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={increment} type="button" className="counter-btn btn">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
