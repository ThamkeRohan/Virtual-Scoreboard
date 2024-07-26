import React from 'react'
import { useSettings, useSettingsUpdate } from '../../contexts/SettingsContext';

export default function Settings() {
    const {settings} = useSettings()
    const {updateSettings} = useSettingsUpdate()

    function handleOptionChange(e) {
        updateSettings(e.target.name, e.target.value === "Yes")
    }
  return (
    <div className="settings">
      <form>
        <p>Count no ball on wicket:</p>
        <div>
          <input
            type="radio"
            id="yes"
            name="countNoBallOnWicket"
            value="Yes"
            checked={settings.countNoBallOnWicket}
            onChange={handleOptionChange}
          />
          <label htmlFor="yes">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            name="countNoBallOnWicket"
            value="No"
            checked={!settings.countNoBallOnWicket}
            onChange={handleOptionChange}
          />
          <label htmlFor="no">No</label>
        </div>
      </form>
    </div>
  );
}
