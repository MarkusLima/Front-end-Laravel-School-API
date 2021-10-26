<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="year"
                  placeholder="Year..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="level_education"
                  placeholder="level education..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="serie"
                  placeholder="serie..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="shift"
                  placeholder="shift..."
                />
              </fieldset>
              <fieldset class="mb-3">
                <select class="form-control" v-model="selected">
                  <option
                    v-for="school in schools.entity"
                    :key="school.id"
                    v-bind:value="school.id"
                  >
                    {{ school.name }}
                  </option>
                </select>
              </fieldset>
            </fieldset>
            <router-link
              class="btn btn-outline-warning btn-lg"
              active-class="active"
              exact
              :to="{ name: 'classes' }"
            >
              Cancel
            </router-link>
            <button
              @click="onPublish()"
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
            >
              Save Class
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Classes_add",
  data() {
    return {
      year: "",
      level_education: "",
      serie: "",
      shift: "",
      selected: "",
      body: {},
      schools: []
    };
  },
  methods: {
    initialize() {
      axios.get("http://localhost:8000/api/schools").then((response) => {
        this.schools = response.data;
        this.search = "";
      });
    },
    onPublish() {
      this.body = {
        year: this.year,
        level_education: this.level_education,
        serie: this.serie,
        shift: this.shift,
        school_id: this.selected
      };
      axios
        .post("http://localhost:8000/api/classes/create", this.body)
        .then((response) => {
          if (response.data.success == "false") {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          } else {
            alert("Class cadastrado com sucesso");
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
