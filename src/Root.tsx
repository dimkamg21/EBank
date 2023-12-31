import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth/Auth";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { AuthProvider } from "./components/Auth/AuthContext";
import { CardsPage } from "./components/PersonalAccount/CardsPage/CardsPage";
import { Header } from "./components/PersonalAccount/Header/Header";
import { CardProvider } from "./components/PersonalAccount/CardContext/CardContext";
import { TransactionPage } from "./components/PersonalAccount/TransactionPage/Transaction";
import { PageNotFound } from "./components/PersonalAccount/PageNotFound/PageNotFound";
import { CashBackPage } from "./components/PersonalAccount/CashBackPage/CashBackPage";
import { TransactionsProvider } from "./components/PersonalAccount/TransactionContext/TransactionContext";

export const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <CardProvider>
        <TransactionsProvider>
          <Routes>
            <Route index element={<Auth />} />

            <Route path="program" element={<RequireAuth />}>
              <Route element={<Header />}>
                <Route index element={<CardsPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="transfer" element={<TransactionPage />} />
                <Route path="mobile-top-up" element={<CashBackPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Route>
          </Routes>
        </TransactionsProvider>
      </CardProvider>
    </AuthProvider>
  </BrowserRouter>
);
