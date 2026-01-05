"use client"; // This tells Next.js this file runs in the browser

import { deleteProduct } from "@/actions/productActions";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmed) {
      await deleteProduct(id);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 font-medium transition text-sm hover:underline"
    >
      Delete
    </button>
  );
}