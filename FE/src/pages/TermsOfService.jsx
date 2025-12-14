import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">

      {/* Header Section */}
      <header className="w-full max-w-4xl text-center mb-10 pt-4">
        <h1 className="text-5xl font-extrabold text-rose-900 tracking-tight">
          🏦 Jeevan Bank
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Terms of Service Agreement (The "Iron-Clad Oath")
        </p>
        <p className="text-sm text-gray-500 mt-1">
          **Effective Date:** January 1, 2026 (or whenever we feel like it)
        </p>
        <hr className="mt-6 border-rose-200" />
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-4xl bg-white shadow-sm rounded-lg p-10 space-y-8  border-rose-700">

        {/* Section 1: Acceptance of Terms */}
        <section>
          <h2 className="text-3xl font-bold text-rose-800 mb-4 border-b pb-2">
            1. Acceptance of Terms (The Inevitable Nod)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By clicking **"I Agree,"** opening an account, or simply thinking about Jeevan Bank, you (the "Client," "Account Holder," or "Future Source of Revenue") agree to be bound by these Terms of Service, all future revisions, and the unspoken whims of the Jeevan Bank Board. If you disagree, you must immediately cease to exist, as your very presence is a violation of Section 1.1.
          </p>
        </section>

        {/* Section 2: Account Eligibility */}
        <section>
          <h2 className="text-3xl font-bold text-rose-800 mb-4 border-b pb-2">
            2. Account Eligibility (The Purity Test)
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>**2.1. Age:** You must be old enough to understand the crushing weight of modern banking regulations, or at least 18 years old.</li>
            <li>**2.2. Documentation:** We require verifiable proof of identity, including, but not limited to, a passport, a driver's license, and an original, hand-drawn portrait of your **favorite mythological creature.**</li>
            <li>**2.3. The Jeevan Vibe:** Jeevan Bank reserves the right to deny service to anyone whose **aura** we deem incompatible with our financial feng shui.</li>
          </ul>
        </section>

        {/* Section 3: Deposits and Withdrawals */}
        <section>
          <h2 className="text-3xl font-bold text-rose-800 mb-4 border-b pb-2">
            3. Deposits and Withdrawals (The Financial Rollercoaster)
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>**3.1. Deposits:** Any funds deposited with Jeevan Bank immediately become the property of Jeevan Bank for the purpose of "safekeeping" and **"aggressive investment in speculative endeavors."**</li>
            <li>**3.2. Withdrawal Requests:** Withdrawal requests are processed on the **30th of February.** In years where this day does not occur, they will be reviewed by a committee of highly-paid philosophical consultants.</li>
            <li>**3.3. The Reverse Fee:** For any transaction that displeases us, Jeevan Bank may apply a *Reverse Fee*, wherein we withdraw funds from your account to compensate us for the **emotional distress** caused by your transactional activity.</li>
          </ul>
        </section>

        {/* Section 4: Digital Services */}
        <section>
          <h2 className="text-3xl font-bold text-rose-800 mb-4 border-b pb-2">
            4. Digital Services (The Illusion of Control)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            While we strive for service, you agree that any transaction may take up to $10^9$ business days, provided a business day can be definitively proven to exist.
          </p>
          <p className="mt-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md">
            **⚠️ Important Note:** If you forget your password, the recovery process involves a **12-stage quest, a three-part riddle,** and a sworn promise to use a password that is less obvious than "password123."
          </p>
        </section>

        {/* Section 5: Privacy and Data */}
        <section>
          <h2 className="text-3xl font-bold text-rose-800 mb-4 border-b pb-2">
            5. Privacy and Data (The Open Book Policy)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You acknowledge that Jeevan Bank treats your personal data (including purchase history, browsing habits, and your secret dreams) as an **open-source project.** We reserve the right to share, sell, or publicly tweet this information to "enrich the global data ecosystem."
          </p>
        </section>

        {/* Section 6: Termination of Service */}
        <section>
          <h2 className="text-3xl font-bold text-rose-800 mb-4 border-b pb-2">
            6. Termination of Service (The Sudden Goodbye)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Jeevan Bank may terminate this agreement and freeze your assets at any time, for any reason, or for absolutely no reason whatsoever. Valid reasons for termination include, but are not limited to:
          </p>
          <ul className="mt-2 list-disc list-outside text-gray-700 space-y-1 ml-6">
            <li className="text-red-600 font-medium">Using a competitor's ATM.</li>
            <li className="text-red-600 font-medium">Making a typo in a check memo.</li>
            <li className="text-red-600 font-medium">Wearing a color that clashes with the Bank's logo.</li>
          </ul>
        </section>

        {/* Footer / Call to Action */}
        <footer className="pt-8 text-center border-t border-rose-200 mt-8">
          <p className="text-lg font-semibold text-rose-900 mb-4">
            Thank you for banking with Jeevan Bank. Your lack of choice is appreciated.
          </p>
          <button
            className="px-8 py-3 bg-rose-600 text-white text-xl font-semibold rounded-lg hover:bg-rose-700 transition duration-300 transform hover:scale-105 shadow-xl"
            onClick={() => alert('Agreement confirmed. Your soul is ours.')}
          >
            I Agree (The Oath is Sworn)
          </button>
        </footer>

      </main>
    </div>
  );
};

export default TermsOfService;