<script>
export default {
    data() {
        return {
            isSelected: false,
            qnId: 0,
            qnTitle: "title",
            state: "未發布",
            startDate: "2023-11-25",
            endDate: "2023-11-30",
            result: "前往",
        }
    },
}
</script>

<template>
    <tr>
        <td><input type="checkbox" v-model.checkbox = "isSelected">{{isSelected}}</td>
        <td>{{ qnId }}</td>
        <td>{{ qnTitle }}</td>
        <td>{{ state }}</td>
        <td>{{ startDate }}</td>
        <td>{{ endDate }}</td>
        <td>{{ result }}</td>
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