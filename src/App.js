import './App.css';
import { useState } from 'react';
import Weather from './pages/weather';
import UserConsent from "./components/userConsent";
import TempToColorConverterService from './services/tempToColorConverterService';

function App() {
  const [userAgreed, setUserAgreed] = useState(null);
  const [temp, setTemp] = useState();

  const getColor = () => {
    return TempToColorConverterService.getColor(temp);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: getColor(temp) }}>
        {userAgreed === null && <UserConsent setUserAgreed={setUserAgreed} />}
        {userAgreed &&
            <Weather temp={temp} setTemp={setTemp} />
        }
        {userAgreed === false && <h1>I hope you'll change your mind soon.</h1>}
      </header>
    </div>
  );
}

export default App;
