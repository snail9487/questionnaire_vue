<script>
    export default{
        data(){
            return{
                arr:[1,2,3,4,5],
                arr2:[]
            }
        },
        methods:{
            
        }
    }
</script>

<template>
    {{ arr }}
    {{ arr2 = [...arr].reverse() }}
    <!-- {{ arr2 = arr.reverse() }} -->
    {{ arr2 }}
</template>

<style lang="scss" scoped>

</style>

