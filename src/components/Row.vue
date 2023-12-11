<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<template>
    <tr>
        <td>編號:01</td>
        <td>名稱:123</td>
        <td>狀態:1</td>
        <td>時間1</td>
        <td>時間2</td>
        <td>test</td>
    </tr>
</template>


<style lang="scss" scoped>
table {
    border-collapse: collapse;
    border: 2px solid rgb(200, 200, 200);
    letter-spacing: 1px;
    font-size: 0.8rem;
}

td,
th {
    border: 1px solid rgb(190, 190, 190);
    padding: 10px 20px;
}

th {
    background-color: rgb(235, 235, 235);
}

td {
    text-align: center;
}

tr:nth-child(even) td {
    background-color: rgb(250, 250, 250);
}

tr:nth-child(odd) td {
    background-color: rgb(245, 245, 245);
}

caption {
    padding: 10px;
}
</style>