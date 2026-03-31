
import './App.css'
import Header from "../Header/Header.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <div className="page__content"><Header></Header> </div>
    </div>
  )
}

export default App
