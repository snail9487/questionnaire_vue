<script>
export default {
    props: [
        "updatableProp",
        "updatingQuizVoProp"
    ],
    data() {
        return {
            // quList: [],
            quizVo: {
                "questionnaire": {
                    "id": 0,
                    "title": "",
                    "description": "",
                    "published": null,
                    "startDate": "",
                    "endDate": ""
                },
                "questionList": []
            },

            qu: {
                quId: 0,    
                qnId: 0,
                qTitle: "",
                optionType: "單選",
                necessary: false,
                option: "",
            },
            ifEdit: false,
            selectedQu: [],
            editedQuIndex:0 ,
        }
    },
    methods: {
        addQu() {
            this.quizVo.questionList.push({ ...this.qu });
        },
        deleteQu() {
            let indexesToDelete = [];
            for (let i = 0; i < this.selectedQu.length; i++) {
                if (this.selectedQu[i] == true) {
                    indexesToDelete.push(i);
                }
            }
            for (let i = indexesToDelete.length - 1; i >= 0; i--) {
                let index = indexesToDelete[i];
                this.quizVo.questionList.splice(index, 1);
            }
            this.selectedQu = [];
        },
        edit(index, qTitle, optionType, necessary, option) {
            this.ifEdit = true;
            this.qu.qTitle = qTitle;
            this.qu.optionType = optionType;
            this.qu.necessary = necessary;
            this.qu.option = option;
            this.editedQuIndex = index;

        },
        editDone(){
            this.quizVo.questionList[this.editedQuIndex] = {...this.qu};
            this.ifEdit = false;
            this.editedQuIndex = 0;
        },
        emitCloseUpdateQu(){
            this.$emit("closeUpdateQu");
        },
        emitShowUpdateQn(){
            this.$emit("showUpdateQn");
        },
        emitUpdatingQuizVo(){
            this.$emit("emitUpdatingQuizVo", JSON.parse(JSON.stringify(this.quizVo)));
        },
        emitShowUpdateConfirm(){
            this.$emit("showUpdateConfirm");
        }
    },
    watch: {
        updatingQuizVoProp: function () {
            this.quizVo = JSON.parse(JSON.stringify(this.updatingQuizVoProp));
            this.qu.qnId = this.updatingQuizVoProp.questionnaire.id;
        },
    }
}
</script>

<template>
    {{ "updatable:" + this.updatableProp }}
    <br>
    {{ updatingQuizVoProp }}
    <br>
    {{ "quizVo" }}
    <br>
    {{ quizVo }}
    <div>
        <div class="qu">
            <span>問題:</span>
            <input type="text" v-model="qu.qTitle" :disabled="!updatableProp">
            <!-- {{ quTitle }} -->
            &nbsp
            <select v-model="qu.optionType" :disabled="!updatableProp">
                <option>單選</option>
                <option>多選</option>
                <option>問答</option>
            </select>
            &nbsp
            <!-- {{ optionType }} -->
            <input type="checkbox" id="necessaryInUpdate" v-model="qu.necessary" :disabled="!updatableProp">
            <label for="necessaryInUpdate">必填</label>
            <!-- {{ necessary }} -->
        </div>
        <br>
        <div class="option">
            <span>選項: </span>
            <span>(多個答案請以;分隔)</span>
        </div>
        <br>
        <div>
            <input type="text" v-model="qu.option" :disabled="!updatableProp">
            {{ qu.option }}
            <input type="button" value="加入" @click="addQu()" :disabled="!updatableProp">
            &nbsp
            <input type="button" value="編輯完成" v-if="ifEdit" @click="editDone()" :disabled="!updatableProp">
        </div>
        <br>
        <div class="deleteBtn">
            <input type="button" value="刪除" @click="deleteQu()" :disabled="!updatableProp">
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>編號</th>
                        <th>內容</th>
                        <th>問題種類</th>
                        <th>必填</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(a, index) in quizVo.questionList">
                        <td><input type="checkbox" v-model="selectedQu[index]" :disabled="!updatableProp"></td>
                        <td>{{ index + 1 }}</td>
                        <td>{{ a.qTitle }}</td>
                        <td>{{ a.optionType }}</td>
                        <td>{{ a.necessary }}</td>
                        <td><a href="javascript:void(0);" @click="edit(index, a.qTitle, a.optionType, a.necessary, a.option)">編輯</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <input type="button" value="上一步" @click="emitCloseUpdateQu() ,emitShowUpdateQn(), emitUpdatingQuizVo()">
            <input type="button" value="送出" @click="emitCloseUpdateQu(), emitUpdatingQuizVo(), emitShowUpdateConfirm()">
        </div>
    </div>
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