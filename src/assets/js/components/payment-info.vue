<template>
  <div>
    <h1>Información del pago</h1>
    <p><strong>Nombre:</strong> {{ name }}</p>
    <p><strong>Email:</strong> {{ email }}</p>
    <p><strong>Precio:</strong> {{ price }} {{ currency }}</p>
    <!-- Otros detalles del pago -->
  </div>
</template>

<script>
export default {
  props: ['paymentId'], // prop para obtener el ID del pago desde la URL
  data() {
    return {
      name: '',
      email: '',
      price: '',
      currency: ''
      // Otros datos del pago que quieras mostrar
    }
  },
  mounted() {
    // Hacer una petición al servidor para obtener los detalles del pago
    this.getPaymentInfo()
  },
  methods: {
    getPaymentInfo() {
      // Hacer una petición al servidor para obtener los detalles del pago
      // Usando el ID del pago que se pasó como prop
      // Luego actualizar los datos del componente con la respuesta
    }
  }
}
</script>
