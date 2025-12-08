import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginLayout from "./layouts/LoginLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FavoriteCars from "./pages/FavoriteCars";
import FavoriteCarInfo from "./pages/FavoriteCarInfo";
import UserManagement from "./pages/UserManagement";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        element: <LoginLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> }
        ]
    },

    {
        element: <RoleProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />,
        children: [
            {
                element: <UserLayout />,
                children: [
                    { path: "/favorite-cars", element: <FavoriteCars /> },
                    { path: "/favorite-car/:id", element: <FavoriteCarInfo /> }
                ]
            }
        ]
    },

    {
        element: <RoleProtectedRoute allowedRoles={['ROLE_ADMIN']} />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { path: "/admin/users", element: <UserManagement /> }
                ]
            }
        ]
    },

    { path: "*", element: <ErrorPage /> }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;