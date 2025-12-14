const VerifyDocuments = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Upload Documents</h1>
      <form action="" method="post" className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <input type="file" className="mb-4 p-2 border border-purple-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">Upload</button>
      </form>
      <p className="text-gray-500 mt-4 text-center">Only supports PDF, JPG, PNG files.</p>
    </div>
    );
};

export default VerifyDocuments;