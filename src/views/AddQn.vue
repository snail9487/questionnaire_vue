<script>
import AddQu from "./AddQu.vue";
export default {
    props:[
        "confirmCancleSignalProp",
    ],
    emits:["closeQnShow","addQn"],
    data() {
        const today = new Date();
        const twoDaysLater = new Date();
        const sevenDaysLater = new Date();
        twoDaysLater.setDate(today.getDate() + 2);
        sevenDaysLater.setDate(today.getDate() + 7);

        return {
            startDate: twoDaysLater.toISOString().split('T')[0], // 格式化日期為 "YYYY-MM-DD"
            endDate: sevenDaysLater.toISOString().split('T')[0],
            minDate: today.toISOString().split('T')[0],
            qnList:[],
            qnTitle: "title",
            qnDescription: "Description",
            qn: {
                selected:false,
                published:false,
                qnId:0,
                res:"前往",
                qnTitle: null,
                qnDescription: null,
                startDate: "",
                endDate: "",
            },
            quShow:false,
            qnShow:true,

        }
    },
    methods: {
        emitQn(){
            this.$emit("addQn",this.qn);
        },
        closeQnShow(){
            this.$emit("closeQnShow");
        },
        ifQuShow(){
            this.quShow = !this.quShow;
        },
        ifQnShow(){
            this.qnShow = !this.qnShow;
        },
        emitPopQn(){
            this.$emit("popQn")
        },
        getEmitQuList(quList){
            this.$emit("addQuList",quList);
        },
        emitConfirmShow(){
            this.quShow = false;
            this.$emit("emitConfirmShow");
        },
        emitConfirmCancleSuccess(){
            this.$emit("confirmCancleSuccess");
        }
    },
    watch: {
        qnTitle: function (qnTitle) {
            this.qn.qnTitle = qnTitle;
        },
        qnDescription: function (qnDescription) {
            this.qn.qnDescription = qnDescription;
        },
        startDate: function (startDate) {
            this.qn.startDate = startDate;
        },
        endDate: function (endDate) {
            this.qn.endDate = endDate;
        },
        confirmCancleSignalProp: function () {
            if(this.confirmCancleSignalProp == true){
                this.quShow = true;
                this.emitConfirmCancleSuccess();
            }
        }
    },
    components:{
        AddQu,
    },
    mounted(){
        this.qn.qnTitle = this.qnTitle;
        this.qn.qnDescription = this.qnDescription;
        this.qn.startDate = this.startDate;
        this.qn.endDate = this.endDate;
    }
}
</script>

<template>
    <div v-show="quShow">
        <AddQu @closeQuShow="ifQuShow(), ifQnShow()" @popQn="emitPopQn()" @emitQuList="getEmitQuList" @emitConfirmShow="emitConfirmShow()"/>
    </div>
    <div v-show="qnShow" class="con">
        <div>
            <span>問卷名稱: </span>
            <input type="text" v-model="qnTitle">
        </div>
        <div>
            <span>問卷說明: </span>
            <input type="text" v-model="qnDescription">
        </div>
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
        <!-- {{ console.log(qn) }}
        {{ qn }} -->
        <div class="buttonArea">
            <input type="button" value="取消" @click="closeQnShow()">
            <input type="button" value="下一步" @click="emitQn(), ifQuShow(), ifQnShow()">
            <!-- <input type="button" value="test" @click="emitQn()"> -->
            <!-- <RouterLink to="/AddQu"><input type="button" value="下一步" @click="addQn(), emitQnList()"></RouterLink> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.con{
    text-align: center;
}
</style>