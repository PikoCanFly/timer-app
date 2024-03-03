// ChangeHotkeys.jsx

import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';

const ChangeHotkeys = () => {
  const [hotkey, setHotkey] = useState('');

  const handleChange = (event) => {
    setHotkey(event.target.value);
  };

  const handleSave = () => {
    const settingsFilePath = path.join(__dirname, '../config/settings.json');
    const settings = { hotkey };

    fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), (err) => {
      if (err) {
        console.error('Error saving settings:', err);
      } else {
        console.log('Settings saved successfully.');
      }
    });
  };

  return (
    <div>
      <h1>Settings</h1>
      <label htmlFor="hotkey">Enter Hotkey:</label>
      <input type="text" id="hotkey" value={hotkey} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ChangeHotkeys;
