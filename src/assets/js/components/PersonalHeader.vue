<template>
  <div class="page-header d-flex justify-content-between">
      <h1>Home page</h1>
      <h1><button id="boton-carrito" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">
      <img src="img/carrito.png" width="40px">
    </button></h1>
  </div>
</template>

<script>
export default {
  props: {
    cryptoCart: {
      type: Array,
      required: true
    }
  }
}
</script>