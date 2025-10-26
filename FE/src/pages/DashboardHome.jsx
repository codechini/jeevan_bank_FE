import UserCount from "../components/UserCount";
import ViewUser from "../components/ViewUser";

const DashboardHome = () => {
  return (

    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-1 row-span-1">
              <UserCount />
              {/* <h1>Hello</h1> */}
            </div>
            <div className="col-span-1 row-span-1">
              {/* <ViewUser /> */}
              <p>More further metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardHome;