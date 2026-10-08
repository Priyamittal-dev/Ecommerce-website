import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";


export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  setCategories: (categories) => set({ categories: Array.isArray(categories) ? categories : [] }),

  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/categories", categoryData);
      set((prevState) => ({
        categories: [...(Array.isArray(prevState.categories) ? prevState.categories : []), res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to create category");
      set({ loading: false });
    }
  },

  fetchAllCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/categories");
      const data = response.data?.categories || response.data || [];
      set({ categories: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({ categories: [], error: "Failed to fetch categories", loading: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await axios.delete(`/categories/${categoryId}`);
      set((prevCategories) => ({
        categories: (Array.isArray(prevCategories.categories) ? prevCategories.categories : []).filter(
          (category) => category._id !== categoryId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to delete category");
    }
  },

  getCategoryNames: () => {
    const categories = get().categories;
    return Array.isArray(categories) ? categories.map((category) => category.name) : [];
  },

  getCategoryFormatStrings: () => {
    const categories = get().categories;
    return Array.isArray(categories) ? categories.map((category) => ({
      href: `/${category.name}`,
      name: category.name,
      imageUrl: category.image,
    })) : [];
  },
}));
