<script>
export default {
    data() {
        return {
            quizVoList: [],
            quizVo: {},
            quList: [],
            qnId: 0,
        }
    },
    methods: {
        getQuizVo() {
            fetch("http://localhost:8080/api/quiz/search1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "title": "",
                        "startDate": null,
                        "endDate": null,
                        "published": false
                    }
                )
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                    this.quizVoList = data.quizVoList;
                    console.log(this.quizVoList);
                    console.log(this.qnId);
                    for (let i = 0; i < this.quizVoList.length; i++) {
                        if (this.quizVoList[i].questionnaire.id == this.qnId) {
                            this.quizVo = this.quizVoList[i];
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    created() {
        this.qnId = this.$route.params.qnId;
        this.getQuizVo();
    },
    mounted() {

    },
}
</script>

<template>
    <div>
        <!-- <h1>qnId: {{ $route.params.qnId }}</h1>
        <br>
        {{ quizVo }}
        <br> -->
        <!-- {{ quizVo }} -->


        <!-- {{ quizVo.questionnaire }}
        {{ quizVo.questionnaire.title }}
        <br> -->

    </div>
    <div v-if="quizVo && quizVo.questionnaire">
        <h1>{{  quizVo.questionnaire.title  }}</h1>
    </div>
    <div v-if="quizVo && quizVo.questionnaire">
        <h2>{{ quizVo.questionnaire.startDate }} ~ {{ quizVo.questionnaire.endDate }}
        </h2>
    </div>
    <div v-if="quizVo && quizVo.questionnaire">
        <h2>問卷描述: {{ quizVo.questionnaire.description }} </h2>
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
    
    <br>
    <div v-for="a in quizVo.questionList">
        <div v-if="a.optionType == '單選'">
            {{ a.quId + '.' + a.qTitle }}
            <span v-if="a.necessary" style="color: red;"> *</span>
            <form action="">
                <label v-for="option in a.option.split(';')">
                    <input type="radio" :id="`option${optionIndex}`" :name="a.qTitle" :value="option"
                        :required="a.necessary">
                    {{ option }}
                    <br>
                </label>
            </form>
            <br>
        </div>
        <div v-if="a.optionType == '多選'">
            {{ a.quId + '.' + a.qTitle }}
            <span v-if="a.necessary" style="color: red;"> *</span>
            <form action="">
                <label v-for="option in a.option.split(';')">
                    <input type="checkbox"  :value="option" :required="a.necessary">
                    {{ option }}
                    <br>
                </label>
            </form>
            <br>
        </div>
        <div v-if="a.optionType == '問答'">
            {{ a.quId + '.' + a.qTitle }}
            <span v-if="a.necessary" style="color: red;"> *</span>
            <br>
            <textarea rows="4" cols="50" ></textarea>
            <br>
        </div>
    </div>
    <br>
</template>

<style lang="scss" scoped></style>