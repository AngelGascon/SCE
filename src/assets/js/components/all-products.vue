<template>
    <div id="all-products">
        
        <h2>All Products</h2>
        <!-- SearchBar input and buttons -->
        <div class="input-group mb-3" style="width: 100%;">
            <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" @keyup="getSearchSuggestions" @keyup.enter="searchProducts">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchProducts">Search</button>
                <button class="btn btn-outline-secondary" type="button" @click="toggleSortOrder">
                    {{ sort === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}
                </button>
                <button class="btn btn-outline-secondary" type="button" @click="resetSearchProducts">Reset</button>
            </div>
        </div>
        <!-- Search Suggestions -->
        <ul class="list-group" style="position: absolute; z-index: 1; width: 50%;" v-if="showAutocomplete">
            <li class="list-group-item" v-for="(suggestion, index) in autocompleteSuggestions" :key="index" @click="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
        <!-- 3x3 grid -->
        <div class="container">
            <div class="row">
                <div v-for="(product, index) in products" :key="index" class="col-4 mb-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <h3>{{ product.name }}</h3>
                            <p>{{ product.description }}</p>
                            <p>{{ product.price }} $</p>
                            <p><img :src="product.image" alt="Product Image" width="40px"></p>
                            <p>
                                <button id="boton-compra" class="btn btn-primary" @click="comprar(product)">Comprar</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
                        <tr v-for="(cryptocurrency, index) in cryptoCart">
                            <td>
                                <img :src="cryptocurrency.image" width='32' height='32'>
                            </td>
                            <td>
                                <p>{{ cryptocurrency.name }}</p>
                                <p style="font-size: small;">{{ cryptocurrency.description }}</p>
                            </td>
                            <td>
                                <p>€{{ cryptocurrency.price }}</p>
                            </td>
                        </tr>
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
                sort: 'asc',
                autocompleteSuggestions: [],
                showAutocomplete: false
            }
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
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
            resetSearchProducts: function()
            {
                this.productSearch = '';
                this.products = this.originalProducts;
                return;
            },
            getSearchSuggestions: function() {
                //Don't do a request if the user doesn't input data
                if (this.productSearch.length > 0) {
                    //AJAX request
                    fetch(`http://localhost:3000/api/searchSuggestion?searchData=${this.productSearch}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.length > 0) {
                            this.autocompleteSuggestions = data;
                            this.showAutocomplete = true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else {
                    this.autocompleteSuggestions = [];
                    this.showAutocomplete = false;
                }
            },
            selectSuggestion: function(suggestion) {
                this.productSearch = suggestion;
                this.showAutocomplete = false;
                // Call your searchProducts method here with the selected suggestion
                this.searchProducts();
            }
        }
    }
</script>
