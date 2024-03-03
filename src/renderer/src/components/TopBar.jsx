import React from 'react';
import OverLayMode from './OverLayMode';


export default function TopBar({isOverlayMode}) {
  

  const handleClose = () => {
    console.log("Close button clicked");
    window.api.closeWindow();
  };

  const handleMinimize = () => {
    window.api.minimizeWindow();
  }
  return (
    <div className={!isOverlayMode?'relative visible':'invisible'}>
      <div className="bg-blue-400 rounded-t-xl flex justify-between w-screen h-5" style={{ WebkitAppRegion: "drag", zIndex: -50 }}></div>
      <div className="bg-blue-400 flex justify-between w-screen h-4 " style={{  zIndex: -50 }}>
      </div>
      <div className="control-buttons flex items-center justify-end" style={{ position: 'absolute', top: 0, right: 0, zIndex: 10, pointerEvents:"auto" }}>
        <button id="minimize" className='text-stone-200 pb-3 pr-1 text-lg hover:text-stone-50' onClick={handleMinimize}>&#128469;</button>
        <button id="close" className='text-stone-200 pr-1 hover:text-stone-50' onClick={handleClose}>&#10006;</button>
    
      </div>
      {/* <button id="overlay-button"className="control-buttons flex items-center justify-start text-stone-200 p-2 text-lg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, pointerEvents:"auto" }}>
      &#9881;
      </button> */}
    </div>
  );
}

