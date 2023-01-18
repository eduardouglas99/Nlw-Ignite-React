import './styles/global.css';
import './App.css'
import { Habit } from './components/Habits';

function App() {

  return (
    <div className="App">
      <Habit completed={3}/>
    </div>
  )
}

export default App
