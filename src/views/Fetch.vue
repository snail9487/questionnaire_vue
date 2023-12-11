<script>
export default {
    data() {
        return {
            post: [],
            quizSearchReq:{
                "title": "",
                "startDate": null,
                "endDate": null,
            },
        }
    },
    methods: {
        search() {
            fetch("http://localhost:8080/api/quiz/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.quizSearchReq)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.dir(data);
                    this.post = data;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<template>
    <button @click="search">Show Posts</button>
    <hr>
    <h2>{{ post }}</h2>
</template>

<style lang="scss" scoped></style>