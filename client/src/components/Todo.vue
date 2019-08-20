<template>
    <div class="todo-row" :class="isComplete ? 'completed' : ''">
        <input type="checkbox" name="" id="" :disabled="isComplete" @click="completeTodo">
        {{TodoObject.title}}
        <button class="del" @click="$emit('del-todo',TodoObject.id)">X</button>
    </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      isComplete: false
    }
  },
  props: {
    TodoObject: Object
  },
  computed: {
  },
  methods: {
    async completeTodo () {
      this.isComplete = true
      const response = await fetch(this.$store.state.BaseURL + '/todos/completeTodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token.secret_token
        },
        body: JSON.stringify({ id: this.TodoObject.id })
      })
      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
      } else {
        alert('Failed to update todo')
      }
    }
  },
  mounted () {
    if (this.TodoObject.completedAt !== null) {
      this.isComplete = true
    }
  }
}
</script>

<style scoped>
.todo-row {
    word-break: break-all;
    line-height: 2;
    font-size: 16px;
    border-bottom: 1px solid rgba(0,0,0,0.5)
}
.del {
    float: right;
    opacity: 0.7;
}
.completed {
  text-decoration: line-through
}
</style>
