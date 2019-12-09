import React from 'react'
import Lottie from 'react-lottie'
import Animation from './data'

const Loader = ({ height, width, animation, className }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation ? Animation[animation] : 'SimpleLoader',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className={className} style={{ marginTop: '10px' }}>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  )
}

export default Loader
