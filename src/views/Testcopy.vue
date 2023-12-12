<script>
export default {
    data() {
        const today = new Date();
        const twoDaysLater = new Date();
        const sevenDaysLater = new Date();
        twoDaysLater.setDate(today.getDate() - 2);
        sevenDaysLater.setDate(today.getDate() + 7);
        return {
            arr: [1, 2, 3, 4, 5],
            arr2: [],
            startDate: twoDaysLater.toISOString().split('T')[0], // 格式化日期為 "YYYY-MM-DD"
            endDate: sevenDaysLater.toISOString().split('T')[0],
            minDate: today.toISOString().split('T')[0],
        }
    },
    methods: {

    }
}
</script>

<template>
    {{ arr }}
    {{ arr2 =[...arr].reverse() }}
    <!-- {{ arr2 = arr.reverse() }} -->
    {{ arr2 }}
    <br>
    {{ "======================" }}
    <br>
    <div>
            <span>開始時間: </span>
            <input type="date" v-model="startDate" :min="minDate">
            <!-- {{ startDate }} -->
        </div>
        <div>
            <span>結束時間: </span>
            <input type="date" v-model="endDate">
            <!-- {{ endDate }} -->
        </div>
        
</template>

<style lang="scss" scoped></style>

