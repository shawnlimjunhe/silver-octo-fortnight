import './App.css';
import MainPageButton from './mainPageButton';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <MainPageButton label="Explore web APIs" onClick={handleClick} />
        </div>
      </header>
    </div>
  );
}

export default App;
