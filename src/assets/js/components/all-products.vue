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
                        <router-link :to="{name: 'buy_product', params: { id: product.id }}" class="btn btn-primary">Buy</router-link>
                        <router-link :to="{name: 'delete_product', params: { id: product.id }}" class="btn btn-danger">Delete</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                products: [],
                originalProducts: [],
                productSearch: '' ,
                sort: 'asc'
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

            resetSearchProducts: function()
            {
                this.productSearch = '';
                this.products = this.originalProducts;
                return;
            }
        }
    }
</script>
