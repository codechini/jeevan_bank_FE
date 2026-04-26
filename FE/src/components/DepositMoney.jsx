import { useEffect, useState } from "react";

const DepositMoney = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [accountError, setAccountError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/accounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const data = await response.json();
        console.log("Accounts API Response:", data);

        if (response.ok && data.success) {
          setAccounts(data.data || []);
          console.log("Accounts loaded:", data.data);
        } else {
          setAccountError(data.message || "Failed to fetch accounts");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setAccountError("Error fetching accounts");
      } finally {
        setFetchingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!selectedAccount) {
      setFormError("Please select an account");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setFormError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/accounts/${selectedAccount}/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            description: description,
          }),
        }
      );

      const result = await response.json();
      console.log("Deposit API Response:", result);

      if (response.ok && result.success) {
        console.log("Deposit successful:", result);
        alert("Deposit successful!");
        setSelectedAccount("");
        setAmount("");
        setDescription("");
      } else {
        setFormError(result.message || "Deposit failed");
        alert(`Deposit failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setFormError("Error during deposit");
      alert("An error occurred during deposit.");
    } finally {
      setLoading(false);
    }
  };

  const displayError = accountError || formError;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Deposit Money</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="account"
          >
            Select Account
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="account"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            disabled={fetchingAccounts}
          >
            <option value="">
              {fetchingAccounts
                ? "Loading accounts..."
                : accounts.length === 0
                ? "No accounts available"
                : "Select an account"}
            </option>
            {accounts.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountNumber} - {account.accountType}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter amount to deposit"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Enter description (e.g., Salary deposit)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        {displayError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {displayError}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            type="submit"
            disabled={loading || fetchingAccounts}
          >
            {loading ? "Depositing..." : "Deposit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepositMoney;