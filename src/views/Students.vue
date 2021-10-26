<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Mkbits</h1>
        <p>Sistema de Gestão Escolar</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <router-link
            class="btn btn-outline-info"
            active-class="active"
            exact
            :to="{ name: 'students_add' }"
          >
            Create new Student
          </router-link>
        </div>

        <div class="col-md-6">
          <div class="input-group">
            <div class="form-outline">
              <input
                type="search"
                id="form1"
                v-model="search"
                placeholder="..."
                class="form-control"
              />
            </div>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="findbyName()"
            >
              Search
            </button>
            <button @click="initialize()" class="btn btn-outline-info">
              To clean
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" style="overflow-x: scroll">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Date birth</th>
                <th scope="col">Genre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students.entity" :key="student.id">
                <th scope="row">{{ student.id }}</th>
                <td>{{ student.name }}</td>
                <td>{{ student.phone }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.dt_birth }}</td>
                <td>{{ student.genre }}</td>
                <td>
                  <router-link
                    class="btn btn-outline-info"
                    active-class="active"
                    exact
                    :to="{
                      name: 'students_edit',
                      params: { student_id: student.id }
                    }"
                  >
                    Edit
                  </router-link>
                  <router-link
                    class="btn btn-outline-warning"
                    active-class="active"
                    exact
                    :to="{
                      name: 'students_add_class',
                      params: { student_id: student.id }
                    }"
                  >
                    Add to class
                  </router-link>
                  <button
                    @click="deleteStudent(student.id)"
                    class="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",

  data() {
    return {
      students: [],
      search: ""
    };
  },
  methods: {
    initialize() {
      axios.get("http://localhost:8000/api/students").then((response) => {
        this.students = response.data;
        this.search = "";
      });
    },
    deleteStudent(id) {
      axios
        .delete(`http://localhost:8000/api/students/delete/${id}`)
        .then(() => {
          alert("Students deletado com sucesso");
          this.initialize();
        })
        .catch(() => alert("Houve um erro, tente novamente!"));
    },
    findbyName() {
      axios
        .get(`http://localhost:8000/api/students/search/${this.search}`)
        .then((response) => {
          if (response.data.msg == "not found") {
            alert("not found!");
            this.search = "";
          } else {
            this.students = response.data;
          }
        });
    }
  },
  created() {
    this.initialize();
  }
};
</script>
