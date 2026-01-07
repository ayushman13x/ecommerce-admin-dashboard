"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/models/ProductSchema";
import { createProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from 'next-cloudinary';

export default function AddProductPage() {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState(""); 
  const router = useRouter();

  
  const { register, handleSubmit, trigger, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      image: "", 
    }
  });

  
  const currentImage = watch("image");

  const nextStep = async () => {
    // We cast this to any for the trigger to avoid deep-nested type errors during build
    const isValid = await trigger(["name", "description"] as any);
    if (isValid) setStep(2);
  };

  const onSubmit = async (data: ProductFormData) => {
    const result = await createProduct(data);
    if (result.success) {
      alert("Product saved to MongoDB!");
      router.push("/products");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Add New Product</h1>
      
      <div className="flex mb-10 space-x-4">
        <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
        
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">Step 1: Product Details</h2>
            
            <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Image</label>
              <CldUploadWidget 
                uploadPreset="ml_default" 
                onSuccess={(result: any) => {
                  const url = result.info.secure_url;
                  setImageUrl(url);
                  setValue("image", url);
                }}
              >
                {({ open }) => (
                  <button 
                    type="button" 
                    onClick={() => open()}
                    className="w-full py-4 bg-white border border-gray-300 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition"
                  >
                    {imageUrl ? "✅ Image Selected (Click to change)" : "📷 Click to Upload Image"}
                  </button>
                )}
              </CldUploadWidget>
              {imageUrl && (
                <div className="mt-4 flex justify-center">
                  <img src={imageUrl} alt="Preview" className="h-32 w-32 object-cover rounded-lg border shadow-sm" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
              <input {...register("name")} className="w-full p-3 border border-gray-300 rounded-lg text-black" placeholder="Enter product name" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea {...register("description")} className="w-full p-3 border border-gray-300 rounded-lg text-black h-24" placeholder="Enter description" />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <button type="button" onClick={nextStep} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">Step 2: Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                <input type="number" {...register("price")} className="w-full p-3 border border-gray-300 rounded-lg text-black" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                <input type="number" {...register("stock")} className="w-full p-3 border border-gray-300 rounded-lg text-black" placeholder="0" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select {...register("category")} className="w-full p-3 border border-gray-300 rounded-lg text-black">
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Kitchen</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold">Back</button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold shadow-md">Save Product</button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}