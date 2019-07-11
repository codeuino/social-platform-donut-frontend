<template>
    <div class="search-wrapper">
    <h1>
        This is Search Results
    </h1>
    <Todos/>
    </div>
</template>
<script>
import Todos from '@/components/Todos.vue'
export default {
  name: 'Search',
  components: {
    Todos
  }

}
</script>
<style scoped>
.search-wrapper{
  min-height: 100vh;
}
</style>
