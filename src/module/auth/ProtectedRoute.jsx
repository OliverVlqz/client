import { Navigate } from 'react-router-dom';
export default function ProtectedRoute(user, children,) {
        if ( user != 'ADMIN_ROLE') {
            console.log(user)
           const redirectPath = '/user';
          return <Navigate to={redirectPath} replace />;
        }
      
        return children;
      }

