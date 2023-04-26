<template>
    <div class="container">
        <!-- Fixed header -->
        <personal-header :cryptoCart="cryptoCart" />
        <div id="page">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>
import PersonalHeader from './assets/js/components/PersonalHeader.vue';

import Paypal from './assets/js/components/Paypal.vue';

    export default {
    components: {
        PersonalHeader,
        Paypal
    },
    data() {
        return {
        cryptoCart: [] // aquí asigna el valor de la propiedad
        }
    }
    }
</script>





