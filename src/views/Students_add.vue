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
              <fieldset class="form-group">
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
              @click="onPublish()"
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
            >
              Save Student
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
  name: "Students_add",
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      dt_birth: "",
      genre: "male",
      body: {},
      classes: []
    };
  },
  methods: {
    onPublish() {
      this.body = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        dt_birth: this.dt_birth,
        genre: this.genre
      };
      axios
        .post("http://localhost:8000/api/students/create", this.body)
        .then((response) => {
          if (response.data.success == "false") {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          } else {
            alert("Class cadastrado com sucesso");
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
  }
};
</script>
