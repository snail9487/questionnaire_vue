<script>
export default {
    data() {
        return {
            selected: "",
            num: "",
            content: "",
            optionType: "",
            necessary: "",
        }
    },
}
</script>

<template>
    <tr>
        <td><input type="checkbox" v-model="selected">{{ selected }}</td>
        <td>編號</td>
        <td>內容</td>
        <td>問題種類</td>
        <td>必填</td>
        <td>編輯</td>
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