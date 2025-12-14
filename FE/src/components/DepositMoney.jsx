const DepositMoney = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Deposit Money</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Enter amount to deposit"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            type="submit"
          >
            Deposit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepositMoney;