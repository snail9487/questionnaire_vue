<script>
export default {
    props: [
        "quizVo",
    ],
    data() {
        return {
            quizRequest:{
                questionnaire: {
                    title: "",
                    description: "",
                    published: true,
                    startDate: "",
                    endDate: ""
                },
                questionList: [
                    {
                        quId: 0,
                        qTitle: "",
                        optionType: "",
                        necessary: false,
                        option: ""
                    }
                ]
            },
        }
    },
    methods: {
        quizVoToQuizReq(){
            this.quizRequest.questionnaire.title = this.quizVo.qn.qnTitle;
            this.quizRequest.questionnaire.description = this.quizVo.qn.qnDescription;
            this.quizRequest.questionnaire.published = this.quizVo.qn.published;
            this.quizRequest.questionnaire.startDate = this.quizVo.qn.startDate;
            this.quizRequest.questionnaire.endDate = this.quizVo.qn.endDate;
            for(let i=0;i < this.quizVo.quList.length;i++){
                this.quizRequest.questionList[i] = this.quizRequest.questionList[i] || {};

                this.quizRequest.questionList[i].quId = this.quizVo.quList[i].quId;
                this.quizRequest.questionList[i].qTitle = this.quizVo.quList[i].quTitle;
                this.quizRequest.questionList[i].optionType = this.quizVo.quList[i].optionType;
                this.quizRequest.questionList[i].necessary = this.quizVo.quList[i].necessary;
                this.quizRequest.questionList[i].option = this.quizVo.quList[i].option;
            }
        },
        save() {
            this.quizVo.qn.published = false;
            this.quizVoToQuizReq();
            this.saveToDb();
        },
        saveAndPublish() {
            this.quizVo.qn.published = true;
            this.quizVoToQuizReq();
            this.saveToDb();
        },
        saveToDb() {
            fetch("http://localhost:8080/api/quiz/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.quizRequest)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        emitConfirmOff(){
            this.$emit("confirmOff");
        },
        emitConfirmCancle(){
            this.$emit("confirmCancle");
        }
        
    }
}
</script>

<template>
    <div class="con">
        <!-- {{ quizVo }} -->
        <div>
            <h1>{{ "問卷標題: " + quizVo.qn.qnTitle }}</h1>
        </div>
        <div>
            <h2>{{ quizVo.qn.startDate }} ~ {{ quizVo.qn.endDate }}
            </h2>
        </div>
        <div>
            <h2>問卷描述: {{ quizVo.qn.qnDescription }} </h2>
        </div>
        <div>
            <span>姓名:&nbsp&nbsp&nbsp</span>
            <input type="text">
        </div>
        <div>
            <span>手機:&nbsp&nbsp&nbsp</span>
            <input type="text">
        </div>
        <div>
            <span>E-mail:</span>
            <input type="text">
        </div>
        <div>
            <span>年齡:&nbsp&nbsp&nbsp</span>
            <input type="text">
        </div>
        <br>
        <!-- {{ quizVo }} -->
        <br>
        <div v-for="(a, quIndex) in quizVo.quList">
            <div v-if="a.optionType == '單選'">
                {{ (a.quId = quIndex + 1) + '.' + a.quTitle }}
                <span v-if="a.necessary" style="color: red;"> *</span>
                <form action="">
                    <label v-for="(option, optionIndex) in a.option.split(';')">
                        <input type="radio" :id="`option${optionIndex}`" :name="a.quTitle" :value="option"
                            :required="a.necessary">
                        {{ option }}
                        <br>
                    </label>
                </form>
                <br>
            </div>
            <div v-if="a.optionType == '多選'">
                {{ (a.quId = quIndex + 1) + '.' + a.quTitle }}
                <span v-if="a.necessary" style="color: red;"> *</span>
                <form action="">
                    <label v-for="(option, optionIndex) in a.option.split(';')">
                        <input type="checkbox" :id="`option${optionIndex}`" :value="option" :required="a.necessary">
                        {{ option }}
                        <br>
                    </label>
                </form>
                <br>
            </div>
            <div v-if="a.optionType == '問答'">
                {{ (a.quId = quIndex + 1) + '.' + a.quTitle }}
                <span v-if="a.necessary" style="color: red;"> *</span>
                <br>
                <textarea rows="4" cols="50"></textarea>
                <br>
            </div>
        </div>
        <br>
        <div>
            <input type="button" value="取消" @click="emitConfirmCancle()">
            &nbsp
            <input type="button" value="僅儲存" @click="save(), emitConfirmOff()">
            &nbsp
            <input type="button" value="儲存並發布" @click="saveAndPublish(), emitConfirmOff()">
        </div>
        <br>
    </div>
</template>

<style lang="scss" scoped>
    .con{
        text-align: center;
        border: 1px black solid;
    }
</style>