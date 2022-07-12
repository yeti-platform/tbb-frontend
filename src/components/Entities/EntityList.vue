<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h1">{{ entityTypeHuman.plural }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <router-link
            v-if="type"
            id="new-entity"
            class="btn btn-sm btn-outline-secondary"
            :to="{ name: 'NewEntity', params: { type } }"
            >{{ "New " + entityTypeHuman.singular }}</router-link
          >
        </div>
      </div>
    </div>
    <b-table :data="entities" :paginated="true" :per-page="10" :current-page.sync="currentPage">
      <b-table-column
        v-for="field in columns"
        v-bind:key="field.field"
        :field="field.field"
        :label="field.label"
        v-slot="entity"
      >
        <router-link v-if="field.field === 'name'" :to="{ name: 'EntityDetails', params: { id: entity.row.id } }">
          {{ entity.row[field.field] }}
        </router-link>
        <fields v-if="field.field !== 'name'" :field="field" :elt="entity.row" />
      </b-table-column>
    </b-table>
    <!-- <table-filter :filter-params="filterParams" detailComponent="EntityDetails" /> -->
    <router-view />
  </div>
</template>

<script>
// import TableFilter from "@/components/scaffolding/TableFilter";
import { listFields } from "./EntityFields.js";
import { entityTypes } from "./EntityTypes.js";
import Fields from "@/components/helpers/Fields";

import axios from "axios";

export default {
  components: {
    Fields
  },
  data() {
    return {
      entities: [],
      loading: false,
      currentPage: 1
    };
  },
  props: ["type"],
  computed: {
    filterParams() {
      return {
        apiPath: `/entities/filter/`,
        fields: listFields[this.type],
        queryKey: "name",
        typeFilter: this.type
      };
    },
    entityTypeHuman() {
      return entityTypes[this.type];
    },
    columns() {
      return listFields[this.type];
    }
  },

  methods: {
    fetchElements() {
      console.log("fetching elements");
      let params = {
        type: this.filterParams.typeFilter
      };
      params[this.filterParams.queryKey] = ""; //this.searchQuery;

      this.loading = true;
      axios
        .post(this.filterParams.apiPath, params)
        .then(response => {
          this.totalItems = response.data.length;
          this.entities = response.data.map(function(elt) {
            elt.selected = false;
            return elt;
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.fetchElements();
  },
  watch: {
    type: function() {
      this.fetchElements();
    }
  }
};
</script>
