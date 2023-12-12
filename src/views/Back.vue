<script>
import AddQn from "./AddQn.vue";
import Confirm from "./Confirm.vue";
import UpdateQn from "./UpdateQn.vue";
import UpdateQu from "./UpdateQu.vue";
import UpdateConfirm from "./UpdateConfirm.vue";
export default {
    data() {
        return {
            selectedRows: [],
            qn: {},
            quList: [],
            perpage: 10, //一頁的資料數
            currentPage: 1,
            qnShow: false,
            confirmShow: false,
            backShow: true,
            quizVoList: [],
            quizVo: {
                qn: {},
                quList: [],
            },
            titleSearch: "",
            startDateSearch: "",
            endDateSearch: "",
            confirmCancleSignal:false,
            ifShowUpdataQn: false,
            ifShowUpdataQu: false,
            ifShowUpdataConfirm: false,
            updatable: false,
            selectedQuiz: {},
            updatingQuizVo:{},
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.quizVoList.length / this.perpage)
            //Math.ceil()取最小整數
        },
        pageStart() {
            return (this.currentPage - 1) * this.perpage
            //取得該頁第一個值的index
        },
        pageEnd() {
            return this.currentPage * this.perpage
            //取得該頁最後一個值的index
        },
        
    },
    methods: {
        getEmitQn(qn) {
            this.qn = qn;
        },
        getEmitQuList(quList) {
            this.quList = quList;
        },
        setPage(page) {
            if (page <= 0 || page > this.totalPage) {
                return
            }
            this.currentPage = page
        },
        ifQnShow() {
            this.qnShow = !this.qnShow;
        },
        popQn() {
            this.qn = {};
        },
        getQuizVoList() {
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
                        "published": true
                    }
                )
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                    this.quizVoList = data.quizVoList;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        showConfirm() {
            this.confirmShow = true;
        },
        ifBackShow() {
            this.backShow = !this.backShow;
        },
        search() {
            fetch("http://localhost:8080/api/quiz/search1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "title": this.titleSearch,
                        "startDate": this.startDateSearch,
                        "endDate": this.endDateSearch,
                        "published": true
                    }
                    )
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                    if (data.quizVoList == null) {
                        this.quizVoList = [];
                    }
                    else {
                        this.quizVoList = data.quizVoList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getStatus(published, startDate, endDate) {
                if (published == false) {
                    return "未發布";
                }
                let today = new Date();
                let startDateObj = new Date(startDate);
                let endDateObj = new Date(endDate);
                if (startDateObj > today) {
                    return "未開始";
                }
                if (endDateObj >= today) {
                    return "進行中";
                }
                if (endDateObj < today) {
                    return "已結束";
                }
            },
            deleteQn(){
                let deleteQn = [];
                for(let i=0; i < this.selectedRows.length; i++){
                    if(this.selectedRows[i] == true){
                        deleteQn.push(i);
                    }
                }
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
                })
                .catch(error => {
                    console.log(error);
                })
                location.reload();
            },
            showConfirmOff() {
                location.reload();
            },
            confirmCancle(){
                this.confirmShow = false;
                this.confirmCancleSignal = true;
            },
            confirmCancleSuccess(){
                this.confirmCancleSignal = false;
                console.log("confirmCancleSuccess");
            },
            ifUpdatable(status) {
                if (status == "未發布" || status == "未開始") {
                    this.updatable = true;
                }
            },
            selectQuiz(quiz){
                this.selectedQuiz = quiz;
            },
            showUpdateQn(){
                this.ifShowUpdataQn = true;
            },
            showBack(){
                this.backShow = true;
            },
            closeBack(){
                this.backShow = false;
            },
            closeUpdateQn(){
                this.ifShowUpdataQn = false;
            },
            showUpdateQu(){
                this.ifShowUpdataQu = true;
            },
            closeUpdateQu(){
                this.ifShowUpdataQu = false;
            },
            getUpdatingQuizVo(quizVo){
                this.updatingQuizVo = quizVo;
            },


        },
        components: {
            AddQn,
            Confirm,
            UpdateQn,
            UpdateQu,
            UpdateConfirm
        },
        mounted() {
            this.getQuizVoList();
        },
        watch: {
            qn: function (qn) {
                this.quizVo.qn = qn;
            },
            quList: function (quList) {
                this.quizVo.quList = quList;
        },
    },

}
</script>

<template>
    <!-- {{ quizVoList }} -->
    <!-- {{ confirmShow }} -->
    <!-- {{ selectedRows }} -->
    <div v-show="confirmShow">
        <Confirm :quizVo="quizVo" @confirmOff="showConfirmOff()" @confirmCancle="confirmCancle()"/>
    </div>
    <div v-show="qnShow">
        <AddQn @addQn="getEmitQn" @closeQnShow="ifQnShow(), ifBackShow()" @popQn="popQn()" @addQuList="getEmitQuList"
            @emitConfirmShow="showConfirm()" :confirmCancleSignalProp="confirmCancleSignal" @confirmCancleSuccess="confirmCancleSuccess()"/>
    </div>
    <div v-show="backShow">
        <div class="header">
            <h1>後台</h1>
        </div>
        <div class="searchArea">
            <div class="searchTop">
                <label for="">問卷標題: </label>
                <input type="text" v-model="titleSearch">
                <!-- {{ titleSearch }} -->
            </div>
            <div class="searchBot">
                <label for="">開始: </label>
                <input type="date" v-model="startDateSearch">
                <!-- {{ startDateSearch }} -->
                <label for="">結束: </label>
                <input type="date" v-model="endDateSearch">
                <button type="button" @click="search()">搜尋</button>
            </div>
        </div>
        <div class="buttonGrp">
            <input type="button" value="delete" @click="deleteQn()">
            &nbsp
            <input type="button" value="add" @click="ifQnShow(), ifBackShow()">
        </div>
        <br>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>編號</th>
                        <th>名稱</th>
                        <th>狀態</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>結果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(a, index) in [...quizVoList].reverse().slice(pageStart, pageEnd)" :key="a.questionnaire.id">
                        <td><input type="checkbox" v-model="selectedRows[a.questionnaire.id]"></td>
                        <td>{{ a.questionnaire.id }}</td>
                        <td><a href="javascript:void(0);" @click="showUpdateQn(), closeBack(), selectQuiz(a), ifUpdatable(getStatus(a.questionnaire.published, a.questionnaire.startDate, a.questionnaire.endDate))">{{ a.questionnaire.title }}</a></td>
                        <td>{{ getStatus(a.questionnaire.published, a.questionnaire.startDate, a.questionnaire.endDate) }}</td>
                        <td>{{ a.questionnaire.startDate }}</td>
                        <td>{{ a.questionnaire.endDate }}</td>
                        <td>{{ "前往" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- //pagination -->
        <div class="pagination">
            <div class="page-item" @click.prevent="setPage(currentPage - 1)">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                &nbsp
            </div>
            &nbsp
            <div class="page-item" :class="{ 'active': (currentPage === (n)) }" v-for="(n, index) in totalPage" :key="index"
                @click.prevent="setPage(n)">
                <a class="page-link" href="#">{{ n }}</a>
                &nbsp
            </div>
            <div class="page-item" @click.prevent="setPage(currentPage + 1)">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </div>
        </div>
    </div>
    <div v-show="ifShowUpdataQn">
        <UpdateQn :updatableProp="updatable" :selectedQuizProp="selectedQuiz"
        @closeUpdateQn="closeUpdateQn()" @showUpdateQu="showUpdateQu()" @showBack="showBack()"
        @emitUpdatingQuizVo="getUpdatingQuizVo"/>
    </div>
    <div v-show="ifShowUpdataQu">
        <UpdateQu :updatableProp="updatable" :updatingQuizVoProp="updatingQuizVo"
        @closeUpdateQu="closeUpdateQu()" @showUpdateQn="showUpdateQn()" @emitUpdatingQuizVo="getUpdatingQuizVo"/>
    </div>
    <div v-show="ifShowUpdataConfirm">
        <UpdateConfirm :updatableProp="updatable" :selectedQuizProp="selectedQuiz"/>
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

.pagination {
    display: flex;
}

.table {
    height: 450px;
}
</style>
