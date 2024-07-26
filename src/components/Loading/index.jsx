import React from 'react'

export default function Loading() {
  return (
    <div className='loading'>
      <img src={`${window.location.origin}/assets/loaders/spinner.gif`} alt="spinner" />
    </div>
  )
}
