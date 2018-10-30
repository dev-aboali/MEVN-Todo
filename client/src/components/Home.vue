<template>
  <div class="container home">
    <div class="row">
      <div class="col-md-6 mx-auto my-5">
        <h1 class="font-success text-center my-2">Full-stack Todo-list</h1>
        <div class="alert alert-danger" v-if="message">{{message}}</div>

          <form @submit.prevent="addNewTask()">
            <input type="text"
                   class="form-control"
                   placeholder="Type A New Task then Enter "
                   v-model="newTask">
          </form>
          <ul class="list-group mt-3">
            <transition-group name="task"
                              enter-active-class="animated fadeInUp"
                              leave-active-class="animated  bounceOutRight">
                <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="(task, index) in tasks"
                :key="task._id">

                  <div class="task">
                    <span class="badge badge-pill badge-success">{{index}}</span>
                    {{task.title}}
                  </div>
                  <button class="btn btn-danger"
                          @click="deleteTask(task._id)">
                          Delete
                  </button>
              </li>
            </transition-group>

          </ul>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:5555/api/tasks';
export default {
  name: 'Home',
  data() {
    return {
      newTask: '',
      tasks: [],
      message: '',
    };
  },
  mounted() {
    fetch(API_URL)
      .then(res => res.json())
      .then((data) => {
        this.tasks = data;
      });
  },
  methods: {
    addNewTask() {
      if (this.newTask === '') {
        this.message = 'You have to type something buddy!';
        setTimeout(() => {
          this.message = '';
        }, 2000);
      } else {
        const task = { title: this.newTask };
        fetch(`${API_URL}/add`, {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'content-type': 'application/json',
          },
        }).then(res => res.json())
          .then((data) => {
            this.tasks.push(data);
          });
        this.newTask = '';
      }
    },
    deleteTask(id) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      }).then(res => res.json())
        .then(() => {
          // eslint-disable-next-line
          const deletedTask = this.tasks.find(task => task._id === id);
          const taskIndex = this.tasks.indexOf(deletedTask);
          this.tasks.splice(taskIndex, 1);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  h1 {
    font-family: 'Caveat', cursive;
    color: #008f68;
  }
  .home {
    min-height: 600px;
  }
</style>
