import { createApp } from "vue";

const app = createApp({
  data() {
    return {
      ingredientesInput: "",
      recetas: [],
      recetasFiltradas: [],
      buscaste: false,
    };
  },
  methods: {
    normalizar(str) {
      return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    buscarRecetas() {
      const input = this.normalizar(this.ingredientesInput.trim());
      if (!input) {
        this.recetasFiltradas = [];
        this.buscaste = false;
        return;
      }

      const ingredientesUser = input.split(",")
        .map(e => this.normalizar(e.trim()))
        .filter(Boolean);

      console.log("Ingredientes ingresados:", ingredientesUser);

      // Filtrar recetas que contengan al menos uno de los ingredientes ingresados
      this.recetasFiltradas = this.recetas.filter(receta => {
        const recetaIngredientes = receta.ingredientes.split(",") // Convierte la cadena en un array
          .map(i => this.normalizar(i.trim())); // Normaliza los ingredientes de la receta
        return ingredientesUser.some(ing => recetaIngredientes.includes(ing));
      });

      console.log("Recetas filtradas:", this.recetasFiltradas);

      this.buscaste = true;
    }
  },
  mounted() {
    fetch('recetas.json')
      .then(res => res.json())
      .then(data => {
        this.recetas = data;
      });
  }
});

app.mount("#app");

