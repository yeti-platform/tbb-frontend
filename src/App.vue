<template>
  <div id="app">
    <!-- Top menu -->
    <navigation />
    <div class="section is-fullhd" v-if="isAuthenticated">
      <div class="columns">
        <div class="column is-one-fifth">
          <sidebar />
        </div>
        <div class="column container is-four-fifths is-fluid">
          <router-view />
        </div>
      </div>
    </div>
    <div v-else>
      <log-in />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/scaffolding/Sidebar";
import Navigation from "@/components/scaffolding/Navigation";
import LogIn from "@/components/LogIn";
import axios from "axios";

axios.defaults.baseURL = "/api";

export default {
  components: {
    Sidebar,
    Navigation,
    LogIn
  },
  name: "App",
  metaInfo: {
    title: "Yeti",
    titleTempalte: "Yeti | %s",
    htmlAttrs: {
      lang: "en"
    },
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }]
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss">
@import "style.scss";
</style>
