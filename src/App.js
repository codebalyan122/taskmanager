import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
// import TaskComponent from "./components/TaskComponent";
import Login from "./components/Login";
import {

  Route,

  Routes,
} from "react-router-dom";

import Profile from "./components/Profile";
import Protected from "./protectedRoutes";
import { useEffect, useState } from "react";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Register />,
//   },

//   {
//     path: "*",
//     element: <PageNotFound />,
//   },
//   // {
//   //   path: "/tasks",
//   //   element: <TaskComponent />,
//   // },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/profile",

//     element: (
//       <Protected>
//         <Profile />
//       </Protected>
//     ),
//   },
// ]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, [isLoggedIn]);

  return (
    <main>
      <Routes>
        <Route exact path="/" element={<Register />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Profile isLoggedIn={setIsLoggedIn} />
            </Protected>
          }
        ></Route>
      </Routes>
    </main>
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class.</h1>
//   }
// }

export default App;
