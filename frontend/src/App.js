import logo from './logo.svg';
import './App.css';
import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';

function App() {
  return (
    <div className="App">
      <CreateRule />
      <EvaluateRule />
    </div>
  );
}

export default App;
