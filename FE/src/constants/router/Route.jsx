import { lazy, Suspense } from 'react';
import DashboardWrapper from "./DashboardWrapper";
import NotFound from "./NotFound";

const Home = lazy(() => import("../../pages/Home"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage"));
const Loan = lazy(() => import("../../pages/Loan"));
const Services = lazy(() => import("../../pages/Services"));
const TermsOfService = lazy(() => import("../../pages/TermsOfService"));

const ApplyForCard = lazy(() => import("../../components/ApplyForCard"));
const ApplyForChequeBook = lazy(() => import("../../components/ApplyForChequeBook"));
const DepositMoney = lazy(() => import("../../components/DepositMoney"));
const Navbar = lazy(() => import("../../components/Navbar"));
const OpenAccount = lazy(() => import("../../components/OpenAccount"));
const TransferMoney = lazy(() => import("../../components/TransferMoney"));
const VerifyDocuments = lazy(() => import("../../components/VerifyDocuments"));
const WithdwawMoney = lazy(() => import("../../components/WithdrawMoney"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export const ROUTES = [
  {
    path: "/",
    element: <Suspense fallback={<PageLoader />}><Home /></Suspense>,
  },
  {
    path: "/login",
    element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>,
  },
  {
    path: "/register",
    element: <Suspense fallback={<PageLoader />}><RegistrationPage /></Suspense>,
  },
  {
    path: "/dashboard/*",
    element: <Suspense fallback={<PageLoader />}><DashboardWrapper /></Suspense>,
  },
  {
    path: "/loan",
    element: <Suspense fallback={<PageLoader />}><Loan /></Suspense>,
  },
  {
    path: "/services",
    element: <Suspense fallback={<PageLoader />}><Services /></Suspense>
  },
  {
    path: "/termsofservice",
    element: <Suspense fallback={<PageLoader />}><TermsOfService /></Suspense>
  },
  {
    path: "/depositmoney",
    element: <Suspense fallback={<PageLoader />}><DepositMoney /></Suspense>
  },
  {
    path: "/withdrawmoney",
    element: <Suspense fallback={<PageLoader />}><WithdwawMoney /></Suspense>
  },
  {
    path: "/transfer",
    element: <Suspense fallback={<PageLoader />}><TransferMoney /></Suspense>
  },
  {
    path: "/card",
    element: <Suspense fallback={<PageLoader />}><ApplyForCard /></Suspense>
  },
  {
    path: "/openaccount",
    element: <Suspense fallback={<PageLoader />}><OpenAccount /></Suspense>
  },
  {
    path: "/applychequebook",
    element: <Suspense fallback={<PageLoader />}><ApplyForChequeBook /></Suspense>
  },
  {
    path: "/navbar",
    element: <Suspense fallback={<PageLoader />}><Navbar /></Suspense>,
  },
  {
    path: "/verifydocuments",
    element: <Suspense fallback={<PageLoader />}><VerifyDocuments /></Suspense>,
  },
  {
    path: "*",
    element: <NotFound />,
  }


];
