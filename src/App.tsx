import {useEffect} from 'react';
import usePageVisibility from './usePageVisibility';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [visibilityState, isVisible] = usePageVisibility();
  useEffect(() => {
    console.log(
      '***visibilityState',
      visibilityState,
      '***isVisible',
      isVisible()
    );
  }, [visibilityState, isVisible]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
