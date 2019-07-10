<template>
    <div>
    <h1>
        This is Search Results
    </h1>
    <Todos/>
    </div>
</template>
<script>
import News from '@/components/Newsletter.vue'
import Todos from '@/components/Todos.vue'
export default {
  name: 'Search',
  components: {
    News,
    Todos
  }

}
</script>
