export default function Home() {
  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here is what's happening with your store.</p>
        </header>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 uppercase">Total Products</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 uppercase">Low Stock Alerts</h2>
            <p className="text-3xl font-bold text-orange-500 mt-2">0</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 uppercase">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">$0.00</p>
          </div>
        </div>

        {/* Placeholder for Charts */}
        <div className="p-10 bg-white rounded-xl shadow-sm border border-gray-200 text-center">
          <p className="text-gray-400 italic">Sales charts will appear here once data is connected.</p>
        </div>
      </div>
    </main>
  );
}