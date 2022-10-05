import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login y Registro cualquier ruta que empiece por auth*/}
        <Route path="/auth/*" element={ <AuthRoutes /> } />

        {/* JournalApp cualquier ruta que empiece por cualquiera*/}
        <Route path="/*" element={ <JournalRoutes /> } />

    </Routes>
  )
}
