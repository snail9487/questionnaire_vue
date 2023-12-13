<script>
export default {
    props: [
        "updatableProp",
        "updatingQuizVoProp",
    ],
    data() {
        return {
            quizRequest: {
                questionnaire: {
                    id: 0,
                    title: "",
                    description: "",
                    published: true,
                    startDate: "",
                    endDate: ""
                },
                questionList: []
            },
        }
    },
    methods: {
        removeQnId() {
            this.quizRequest.questionList = this.quizRequest.questionList.map(({ qnId, ...rest }) => rest);
        },
        save() {
            this.quizRequest.questionnaire.published = false;
            this.removeQnId();
            this.update();
            this.refresh();
        },
        saveAndPublish() {
            this.quizRequest.questionnaire.published = true;
            this.removeQnId();
            this.update();
            this.refresh();
        },
        update() {
            let deleteQn = [];
            deleteQn.push(this.quizRequest.questionnaire.id);
            fetch("http://localhost:8080/api/quiz/deleteQuestionnaire", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteQn)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                    console.log("delete");
                    this.saveToDb();
                })
                .catch(error => {
                    console.log(error);
                })
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
                    console.log("create")
                })
                .catch(error => {
                    console.log(error);
                })
        },
        refresh() {
            location.reload();
        },
        emitCloseUpdateConfirm() {
            this.$emit("closeUpdateConfirm");
        }
    },
    watch: {
        updatingQuizVoProp: function () {
            this.quizRequest = JSON.parse(JSON.stringify(this.updatingQuizVoProp));
        },
    }
}
</script>

<template>
    {{ "updatable:" + this.updatableProp }}
    <br>
    {{ updatingQuizVoProp }}
    <br>
    {{ "quizRequest" }}
    <br>
    {{ quizRequest }}
    <div class="con">
        <!-- {{ quizVo }} -->
        <div>
            <h1>{{ "問卷標題: " + quizRequest.questionnaire.title }}</h1>
        </div>
        <div>
            <h2>{{ quizRequest.questionnaire.startDate }} ~ {{ quizRequest.questionnaire.endDate }}
            </h2>
        </div>
        <div>
            <h2>問卷描述: {{ quizRequest.questionnaire.description }} </h2>
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
        <div v-for="(a, quIndex) in quizRequest.questionList">
            <div v-if="a.optionType == '單選'">
                {{ (a.quId = quIndex + 1) + '.' + a.qTitle }}
                <span v-if="a.necessary" style="color: red;"> *</span>
                <form action="">
                    <label v-for="(option, optionIndex) in a.option.split(';')">
                        <input type="radio" :id="`option${optionIndex}`" :name="a.qTitle" :value="option"
                            :required="a.necessary">
                        {{ option }}
                        <br>
                    </label>
                </form>
                <br>
            </div>
            <div v-if="a.optionType == '多選'">
                {{ (a.quId = quIndex + 1) + '.' + a.qTitle }}
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
                {{ (a.quId = quIndex + 1) + '.' + a.qTitle }}
                <span v-if="a.necessary" style="color: red;"> *</span>
                <br>
                <textarea rows="4" cols="50"></textarea>
                <br>
            </div>
        </div>
        <br>
        <div>
            <input type="button" value="取消" @click="emitCloseUpdateConfirm()">
            &nbsp
            <input type="button" value="僅儲存" @click="save()" v-if="updatableProp">
            &nbsp
            <input type="button" value="儲存並發布" @click="saveAndPublish()" v-if="updatableProp">
            &nbsp
            <input type="button" value="確定" @click="refresh()" v-if="!updatableProp">
        </div>
        <br>
    </div>
</template>

<style lang="scss" scoped>
.con {
    text-align: center;
    border: 1px black solid;
}
</style>

