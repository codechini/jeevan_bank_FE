const VerifyDocuments = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Upload Documents</h1>
          <a href="/services">
            <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Back to Services
            </button>
          </a>
        </div>
        <form action="" method="post" className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
          <input type="file" className="mb-4 p-2 border border-purple-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">Upload</button>
        </form>
        <p className="text-gray-500 text-center">Only supports PDF, JPG, PNG files.</p>
      </div>
    </div>
  );
};

export default VerifyDocuments;
