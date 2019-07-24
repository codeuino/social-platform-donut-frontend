<template>
    <div class="todo-wrapper">
            <h3 class="cardTitle bg-dark text-white">{{TodayDate}} Todos</h3>
            <div class="cardContent">
              <b-form @submit="addTodo">
                <b-form-group>
                    <b-form-input
                    placeholder="Enter To Add Todo"
                    v-model="newTodo"
                    >
                    </b-form-input>
                </b-form-group>
            </b-form>
            <hr>
                <ul class="todo-list">
                    <Todo v-for="(todo, index) in todos" v-bind:key="index" :TodoObject="todo" v-on:del-todo='deleteTodo' />
                </ul>
            </div>

    </div>
</template>

<script>
import uuid from 'uuid'
import Todo from './Todo'
export default {
  name: 'Todos',
  components: {
    Todo
  },
  data () {
    return {
      todos: [

      ],
      newTodo: ''
    }
  },
  async mounted () {
    const response = await fetch('http://localhost:3000/todos/getTodos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')
      }
    })
    const data = await response.json()
    console.log(data)
    if (data.status !== 0) {
      this.todos = data.todos
    } else {
      console.log('Some Error Occured')
    }
  },
  methods: {
    async addTodo (e) {
      e.preventDefault()
      if (this.newTodo === '') {
        alert('Todo cannot be empty')
      } else {
        var newtodo = {
          id: uuid.v4(),
          title: this.newTodo,
          completedAt: null
        }
        this.todos.push(newtodo)
        this.newTodo = ''
        const response = await fetch('http://localhost:3000/todos/addTodo', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.$session.get('token')
          },
          body: JSON.stringify(newtodo)
        })
        const data = await response.json()
        console.log(data)
      }
    },
    async deleteTodo (id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      // Send this to db and delete it there as well :D
      const response = await fetch('http://localhost:3000/todos/deleteTodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token.secret_token
        },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      console.log(data)
    }
  },
  computed: {
    TodayDate () {
      return new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
    }
  }
}
</script>

<style scoped>

.todo-wrapper {
    background-color: white;
    min-width:300px;
    max-width: 300px;
    position: fixed;
    right: 0;
    bottom: 0;
    border: 1px solid grey;
    border-radius: 5px;
}
.todo-list {
    list-style: none;
    width: 100%;
    padding-left: 0;

}
.cardTitle {
  padding: 10px;
}
.cardContent {
  padding:10px;
}
@media screen and (max-width:600px){
  .todo-wrapper {
    display: none;
  }
}
</style>
