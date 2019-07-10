<template>
    <div class="todo-wrapper">
        <b-card>
            <b-card-title><h3>{{TodayDate}} Todos</h3></b-card-title>
            <hr>
            
        </b-card>
    </div>
</template>

<script>

}
</script>

<style scoped>
.todo-wrapper {
    max-width:400px;
}
.todo-list {
    list-style: none;
    width: 100%;
    padding-left: 0;

}
.todo-list > div {
    line-height: 2;

}
</style>
