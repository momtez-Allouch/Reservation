import { defineStore } from "pinia";
import axios from "axios";

export const useCategotyStore = defineStore("category", {
  state: () => ({ category: {}, categoriesList: [] }),
  getters: {},
  actions: {
    async getAllCategories() {
      try {
        const data = await axios.get("http://localhost:3000/categories");

        this.categoriesList = data.data.paginatedResult;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
