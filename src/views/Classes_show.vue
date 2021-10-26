<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset class="row">
              <fieldset class="col-sm-4 form-group">
                <small>Year</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="year"
                  placeholder="Year..."
                />
              </fieldset>
              <fieldset class="col-sm-4 form-group">
                <small>Level education</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="level_education"
                  placeholder="level education..."
                />
              </fieldset>
              <fieldset class="col-sm-4 form-group">
                <small>Serie</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="serie"
                  placeholder="serie..."
                />
              </fieldset>
              <fieldset class="col-sm-4 form-group">
                <small>Shift</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="shift"
                  placeholder="shift..."
                />
              </fieldset>
              <fieldset class="col-sm-4 mb-3">
                <small>School</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="selected"
                  placeholder="shift..."
                />
              </fieldset>
            </fieldset>
            <h4>Students</h4>
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
                    <tr v-for="classe in classes" :key="classe.id">
                      <th scope="row">{{ classe.id }}</th>
                      <td>{{ classe.student.name }}</td>
                      <td>{{ classe.student.phone }}</td>
                      <td>{{ classe.student.email }}</td>
                      <td>{{ classe.student.dt_birth }}</td>
                      <td>{{ classe.student.genre }}</td>
                      <td>
                        <router-link
                          class="btn btn-outline-warning"
                          active-class="active"
                          exact
                          :to="{
                            name: 'students_add_class',
                            params: { student_id: classe.student.id }
                          }"
                        >
                          Edit class
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <router-link
              class="btn btn-outline-warning btn-lg"
              active-class="active"
              exact
              :to="{ name: 'classes' }"
            >
              Back
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Classes_edit",
  data() {
    return {
      year: "",
      level_education: "",
      serie: "",
      shift: "",
      selected: "",
      body: {},
      classes: []
    };
  },
  methods: {
    initialize() {
      axios
        .get(`http://localhost:8000/api/classes/${this.$route.params.class_id}`)
        .then((response) => {
          console.log(response.data);
          this.class_rooms = response.data;
          this.search = "";
          this.year = response.data.entity.year;
          this.level_education = response.data.entity.level_education;
          this.serie = response.data.entity.serie;
          this.shift = response.data.entity.shift;
          this.selected = response.data.entity.school.name;
          this.classes = response.data.student_class_room;
        });
    },
    onPublish(id) {
      this.body = {
        year: this.year,
        level_education: this.level_education,
        serie: this.serie,
        shift: this.shift,
        school_id: this.selected
      };
      axios
        .patch(`http://localhost:8000/api/classes/update/${id}`, this.body)
        .then((response) => {
          if (response.data.success == "false") {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          } else {
            alert("Class atualizado com sucesso");
            this.year = "";
            this.level_education = "";
            this.serie = "";
            this.shift = "";
            this.selected = "";
            this.$router.push({ name: "classes" });
          }
        })
        .catch((error) => {
          alert("Houve um erro, confira todos os dados e tente novamente!");
          console.log(error);
        });
    }
  },
  created() {
    this.initialize();
  }
};
</script>
