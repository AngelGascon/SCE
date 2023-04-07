<template>
    <div class="container">
        <!-- Fixed header -->
        <personal-header></personal-header>
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

    export default{
        components: {
            PersonalHeader
        },
        data(){
            return{

            }
        }
    }
</script>
