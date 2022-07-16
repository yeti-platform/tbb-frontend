<template>
  <b-navbar :shadow="true" type="is-dark" class="tbb-navbar">
    <template slot="brand">
      <b-navbar-item href="#">
        Yeti
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="!isAuthenticated" tag="router-link" :to="{ name: 'LogIn' }">Log in</b-navbar-item>
      <b-navbar-item v-if="isAuthenticated" tag="div">
        <p>{{ tokenSubject }}</p>
      </b-navbar-item>
      <b-navbar-item v-if="isAuthenticated" tag="div">
        <a class="button is-light" @click="logOut">Log out</a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    tokenSubject() {
      return this.$store.getters.tokenSubject;
    }
  },
  methods: {
    logOut() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  }
};
</script>

<style lang="css">
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.navbar .form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
