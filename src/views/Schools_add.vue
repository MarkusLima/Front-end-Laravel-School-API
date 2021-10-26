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
                  placeholder="School name..."
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="address"
                  placeholder="School address..."
                />
              </fieldset>
            </fieldset>
            <router-link
              class="btn btn-outline-warning btn-lg"
              active-class="active"
              exact
              :to="{ name: 'home' }"
            >
              Cancel
            </router-link>
            <button
              @click="onPublish()"
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
            >
              Save School
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
  name: "Schools_add",
  data() {
    return {
      name: "",
      address: "",
      errors: {},
      body: {}
    };
  },
  methods: {
    onPublish() {
      this.body = { name: this.name, address: this.address };
      axios
        .post("http://localhost:8000/api/schools/create", this.body)
        .then((response) => {
          if (response.data == "false") {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          } else {
            alert("School cadastrado com sucesso");
            this.name = "";
            this.address = "";
            this.$router.push({ name: "home" });
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
