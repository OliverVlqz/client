import { useContext } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SingInpage from "../module/auth/SingInpage";
import AdminLayout from "../module/admin/AdminLayout";
import AuthContext from "../config/context/auth-context";
import UserPage from "../module/admin/UserPage";
import ProtectedRoute from "../module/auth/ProtectedRoute";


const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            <Route path="/" element={<AdminLayout/>} >
              <Route path="/" element={<UserPage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="admin" element={<ProtectedRoute user={user.roles[0].name}></ProtectedRoute>} />
              <Route path="user" element={<>Eres usuario</>} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<SingInpage />} />
        )}

        <Route path="/*" element={<>404 NOT FOUND</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
