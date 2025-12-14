import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import { ROUTES } from "./route";
import Layout from "./Layout";
import { ROUTES } from "./Route";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Route>
  )
);
