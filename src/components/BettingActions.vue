<template>
  <div class="page">
    <div class="actions">
      <div class="actions__main">
        <form class="actions__new-todo" @submit.prevent="addTodo">
          <h3>WOULD YOU LIKE TO ADD A NEW RECORD?</h3>
          <label>User ID:</label>
          <input v-model.number="newTodo.userId" />

          <label>Title:</label>
          <input v-model="newTodo.title" />

          <button type="submit" class="actions__addNewTodo">Add</button>
        </form>
      </div>

      <div class="actions__second">
        <div class="actions__filter-todo-status">
          <label>Filter by status: </label>
          <select v-model="selectedStatus">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            <option value="favorites">Favorites</option>
          </select>
        </div>

        <div class="actions__filter-todo-user">
          <label>Filter by user: </label>
          <select v-model="selectedUserId">
            <option value="all">All Users</option>
            <option v-for="userOption in userOptions" :key="userOption" :value="userOption">
              User: {{userOption}}
            </option>
          </select>
        </div>

        <div class="actions__filter-todo">
          <label for="title">Search by title: </label>
          <input id="title" v-model="searchKey" placeholder="title" />
        </div>
      </div>
    </div>

    <div class="actions__todos">
      <div class="actions__todos-pagination">
        <button @click="previousPage" :disabled="currentPage === 1">PREV</button>
        <span class="actions__current-page">{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">NEXT</button>
      </div>
      <ol class="actions__todos-list">
        <li v-for="todo in paginatedTodos" :key="todo.id">
          {{todo.id}}. (User ID: {{ todo.userId }}) {{ todo.title }}
          <button @click="toggleFavorite(todo.id)" class="actions__addToFavorite">
            {{ favoriteTodos.includes(todo.id) ? 'Remove from Favorites' : 'Add to Favorites' }}
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      todos: [],
      currentPage: 1,
      todosPerPage: 10,
      favoriteTodos: [],
      selectedStatus: "all",
      selectedUserId: "all",
      searchKey: "",
      newTodo: {
        userId: null,
        title: "",
      },
      users: [],
    };
  },
  computed: {
    paginatedTodos() {
      const start = (this.currentPage - 1) * this.todosPerPage;
      const end = start + this.todosPerPage;
      return this.filteredTodos.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredTodos.length / this.todosPerPage);
    },
    filteredTodos() {
      this.resetPagination();
      return this.todos.filter(todo => {
        let bySearch = true;
        let byUser = true;
        let byStatus = true;

        if (this.searchKey !== "" && !todo.title.toLowerCase().includes(this.searchKey.toLowerCase())) {
            bySearch = false;
        }

        if (this.selectedUserId !== 'all' && !(todo.userId === parseInt(this.selectedUserId))) {
          byUser = false;
        }

        if (this.selectedStatus !== 'all' &&
            !(this.selectedStatus === 'completed' && todo.completed) &&
            !(this.selectedStatus === 'uncompleted' && !todo.completed) &&
            !(this.selectedStatus === 'favorites' && this.favoriteTodos.includes(todo.id))
        ) {
          byStatus = false;
        }

        return  byUser && bySearch && byStatus;
      });
    },
    userOptions() {
      return Array.from(new Set(this.todos.map(todo => todo.userId)));
    },
  },
  methods: {
    fetchData() {
      axios.get('https://jsonplaceholder.typicode.com/todos')
          .then(response => {
            this.todos = response.data;
          })
          .catch(error => {
            console.error('Error fetching todos ', error);
          });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    resetPagination() {
      this.currentPage = 1;
    },
    toggleFavorite(todoId) {
      if (this.favoriteTodos.includes(todoId)) {
        this.favoriteTodos = this.favoriteTodos.filter(id => id !== todoId);
      } else {
        this.favoriteTodos.push(todoId);
      }
      localStorage.setItem('favoriteTodos', JSON.stringify(this.favoriteTodos));
    },
    addTodo() {
      if (!this.newTodo.userId || !this.newTodo.title) {
        return;
      }

      axios.post('https://jsonplaceholder.typicode.com/todos', this.newTodo)
          .then(response => {
            const newTodo = response.data;

            this.todos.push(newTodo);

            this.newTodo.userId = '';
            this.newTodo.title = '';

            console.log('Todo added successfully ', newTodo);
            console.log('All todos', this.todos);
          })
          .catch(error => {
            console.error('Error adding todo ', error);
          });
    },
  },
  mounted() {
    this.fetchData();

    const storedFavoritesTodos = localStorage.getItem('favoriteTodos');
    this.favoriteTodos = storedFavoritesTodos ? JSON.parse(storedFavoritesTodos) : [];
  },
};
</script>

<style scoped lang="scss">
.page {
  padding: 60px;

  .actions {
    display: flex;
    flex-direction: row;

    &__main {
      padding: 25px;
      background-color: #097e7b;
      border-right: 3px solid black;
    }

    &__second {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 25px;
      background-color: #097e7b;

      select {
        padding: 3px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
      }

      input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    &__new-todo {
      display: flex;
      flex-direction: column;
      gap: 5px;

      h3 {
        margin-bottom: 8px;
      }
    }

    &__todos {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__todos-list {
      margin-top: 10px;

      li {
        overflow-wrap: break-word;
        display: flex;
        justify-content: space-between;
        color: white;
        background-color: #097e7b;
        min-height: 35px;
        width: 950px;
        line-height: 35px;
        padding: 10px;
        margin-bottom: 10px;
        transition: transform 0.4s ease;
        border-radius: 8px;
      }

      li:hover {
        transform: scale(1.02);
      }
    }

    &__todos-pagination {
      margin-top: 10px;
    }

    &__current-page {
      display: inline-block;
      padding-left: 4px;
      padding-right: 4px;
    }

    &__addNewTodo {
      background-color: #15172b;
      border-radius: 12px;
      border: 0;
      box-sizing: border-box;
      color: #eee;
      cursor: pointer;
      font-size: 18px;
      height: 35px;
      outline: 0;
      text-align: center;
      width: 60%;
      margin: 10px auto 0;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    &__addToFavorite {
      background-color: #15172b;
      color: #fff;
      padding: 10px 15px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-left: auto;
      max-height: 38px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
}

@media (max-width: 768px) {
  .page {
    padding: 40px;

    .actions {
      display: flex;
      flex-direction: column;

      &__main {
        padding: 25px;
        background-color: #097e7b;
        border: none;
        margin-bottom: 10px;
      }

      &__second {
        input {
          margin-top: 5px;
        }
      }

      &__todos {
        display: flex;
        flex-direction: column;
      }

      &__todos-list {
        display: flex;
        flex-direction: column;

        li {
          overflow-wrap: break-word;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: white;
          max-width: 300px;
          background-color: #097e7b;
          padding: 10px;
          margin-bottom: 10px;
          transition: transform 0.4s ease;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
