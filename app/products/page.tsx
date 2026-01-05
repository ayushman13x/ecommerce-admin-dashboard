import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import DeleteButton from "./DeleteButton"; // Import the new client button

export const revalidate = 0; 

export default async function ProductsPage() {
  await dbConnect();
  
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500">Manage your inventory and pricing</p>
        </div>
        <Link 
          href="/products/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Image</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Product Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-black">
            {products.length === 0 ? (
              <tr>
                <td className="px-6 py-4 text-gray-400 italic text-center" colSpan={6}>
                  No products found. Click "Add Product" to get started.
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product._id.toString()} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-md border border-gray-200" 
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} in stock
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {/* Use the new Client Component here */}
                    <DeleteButton id={product._id.toString()} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}