import { RouterProvider } from "react-router-dom";
import './App.css';
// import Login from './components/Login';
import { router } from "./constants/router/Router";

function App() {

  return (
    <>
      {/* <Login /> */}
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
