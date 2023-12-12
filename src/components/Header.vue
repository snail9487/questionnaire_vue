<script>
// import { RouterLink} from 'vue-router';
export default {
    data() {
        return {

        }
    },
}
</script>

<template>
    <nav class="nav">
        <RouterLink to="/Home">前台</RouterLink>
        <RouterLink to="/Back">後台</RouterLink>
        <RouterLink to="/Fetch">Fetch</RouterLink>
        <RouterLink to="/Testcopy">Testcopy</RouterLink>
    </nav>
</template>

<style>
.nav {
    background-color: #ff9595;
    display: flex;
    justify-content: space-around;
    min-width: 1200px;
    width: 100%;
}
</style>
