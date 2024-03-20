import React from 'react'
import NetPlayer from '../../src'

const App: React.FC = () => {
  return (
    <NetPlayer
      sources={[
          {
            file: `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`,
            label: '1080p'
          }
      ]}

      className="object-contain w-full h-full"
      autoPlay
    />
  )
}

export default App
