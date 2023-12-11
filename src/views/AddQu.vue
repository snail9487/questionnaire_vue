<script>
import QuRowBlcok from "../components/QuRow.vue";
export default {
    data() {
        return {
            quList: [],
            quTitle: "",
            optionType: "單選",
            necessary: false,
            option: "",
            qu: {
                quId: 0,    //
                quTitle: "",
                optionType: "單選",
                necessary: false,
                option: "",
            },
            selectedQu: [],
            ifEdit: false,
            editedQuIndex:0 ,
        }
    },
    methods: {
        closeQuShow() {
            this.$emit("closeQuShow");
        },
        emitPopQn() {
            this.$emit("popQn");
        },
        addQu() {
            this.quList.push({ ...this.qu });
        },
        emitQuList() {
            this.$emit("emitQuList", this.quList);
        },
        emitConfirmShow() {
            this.$emit("emitConfirmShow");
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
                this.quList.splice(index, 1);
            }
            this.selectedQu = [];
        },
        edit(index, quId,quTitle,optionType,necessary,option){
            this.ifEdit = true;
            this.quId = quId;
            this.quTitle = quTitle;
            this.optionType = optionType;
            this.necessary = necessary;
            this.option = option;
            this.editedQuIndex = index;

        },
        editDone(){
            this.quList[this.editedQuIndex] = {...this.qu};
            this.ifEdit = false;
            this.editedQuIndex = 0;
        }

    },
    watch: {
        quTitle: function (quTitle) {
            this.qu.quTitle = quTitle;
        },
        optionType: function (optionType) {
            this.qu.optionType = optionType;
        },
        necessary: function (necessary) {
            this.qu.necessary = necessary;
        },
        option: function (option) {
            this.qu.option = option;
        },
    },
    components: {
        QuRowBlcok,
    },
}
</script>

<template>
    <div>
        <!-- {{ qu }}
        <br>
        {{ quList }}
        <br>
        {{ editedQuIndex }}
        <br>
        {{ selectedQu }} -->
        <div class="qu">
            <span>問題:</span>
            <input type="text" v-model="quTitle">
            <!-- {{ quTitle }} -->
            &nbsp
            <select v-model="optionType">
                <option>單選</option>
                <option>多選</option>
                <option>問答</option>
            </select>
            &nbsp
            <!-- {{ optionType }} -->
            <input type="checkbox" id="necessary" v-model="necessary">
            <label for="necessary">必填</label>
            <!-- {{ necessary }} -->
        </div>
        <br>
        <div class="option">
            <span>選項: </span>
            <span>(多個答案請以;分隔)</span>
        </div>
        <br>
        <div>
            <input type="text" v-model="option">
            {{ option }}
            <input type="button" value="加入" @click="addQu()">
            &nbsp
            <input type="button" value="編輯完成" v-if="ifEdit" @click="editDone()">
        </div>
        <br>
        <div class="deleteBtn">
            <input type="button" value="刪除" @click="deleteQu()">
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
                    <tr v-for="(a, index) in quList">
                        <td><input type="checkbox" v-model="selectedQu[index]"></td>
                        <td>{{ index + 1 }}</td>
                        <td>{{ a.quTitle }}</td>
                        <td>{{ a.optionType }}</td>
                        <td>{{ a.necessary }}</td>
                        <td><a href="javascript:void(0);" @click="edit(index, a.quId, a.quTitle, a.optionType, a.necessary, a.option)">編輯</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <input type="button" value="上一步" @click="closeQuShow(), emitPopQn()">
            <!-- <input type="button" value="test上一步" @click="emitPopQn()">
            <input type="button" value="test送出" @click="emitQuList()"> -->
            <input type="button" value="送出" @click="emitConfirmShow(), emitQuList()">
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