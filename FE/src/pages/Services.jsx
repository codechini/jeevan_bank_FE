const Services = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Deposit</h2>
          <p className="text-gray-600">
            Securely deposit your money with our trusted banking services. With us, your funds are always safe.
          </p>
          <a href="/depositmoney" target="" rel="noopener noreferrer">
            <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
              Deposit
            </button>
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Withdraw</h2>
          <p className="text-gray-600">
            Easily withdraw your funds anytime, anywhere with our flexible options.
          </p>
          <a href="/withdrawmoney" target="" rel="noopener noreferrer">
            <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
              Withdraw
            </button>
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Transfer</h2>
          <p className="text-gray-600">
            Transfer money quickly and securely to anyone, both locally and internationally.
          </p>
          <a href="/transfer" target="" rel="noopener noreferrer">
            <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
              Transfer
            </button>
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Loan</h2>
          <p className="text-gray-600">
            Apply for loans with competitive rates and flexible repayment plans.
          </p>
          <a href="/loan" target="" rel="noopener noreferrer">
            <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
              Apply
            </button>
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Credit/Debit Card</h2>
          <p className="text-gray-600">
            Apply for Credit or Debit cards with attractive benefits and rewards.
          </p>
          <a href="/card" target="" rel="noopener noreferrer">
            <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
              Apply for Card
            </button>
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Account</h2>
          <p className="text-gray-600">
            Join our bank today and enjoy our wide range of services.
          </p>
          <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
            <a href="/openaccount" target="" rel="noopener noreferrer">Open</a>
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Cheque Book</h2>
          <p className="text-gray-600">
            Apply for a cheque book with ease and convenience.
          </p>
          <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
            <a href="/applychequebook" target="" rel="noopener noreferrer">Apply for Cheque Book</a>
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Verify Documents</h2>
          <p className="text-gray-600">
            Upload your documents for verification.
          </p>
          <button className="w-full mt-4 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
            <a href="/verifydocuments" target="" rel="noopener noreferrer">Verify Documents</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;