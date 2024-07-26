import React from 'react'

export default function Counter({label, value, setValue}) {
    function increment() {
        setValue(prevValue => prevValue + 1)
    }
    function decrement() {
      setValue((prevValue) => prevValue - 1);
    }
  return (
    <div className='counter'>
      <label>{label}</label>
      <div>
        <button onClick={decrement} type='button'>-</button>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={increment} type='button'>+</button>
      </div>
    </div>
  )
}
