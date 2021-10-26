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
            :to="{ name: 'classes_add' }"
          >
            Create new Class
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
              @click="findbyYears()"
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
                <th scope="col">Year</th>
                <th scope="col">Level education</th>
                <th scope="col">Serie</th>
                <th scope="col">Shift</th>
                <th scope="col">School</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="class_room in class_rooms.entity" :key="class_room.id">
                <th scope="row">{{ class_room.id }}</th>
                <td>{{ class_room.year }}</td>
                <td>{{ class_room.level_education }}</td>
                <td>{{ class_room.serie }}</td>
                <td>{{ class_room.shift }}</td>
                <td>{{ class_room.school.name }}</td>
                <td>
                  <router-link
                    class="btn btn-outline-success"
                    active-class="active"
                    exact
                    :to="{
                      name: 'classes_show',
                      params: { class_id: class_room.id }
                    }"
                  >
                    Details
                  </router-link>
                  <router-link
                    class="btn btn-outline-info"
                    active-class="active"
                    exact
                    :to="{
                      name: 'classes_edit',
                      params: { class_id: class_room.id }
                    }"
                  >
                    Edit
                  </router-link>
                  <button
                    @click="deleteSchool(class_room.id)"
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
      class_rooms: [],
      search: ""
    };
  },
  methods: {
    initialize() {
      axios.get("http://localhost:8000/api/classes").then((response) => {
        this.class_rooms = response.data;
        this.search = "";
      });
    },
    deleteSchool(id) {
      axios
        .delete(`http://localhost:8000/api/classes/delete/${id}`)
        .then(() => {
          alert("School deletado com sucesso");
          this.initialize();
        })
        .catch(() => alert("Houve um erro, tente novamente!"));
    },
    findbyYears() {
      axios
        .get(`http://localhost:8000/api/classes/search/${this.search}`)
        .then((response) => {
          if (response.data.msg == "not found") {
            alert("not found!");
            this.search = "";
          } else {
            this.class_rooms = response.data;
          }
        });
    }
  },
  created() {
    this.initialize();
  }
};
</script>
