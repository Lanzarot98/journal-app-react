import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, Route, Routes } from 'react-router-dom';
import { FirebaseAuth } from '../firebase/config';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { login, logout } from '../store/auth';

import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      if( !user ) return dispatch( logout() );
      const { uid, email, displayName, photoURL } = user;

      dispatch( login({ uid, email, displayName, photoURL }) );
    })
    
  }, []);


  if( status === 'checking' ) {
    return <CheckingAuth />
  }


  return (
    <Routes>

      {
        (status === 'authenticated')
        ? <Route path="/*" element={ <JournalRoutes /> } />
        : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> } />

      {/* Login y Registro cualquier ruta que empiece por auth*/}
      {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

      {/* JournalApp cualquier ruta que empiece por cualquiera*/}
      {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
