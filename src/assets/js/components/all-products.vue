<template>
    <div id="all-products">
        
        <h1>All Products</h1>
        <div class="input-group mb-3">
            <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" @keyup.enter="searchProducts">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchProducts">Search</button>
                <button class="btn btn-outline-secondary" type="button" @click="toggleSortOrder">
                    {{ sort === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}
                </button>
                <button class="btn btn-outline-secondary" type="button" @click="resetSearchProducts">Reset</button>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Price</td>
                    <td></td>
                    <td>Actions</td>
                    <td></td>
                </tr>
            </thead>

            <tbody>
                <tr v-for="product in products">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td><img :src="product.image" alt="Product Image" width="40px"></td>
                    <td>
                        <button id="boton-compra" class="btn btn-primary" @click="comprar(product)">Comprar</button>
                    </td>
                </tr>
            </tbody>
        </table>
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
                        <table class="crypto-table">
                            <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(cryptocoin, index) in cryptoCart" :key="cryptocoin.id">
                                <td>
                                <img :src="cryptocoin.image" alt="" width="32" height="32">
                                </td>
                                <td style="width: 50%;">
                                    <p>{{ cryptocoin.name }}</p>
                                    <p style="font-size: small;">{{ cryptocoin.description }}</p>
                                </td>
                                <td>
                                <h4>€{{ cryptocoin.price }}</h4>
                                </td>
                                <td>
                                <button @click="removeCrypto(index)" class="delete-button">
                                    <img src="img/delete.png" alt="Eliminar" width="20px">
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="1"></td>
                                <td class="text-left">
                                    <h4 class="mb-0">Total: {{ cartPrice }} €</h4>
                                </td>
                                <td class="text-right">
                                    <button type="buttom" @click="makePurchase" class="btn btn-primary">Comprar</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin modal -->
    </div>
</template>

<script>
import { setMaxIdleHTTPParsers } from 'http';



    export default{
        data(){
            return{
                products: [],
                originalProducts: [],
                cryptoCart: [],
                product:{},
                productSearch: '' ,
                sort: 'asc'
            }
        },

        computed: {
            cartPrice() {
                let total = 0;
                this.cryptoCart.forEach(x => {
                    total += x.price;
                });
                return total.toFixed(2);
            },
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            makePurchase: function () {
                this.$http.get(`http://localhost:3000/api/makePurchase?price=${this.cartPrice}`)
                .then((response) => {
                    window.location.href = response.data.redirectUrl;
                })
                .catch(error => {
                        alert('Error al realizar la compra');
                });
            },
 
            fetchProductData: function()
            {
                fetch('http://localhost:3000/api/products')
                    .then(response => response.json())
                    .then(data => {
                        this.products = data;
                        this.originalProducts = this.products;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            toggleSortOrder: function()
            {
                this.sort = this.sort === 'asc' ? 'desc' : 'asc';
                this.sortProducts();
            },

            sortProducts: function()
            {
                this.products.sort((a, b) => {
                    if (this.sort === 'asc') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                });
            },

            removeItem: function (index) {
                this.cartCryptos.splice(index, 1);
            },

            searchProducts: function()
            {
                if(this.productSearch == '')
                {
                    this.products = this.originalProducts;
                    return;
                }
                
                var searchedProducts = [];
                for(var i = 0; i < this.originalProducts.length; i++)
                {
                    var productName = this.originalProducts[i]['name'].toLowerCase();
                    if(productName.indexOf(this.productSearch.toLowerCase()) >= 0)
                    {
                        searchedProducts.push(this.originalProducts[i]);
                    }
                }

                this.products = searchedProducts;
            }, 
            comprar: function(crypto) {
                
                
                if (!this.cryptoCart.map(x => x.id).includes(crypto.id)) { 
                this.cryptoCart.push(crypto);
                
                console.log(this.crypto);
                
                const botonCarrito = document.getElementById('boton-carrito');
                botonCarrito.classList.add('parpadeo');
                setTimeout(() => {botonCarrito.classList.remove('parpadeo');}, 500);
                botonCarrito.classList.add('buy');
                setTimeout(() => {botonCarrito.classList.remove('buy');}, 1000);
              
                } else {
                    alert(`La moneda ${crypto.name} ya ha sido añadida anteriormente`);
                         
                }
            },
            removeCrypto: function(index){
                this.cryptoCart.splice(index, 1);
            },

            resetSearchProducts: function()
            {
                this.productSearch = '';
                this.products = this.originalProducts;
                return;
            }
        }
    }
</script>
