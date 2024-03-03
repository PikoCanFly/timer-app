import { useState, useEffect } from 'react'
import InputField from './components/InputField'
import OverLayMode from './components/OverLayMode'
import Timer from './components/Timer'
import TopBar from './components/TopBar'

function App() {
  const [isOverlayMode, setIsOverlayMode] = useState(false);
  const [isChangingHotkeysm, setChangingHotkeys] = useState(false);

  const toggleOverlayMode = () => {
    setChangingHotkeys((prevState) => !prevState)

  }

  useEffect(() => {
    const handleOverlayModeToggle = () => {
      setIsOverlayMode((prevState) => !prevState)
    }

    // Listen for 'toggle-overlay-mode' message from main process
    window.api.listen('ignore-mouse', handleOverlayModeToggle)

    // Clean up listeners
    return () => {
      window.api.removeAllListeners('ignore-mouse');
    }
  }, [])

  return (
    <>
      <TopBar isOverlayMode={isOverlayMode} />
      <div className="container rounded-xl">
        <Timer isOverlayMode={isOverlayMode}></Timer>
      </div>
      
    </>
  )
}

export default App
