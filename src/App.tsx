import './App.css'
import NavBar from './components/navbar/NavBar'
import Testing from './pages/testing/Testing'

function App() {

  return (
    <>
      <div>
        <NavBar/>
        <h1 className='text-3xl font-bold'>admin dashboard</h1>
        <Testing/>
      </div>
    </>
  )
}

export default App
