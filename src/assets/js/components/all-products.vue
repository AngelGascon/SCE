<template>
    <div id="all-products">
        <h1>All Products</h1>
        
        <button id="boton-carrito" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">
            <img src="img/carrito.png" width="40px">
        </button>
        <p><router-link :to="{ name: 'create_product' }" class="btn btn-primary">Create Product</router-link></p>
        <p class="btn btn-primary" @click="toggleSortOrder">
            {{ sort === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}
        </p>
        <div class="form-group">
            <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="product in products">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td><img :src="product.image" alt="Product Image" width="40px"></td>
                    <td>
                        <router-link :to="{name: 'buy_product', params: { id: product.id }}" class="btn btn-primary">Buy</router-link>
                        <router-link :to="{name: 'delete_product', params: { id: product.id }}" class="btn btn-danger">Delete</router-link>
                        <button id="boton-compra" class="btn btn-primary" @click="comprar">Comprar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { setMaxIdleHTTPParsers } from 'http';


    export default{
        data(){
            return{
                products: [],
                originalProducts: [],
                productSearch: '' ,
                sort: 'asc'  // 0 asc, 1 des
            }
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/api/products').then((response) => {
                    this.products = response.body;
                    this.originalProducts = this.products;
                    //this.sortCoins();
                }, (response) => {

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
            comprar() {
                const botonCarrito = document.getElementById('boton-carrito');
                
                botonCarrito.classList.add('parpadeo');
                setTimeout(() => {botonCarrito.classList.remove('parpadeo');}, 500);
                
                botonCarrito.classList.add('buy');
                setTimeout(() => {botonCarrito.classList.remove('buy');}, 1000);
            }
        }
    }
</script>
