import UserCount from "../components/UserCount";
import TotalAccounts from "../components/TotalAccounts";
import AccountsBreakdown from "../components/AccountsBreakdown";
import PendingLoans from "../components/PendingLoans";
import TotalDisbursed from "../components/TotalDisbursed";
import PendingCards from "../components/PendingCards";
import PendingChequebooks from "../components/PendingChequebooks";

const DashboardHome = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <UserCount />
            <TotalAccounts />
            <AccountsBreakdown />
            <PendingLoans />
            <TotalDisbursed />
            <PendingCards />
            <PendingChequebooks />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardHome;