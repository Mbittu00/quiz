import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./page/home/Home";
import { Create } from "./page/create/Create";
import { useEffect } from "react";
import { v4 } from "uuid";
import { Review } from "./page/review/Review";
import { Play } from "./page/play/Play";

const router = createBrowserRouter([
   { path: "/", element: <Home /> },
  {
    path: "/create/:id",
    element: <Create />,
  },{
    path:"/review/:id",
    element:<Review/>
  },{
    path:"/play/:id",
    element:<Play/>
  }
]);
function App() {
  useEffect(() => {
    let uid = localStorage.getItem("uid");
    if (uid == null) {
      localStorage.setItem("uid", v4());
    }
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
