import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "please fill all field" };
    }
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "product added succesfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (productID) => {
    const res = await fetch(`http://localhost:3000/api/products/${productID}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.message) return { success: false, message: data.message };
    //update the ui
    set((state) => ({
      products: state.products.filter((pro) => pro._id !== productID),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (productID, updatedProduct) => {
    const res = await fetch(`http://localhost:3000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((pro) =>
        pro._id === productID ? data.data : pro
      ),
    }));

    return { success: true, message: data.message };
  },
}));
