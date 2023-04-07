<template>
  <div>
    <div class="page-header d-flex justify-content-between">
      <router-link :to="{name: 'all_products'}" style="text-decoration: none; color: #333;">
        <h1>Home page</h1>
      </router-link>
      <h1>
        <button id="boton-carrito" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">
          <img src="img/carrito.png" width="40px">
        </button>
      </h1>
    </div>

    <!-- Agregar modal aquí -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Carrito de compras</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Este es el contenido del carrito de compras.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary">Realizar compra</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin modal -->
  </div>
</template>
