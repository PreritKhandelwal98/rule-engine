import logo from './logo.svg';
import './App.css';
import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRule';

function App() {
  return (
    <div className="App">
      <CreateRule />
      <EvaluateRule />
      <CombineRules />
    </div>
  );
}

export default App;
