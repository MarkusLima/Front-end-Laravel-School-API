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
              @click="onPublish($route.params.school_id)"
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
            >
              Update school
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
  name: "Schools_edit",
  data() {
    return {
      name: "",
      address: "",
      body: {}
    };
  },
  methods: {
    onPublish(id) {
      console.log(id);
      axios
        .patch(`http://localhost:8000/api/schools/update/${id}`, {
          name: this.name,
          address: this.address
        })
        .then((response) => {
          if (response.data.success == "true") {
            alert("School atualizado com sucesso");
            this.name = "";
            this.address = "";
            this.$router.push({ name: "home" });
          } else {
            alert("Houve um erro, confira todos os dados e tente novamente!");
          }
        })
        .catch((error) => {
          alert("Houve um erro, confira todos os dados e tente novamente!");
          console.log(error);
        });
    }
  },
  created() {
    axios
      .get(`http://localhost:8000/api/schools/${this.$route.params.school_id}`)
      .then((response) => {
        this.name = response.data.entity.name;
        this.address = response.data.entity.address;
      })
      .catch((error) => {
        alert("Houve um erro, tente novamente!");
        console.log(error);
      });
  }
};
</script>
