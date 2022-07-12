<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h1">{{ indicatorTypeHuman.plural }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <router-link
            v-if="type"
            id="new-indicator"
            class="btn btn-sm btn-outline-secondary"
            :to="{ name: 'NewIndicator', params: { type } }"
            >{{ "New " + indicatorTypeHuman.singular }}</router-link
          >
        </div>
      </div>
    </div>
    <b-table :data="indicators" :paginated="true" :per-page="10" :current-page.sync="currentPage">
      <b-table-column
        v-for="field in columns"
        v-bind:key="field.field"
        :field="field.field"
        :label="field.label"
        v-slot="indicator"
      >
        <router-link v-if="field.field === 'name'" :to="{ name: 'IndicatorDetails', params: { id: indicator.row.id } }">
          {{ indicator.row[field.field] }}
        </router-link>
        <fields v-if="field.field !== 'name'" :field="field" :elt="indicator.row" />
      </b-table-column>
    </b-table>
    <router-view />
  </div>
</template>

<script>
import { listFields } from "./IndicatorFields.js";
import { indicatorTypes } from "./IndicatorTypes.js";

import axios from "axios";

export default {
  components: {},
  props: ["type"],
  data() {
    return {
      indicators: [],
      loading: false,
      currentPage: 1
    };
  },
  computed: {
    filterParams() {
      return {
        apiPath: `/indicators/filter/`,
        fields: listFields[this.type],
        queryKey: "name",
        typeFilter: this.type
      };
    },
    indicatorTypeHuman() {
      return indicatorTypes[this.type];
    },
    columns() {
      return listFields[this.type];
    }
  },
  methods: {
    fetchElements() {
      console.log("fetching indicators");
      let params = {
        type: this.filterParams.typeFilter
      };
      params[this.filterParams.queryKey] = ""; //this.searchQuery;

      this.loading = true;
      axios
        .post(this.filterParams.apiPath, params)
        .then(response => {
          this.totalItems = response.data.length;
          this.indicators = response.data.map(function(elt) {
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
