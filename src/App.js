import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import Login from "./components/Login";
import Browse from "./components/Browse";
import HomePage from "./components/HomePage";
import MyFavourites from "./components/MyFavourites";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/favourites",
        element: <MyFavourites />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
