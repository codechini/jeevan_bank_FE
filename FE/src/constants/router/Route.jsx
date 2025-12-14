import ApplyForCard from "../../components/ApplyForCard";
import ApplyForChequeBook from "../../components/ApplyForChequeBook";
import DepositMoney from "../../components/DepositMoney";
import Navbar from "../../components/Navbar";
import OpenAccount from "../../components/OpenAccount";
import TransferMoney from "../../components/TransferMoney";
import VerifyDocuments from "../../components/VerifyDocuments";
import WithdwawMoney from "../../components/WithdrawMoney";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import Loan from "../../pages/Loan";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import Services from "../../pages/Services";
import TermsOfService from "../../pages/TermsOfService";
import NotFound from "./NotFound";

export const ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  {
    path: "/loan",
    element: <Loan />,
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/termsofservice",
    element: <TermsOfService />
  },
  {
    path: "/depositmoney",
    element: <DepositMoney />
  },
  {
    path: "/withdrawmoney",
    element: <WithdwawMoney />
  },
  {
    path: "/transfer",
    element: <TransferMoney />
  },
  {
    path: "/card",
    element: <ApplyForCard />
  },
  {
    path: "/openaccount",
    element: <OpenAccount />
  },
  {
    path: "/applychequebook",
    element: <ApplyForChequeBook />
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/verifydocuments",
    element: <VerifyDocuments />,
  },
  {
    path: "*",
    element: <NotFound />,
  }

  // {
  //   path: "/dashboard/users",
  //   element: <ViewUser />,
  // }
];
