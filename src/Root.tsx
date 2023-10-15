import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './components/Auth/Auth';
import { RequireAuth } from './components/Auth/RequireAuth';
import { AuthProvider } from './components/Auth/AuthContext';
// import { AccountApp } from './components/PersonalAccount/AccountApp/AccountApp';
import { CardsPage } from './components/PersonalAccount/CardsPage/CardsPage';
import { Header } from './components/PersonalAccount/Header/Header';
import { CardProvider } from './components/PersonalAccount/CardContext/CardContext';

export const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <CardProvider> {/* Додайте CardProvider */}
        <Routes>
          <Route index element={<Auth />} />

          <Route path="program" element={<RequireAuth />}>
            <Route element={<Header />}>
              <Route index element={<CardsPage />} />
            </Route>
          </Route>
        </Routes>
      </CardProvider>
    </AuthProvider>
  </BrowserRouter>
);