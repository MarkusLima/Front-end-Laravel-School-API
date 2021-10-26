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
            :to="{ name: 'schools_add' }"
          >
            Create new School
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
                <th scope="col">Address</th>
                <th scope="col">Number Students</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="school in schools.entity" :key="school.id">
                <th scope="row">{{ school.id }}</th>
                <td>{{ school.name }}</td>
                <td>{{ school.address }}</td>
                <td>{{ school.total_students }}</td>
                <td>
                  <router-link
                    class="btn btn-outline-info"
                    active-class="active"
                    exact
                    :to="{
                      name: 'schools_edit',
                      params: { school_id: school.id }
                    }"
                  >
                    Edit
                  </router-link>
                  <button
                    @click="deleteSchool(school.id)"
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
      schools: [],
      search: ""
    };
  },
  methods: {
    initialize() {
      axios.get("http://localhost:8000/api/schools").then((response) => {
        this.schools = response.data;
        this.search = "";
      });
    },
    deleteSchool(id) {
      axios
        .delete(`http://localhost:8000/api/schools/delete/${id}`)
        .then(() => {
          alert("School deletado com sucesso");
          this.initialize();
        })
        .catch(() => alert("Houve um erro, tente novamente!"));
    },
    findbyName() {
      axios
        .get(`http://localhost:8000/api/schools/search/${this.search}`)
        .then((response) => {
          if (response.data.msg == "not found") {
            alert("not found!");
            this.search = "";
          } else {
            this.schools = response.data;
          }
        });
    }
  },
  created() {
    this.initialize();
  }
};
</script>
