<script>
export default {
    data() {
        return {
            datas: [1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1,],//要呈現的資料
            perpage: 10, //一頁的資料數
            currentPage: 1,
            quizVoList: [],
            titleSearch:"",
            startDateSearch:"",
            endDateSearch:""
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
        }
    },
    methods: {
        setPage(page) {
            if (page <= 0 || page > this.totalPage) {
                return
            }
            this.currentPage = page
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
                        "published":false
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
        search(){
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
                        "published":false
                    }
                )
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                    if(data.quizVoList == null){
                        this.quizVoList = [];
                    }
                    else{
                        this.quizVoList = data.quizVoList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getStatus(startDate,endDate){
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
        }
    },
    components: {

    },
    mounted() {
        this.getQuizVoList();
    },
}
</script>

<template>
    <!-- {{ this.quizVoList }} -->
    <div class="homeC">
        <div class="header">
            <h1>前台</h1>
        </div>
        <div class="searchArea">
            <div class="searchTop">
                <label for="">問卷標題: </label>
                <input type="text" v-model="titleSearch">
            </div>
            <div class="searchBot">
                <label for="">開始: </label>
                <input type="date" v-model="startDateSearch">
                <label for="">結束: </label>
                <input type="date" v-model="endDateSearch">
                <button type="button" @click="search()">搜尋</button>
            </div>
        </div>
        <br>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>編號</th>
                        <th>名稱</th>
                        <th>狀態</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>結果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="a in [...quizVoList].reverse().slice(pageStart, pageEnd)">
                        <td>{{ a.questionnaire.id }}</td>
                        
                        <td><RouterLink :to="'/Questionnaire/' + a.questionnaire.id"> {{ a.questionnaire.title }} </RouterLink></td>
                        <td>{{ getStatus(a.questionnaire.startDate, a.questionnaire.endDate) }}</td>
                        <td>{{ a.questionnaire.startDate }}</td>
                        <td>{{ a.questionnaire.endDate }}</td>
                        <td>{{ "前往" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <ul> -->
        <!-- <li v-for="item in datas.slice(pageStart, pageEnd)">
                {{ item }}
            </li> -->
        <!-- </ul> -->
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
