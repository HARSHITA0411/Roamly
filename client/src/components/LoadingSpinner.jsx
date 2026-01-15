import React from 'react'

const LoadingSpinner = ({ white = true }) => (
  <div className={`spinner ${white ? '' : 'spinner-orange'}`} />
)

export default LoadingSpinner
