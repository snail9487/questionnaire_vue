<script>
export default {
    props: [
        "updatableProp",
        "updatingQuizVoProp",
    ],
    data() {
        const today = new Date();
        return {
            quizVo : {  "questionnaire": {  "id": 0, 
                                            "title": "", 
                                            "description": "", 
                                            "published": null, 
                                            "startDate": "", 
                                            "endDate": "" }, 
                        "questionList": [ ] },
            minDate: today.toISOString().split('T')[0],
            
        }
    },
    methods: {
        emitCloseUpdateQn(){
            this.$emit("closeUpdateQn");
        },
        emitShowUpdateQu(){
            this.$emit("showUpdateQu");
        },
        emitShowBack(){
            this.$emit("showBack");
        },
        emitUpdatingQuizVo(){
            this.$emit("emitUpdatingQuizVo",JSON.parse(JSON.stringify(this.quizVo)));
        }

    },
    watch: {
        updatingQuizVoProp: function () {
        // 无需访问新旧值的逻辑
        this.quizVo = JSON.parse(JSON.stringify(this.updatingQuizVoProp));
    },
    
},
}
</script>

<template>
    {{ "updatable:" + this.updatableProp }}
    <br>
    {{ updatingQuizVoProp }}
    <br>
    {{ quizVo }}
    <div class="con">
        <div>
            <span>問卷名稱: </span>
            <input type="text" v-model="quizVo.questionnaire.title" :readonly="!updatableProp">
        </div>
        <div>
            <span>問卷說明: </span>
            <input type="text" v-model="quizVo.questionnaire.description" :readonly="!updatableProp">
        </div>
        <div>
            <span>開始時間: </span>
            <input type="date" v-model="quizVo.questionnaire.startDate" :min="minDate" :readonly="!updatableProp">
        </div>
        <div>
            <span>結束時間: </span>
            <input type="date" v-model="quizVo.questionnaire.endDate" :readonly="!updatableProp">
        </div>
        <div class="buttonArea">
            <input type="button" value="取消" @click="emitCloseUpdateQn(), emitShowBack()">
            <input type="button" value="下一步" @click="emitCloseUpdateQn(), emitShowUpdateQu(), emitUpdatingQuizVo()">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.con {
    text-align: center;
}
</style>

