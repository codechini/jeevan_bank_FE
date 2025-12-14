import { RouterProvider } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import { router } from "./constants/router/Router";

function App() {

  return (
    <>
      {/* <div className="App">
        <Navbar />
        <RouterProvider router={router} />
      </div> */}

      <div className="App">
        <RouterProvider router={router} >
          <Navbar />
        </RouterProvider>
      </div>

    </>
  )
}

export default App
