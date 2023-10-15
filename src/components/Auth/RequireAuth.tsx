import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthContext';


export const RequireAuth = () => {
  const { authorized } = useContext(AuthContext);

  if (!authorized) {
    return <Navigate to="/" />
  }

  return <Outlet />
};
// import { Navigate, useNavigate } from 'react-router-dom'
// import { AuthContext } from './AuthContext';


// export const RequireAuth = () => {
//   const { authorized } = useContext(AuthContext);

//   const navigate = useNavigate();

//   if (!authorized) {
//     return <Navigate to="/" />
//   }

//   console.log(document.URL);


//   navigate('/program/menu');
//   // return <Navigate to="/program/menu" />
// }
