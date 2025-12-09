import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginLayout from "./layouts/LoginLayout";
import AdminLayout from "./layouts/AdminLayout";
import RoleBasedLayout from "./layouts/RoleBasedLayout";

import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FavoriteCars from "./pages/FavoriteCars";
import FavoriteCarInfo from "./pages/FavoriteCarInfo";
import UserManagement from "./pages/admin/UserManagement";
import BrandRequest from "./pages/BrandRequest";
import Account from "./pages/Account";
import UserEditPage from "./pages/admin/UserEditPage";
import BrandManagement from "./pages/admin/BrandManagement";
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
                element: <RoleBasedLayout />,
                children: [
                    { path: "/favorite-cars", element: <FavoriteCars /> },
                    { path: "/favorite-car/:id", element: <FavoriteCarInfo /> },
                    { path: "/brand-request", element: <BrandRequest /> },
                    { path: "/myaccount", element: <Account /> }
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
                    { path: "/admin/userManagement", element: <UserManagement /> },
                    { path: "/admin/users/:id", element: <UserEditPage /> },
                    { path: "/admin/BrandManagement", element: <BrandManagement /> }
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