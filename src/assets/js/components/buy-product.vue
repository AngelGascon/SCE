<template>
    <div>
      <h1>Product Details</h1>
      <div>
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <button @click="buyProduct">Buy Now</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Buy-Product",
    data() {
      return {
        product: {}
      }
    },
    created() {
      // Obtener el ID del producto de los parámetros de la ruta
      const productId = this.$route.params.id;
      
      // Hacer una solicitud HTTP GET para obtener los detalles del producto
      this.$http.get('http://localhost:3000/api/product/')
        .then(response => {
          this.product = response.body;
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
      buyProduct() {
        // Lógica para procesar la compra del producto
        console.log("Producto comprado: ", this.product);
      }
    }
  };
  </script>
  