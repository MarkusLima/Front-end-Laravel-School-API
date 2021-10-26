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
                  v-model="name"
                  placeholder="name..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="phone"
                  placeholder="phone..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="email"
                  placeholder="email..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="date"
                  class="form-control form-control-lg"
                  v-model="dt_birth"
                  placeholder="dt_birth..."
                />
              </fieldset>
              <fieldset class="form-group-lg">
                <select class="form-control" v-model="genre">
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                </select>
              </fieldset>
            </fieldset>
            <router-link
              class="btn btn-outline-warning btn-lg"
              active-class="active"
              exact
              :to="{ name: 'students' }"
            >
              Cancel
            </router-link>
            <button
              @click="onPublish($route.params.student_id)"
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
            >
              Update Student
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
  name: "Students_edit",
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      dt_birth: "",
      genre: "male",
      body: {},
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
    onPublish(id) {
      this.body = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        dt_birth: this.dt_birth,
        genre: this.genre
      };
      axios
        .patch(`http://localhost:8000/api/students/update/${id}`, this.body)
        .then((response) => {
          if (response.data.success == "false") {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          } else {
            alert("Students atualizado com sucesso");
            this.name = "";
            this.phone = "";
            this.email = "";
            this.dt_birth = "";
            this.genre = "";
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
  }
};
</script>
