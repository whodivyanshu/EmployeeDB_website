import Header from './components/Header';
import './App.css';
import Data from './components/Data';
import Main from './components/Main';
function App() {
  console.log(Data);
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
