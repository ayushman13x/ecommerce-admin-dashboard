import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import InventoryChart from "./InventoryChart";
import CategoryChart from "./CategoryChart";
import { getServerSession } from "next-auth"; // 1. Import this
import { authOptions } from "../api/auth/[...nextauth]/route"; // 2. Import your auth config

export default async function DashboardPage() {
  // 3. Get the session on the server
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Ayushman";

  await dbConnect();
  
  const products = await Product.find({}).lean();
  
  const totalProducts = products.length;
  const totalStock = products.reduce((acc: number, item: any) => acc + item.stock, 0);
  const outOfStock = products.filter((item: any) => item.stock === 0).length;

  const categoryMap = products.reduce((acc: any, item: any) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryMap).map(name => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: categoryMap[name]
  }));

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      {/* 4. Personalized Greeting Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">{userName}</span>! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here is the latest data for your inventory.</p>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-black">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Products</p>
          <h3 className="text-3xl font-bold text-blue-600">{totalProducts}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Items in Stock</p>
          <h3 className="text-3xl font-bold text-green-600">{totalStock}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Out of Stock Items</p>
          <h3 className="text-3xl font-bold text-red-600">{outOfStock}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Stock Levels per Product</h2>
          <div className="h-80 w-full">
            <InventoryChart data={JSON.parse(JSON.stringify(products))} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Product Distribution by Category</h2>
          <div className="h-80 w-full">
            <CategoryChart data={categoryData} />
          </div>
        </div>
      </div>
    </main>
  );
}