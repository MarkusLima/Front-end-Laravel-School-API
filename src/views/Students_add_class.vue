<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset class="row">
              <fieldset class="col-sm-4 form-group">
                <small>Name</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="name"
                  placeholder="name..."
                />
              </fieldset>
              <fieldset class="col-sm-4 form-group">
                <small>Phone</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="phone"
                  placeholder="level education..."
                />
              </fieldset>
              <fieldset class="col-sm-4 form-group">
                <small>Email</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="email"
                  placeholder="serie..."
                />
              </fieldset>
              <fieldset class="col-sm-4 form-group">
                <small>Date birth</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="dt_birth"
                  placeholder="shift..."
                />
              </fieldset>
              <fieldset class="col-sm-4 mb-3">
                <small>Genre</small>
                <input
                  disabled
                  type="text"
                  class="form-control form-control-lg"
                  v-model="genre"
                  placeholder="shift..."
                />
              </fieldset>
              <fieldset class="col-sm-6 mb-3">
                <select
                  class="form-control"
                  v-model="selected_school"
                  @change="onchageSchoolClass($event)"
                >
                  <option
                    v-for="school in schools.entity"
                    :key="school.id"
                    v-bind:value="school.id"
                  >
                    {{ school.name }}
                  </option>
                </select>
              </fieldset>
              <fieldset class="col-sm-6 mb-3">
                <select class="form-control" v-model="selected_class">
                  <option
                    v-for="class_room in class_rooms.entity"
                    :key="class_room.id"
                    v-bind:value="class_room.id"
                  >
                    {{ class_room.year }} -- {{ class_room.serie }}
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
              Back
            </router-link>
            <button
              @click="onPublish()"
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
            >
              Add student on the class
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
  name: "Classes_add_class",
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      dt_birth: "",
      genre: "",
      selected_school: "",
      selected_class: "",
      body: {},
      schools: [],
      class_rooms: []
    };
  },
  methods: {
    initialize() {
      axios
        .get(
          `http://localhost:8000/api/students/${this.$route.params.student_id}`
        )
        .then((response) => {
          this.search = "";
          this.name = response.data.entity.name;
          this.phone = response.data.entity.phone;
          this.email = response.data.entity.email;
          this.dt_birth = response.data.entity.dt_birth;
          this.genre = response.data.entity.genre;
        });
    },
    onchageSchoolClass(event) {
      console.log(event.target.value);
      axios
        .get(
          `http://localhost:8000/api/classes/change_school/${event.target.value}`
        )
        .then((response) => {
          this.class_rooms = response.data;
        });
    },
    onchageSchool() {
      axios.get(`http://localhost:8000/api/schools`).then((response) => {
        this.schools = response.data;
      });
    },
    onPublish() {
      this.body = {
        class_room_id: this.selected_class,
        student_id: this.$route.params.student_id
      };
      axios
        .post(`http://localhost:8000/api/class_student/create/`, this.body)
        .then((response) => {
          if (response.data.success == "false") {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          } else {
            alert("Ação realizada com sucesso");
            this.name = "";
            this.level_education = "";
            this.serie = "";
            this.shift = "";
            this.selected = "";
            this.$router.push({ name: "students" });
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
    this.onchageSchool();
  }
};
</script>
