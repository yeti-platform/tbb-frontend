<template>
  <!-- Display details nicely -->
  <span v-if="loading" class="loading">
    <i class="fas fa-circle-notch fa-spin fa-5x m-5"></i>
  </span>
  <div v-else-if="!edit" class="indicator-details">
    <!-- Title and edit button -->
    <div id="header">
      <h2 class="subtitle">
        {{ indicatorTypeHuman.singular }}
      </h2>
      <h1 class="title">
        {{ indicator.name }}
        <b-button tag="router-link" :to="{ name: 'IndicatorEdit', params: { id: id } }">Edit</b-button>
      </h1>

      <fields :field="{ type: 'list', field: 'labels' }" :elt="indicator" />
    </div>

    <b-tabs :animated="false">
      <b-tab-item label="Main" class="content">
        <table class="table">
          <tr>
            <th>Created:</th>
            <td><fields :field="{ type: 'datetime', field: 'created' }" :elt="indicator" /></td>
            <th>Modified:</th>
            <td><fields :field="{ type: 'datetime', field: 'modified' }" :elt="indicator" /></td>
          </tr>
          <tr v-if="indicator.tool_version">
            <th>Tool version</th>
            <td>{{ indicator.tool_version }}</td>
          </tr>
          <tr v-if="indicator.action">
            <th>Action</th>
            <td>{{ indicator.action }}</td>
          </tr>
          <tr v-if="indicator.idindicator_class">
            <th>Idindicator class</th>
            <td colspan="5">{{ indicator.idindicator_class }}</td>
          </tr>
          <tr v-if="indicator.sectors">
            <th>Sectors</th>
            <td colspan="5"><fields :field="{ type: 'list', field: 'sectors' }" :elt="indicator" /></td>
          </tr>
          <tr v-if="indicator.contact_information">
            <th>Contact info</th>
            <td colspan="5">{{ indicator.contact_information }}</td>
          </tr>
          <tr v-if="indicator.aliases">
            <th>Aliases</th>
            <td colspan="5"><fields :field="{ type: 'list', field: 'aliases' }" :elt="indicator" /></td>
          </tr>
          <tr v-if="indicator.kill_chain_phases">
            <th>Kill-chain phases</th>
            <td colspan="5"><fields :field="{ type: 'killchain', field: 'kill_chain_phases' }" :elt="indicator" /></td>
          </tr>
          <tr v-if="indicator.first_seen || indicator.last_seen">
            <th>First seen:</th>
            <td><fields :field="{ type: 'datetime', field: 'first_seen' }" :elt="indicator" /></td>
            <th>Last seen:</th>
            <td><fields :field="{ type: 'datetime', field: 'last_Seen' }" :elt="indicator" /></td>
          </tr>
          <tr v-if="indicator.objective">
            <th>Objective</th>
            <td colspan="5">{{ indicator.objective }}</td>
          </tr>
          <tr v-if="indicator.roles || indicator.sophistication">
            <th>Roles</th>
            <td><fields :field="{ type: 'list', field: 'roles' }" :elt="indicator" /></td>
            <th>Sophistication</th>
            <td>{{ indicator.sophistication }}</td>
          </tr>
          <tr v-if="indicator.goals || indicator.resource_level">
            <th>Goals</th>
            <td><fields :field="{ type: 'list', field: 'goals' }" :elt="indicator" /></td>
            <th>Resource level</th>
            <td>{{ indicator.resource_level }}</td>
          </tr>
          <tr v-if="indicator.primary_motivation || indicator.secondary_motivations || indicator.personal_motivations">
            <th>Primary motivation</th>
            <td>{{ indicator.primary_motivation }}</td>
            <th>Secondary</th>
            <td><fields :field="{ type: 'list', field: 'secondary_motivations' }" :elt="indicator" /></td>
            <th>Personal</th>
            <td><fields :field="{ type: 'list', field: 'personal_motivations' }" :elt="indicator" /></td>
          </tr>
        </table>

        <div class="description">
          <h2>Description</h2>
          <markdown-text :text="indicator.description || 'No description'"></markdown-text>
        </div>

        <div class="pattern">
          <h2>Pattern</h2>
          <fields :field="{ type: 'code', field: 'pattern' }" :elt="indicator"></fields>
        </div>
      </b-tab-item>

      <b-tab-item label="Details">
        <div class="details content">
          <h2>Details</h2>
          <table class="table">
            <tr>
              <td>Type</td>
              <td><fields :field="{ type: 'code', field: 'type' }" :elt="indicator" /></td>
            </tr>
            <tr>
              <td>STIX ID</td>
              <td><fields :field="{ type: 'code', field: 'id' }" :elt="indicator" /></td>
            </tr>
            <tr>
              <td>Created by</td>
              <td><fields :field="{ type: 'code', field: 'created_by_ref' }" :elt="indicator" /></td>
            </tr>
            <tr>
              <td>Created</td>
              <td><fields :field="{ type: 'datetime', field: 'created' }" :elt="indicator" /></td>
            </tr>
            <tr>
              <td>Modified</td>
              <td><fields :field="{ type: 'datetime', field: 'modified' }" :elt="indicator" /></td>
            </tr>
            <tr>
              <td>Revoked</td>
              <td><fields :field="{ type: 'boolean', field: 'revoked' }" :elt="indicator" /></td>
            </tr>
            <tr v-for="ref in indicator.external_references" v-bind:key="ref.source_name">
              <td>External reference</td>
              <td>
                <a :href="ref.url" target="_blank">{{ ref.source_name }}</a>
                <small v-if="ref.description"><br />{{ ref.description }}</small>
                <small v-if="ref.external_id"><br />{{ ref.external_id }}</small>
              </td>
            </tr>
            <tr>
              <td>Object markings</td>
              <td>
                <code v-bind:key="ref" v-for="ref in indicator.object_marking_refs">{{ ref }}</code>
              </td>
            </tr>
            <tr>
              <td>Granular markings</td>
              <td>
                <code v-bind:key="marking" v-for="marking in indicator.granular_markings">{{ marking }}</code>
              </td>
            </tr>
          </table>

          <div v-if="getSpecificProperties(indicator).length > 0">
            <h2>{{ indicatorTypeHuman.singular }} specific properties</h2>
            <table class="table">
              <tr v-for="prop in getSpecificProperties(indicator)" v-bind:key="prop.name">
                <td>
                  <code>{{ prop.name }}</code>
                </td>
                <td>{{ prop.value }}</td>
              </tr>
            </table>
          </div>
          <div v-if="getExtendedProperties(indicator).length > 0">
            <h2>Extended properties</h2>
            <table class="table">
              <tr v-for="prop in getExtendedProperties(indicator)" v-bind:key="prop.name">
                <td>
                  <code>{{ prop.name }}</code>
                </td>
                <td>{{ prop.value }}</td>
              </tr>
            </table>
          </div>
        </div>
      </b-tab-item>

      <b-tab-item label="Relationships">
        <div class="relationships">
          <links :object="indicator" :detailComponent="'IndicatorDetails'" />
        </div>
      </b-tab-item>

      <b-tab-item label="Raw JSON">
        <div class="json">
          <pre>{{ indicator }}</pre>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>

  <!--  Edit form -->
  <!-- yeti-form should use emit instead of an onSaveCallback -->
  <yeti-form
    :object="indicator"
    :fields="indicatorFields"
    :apiPath="defaultApiPath + id + '/'"
    method="PUT"
    v-on:form-submit="toggleEdit"
    v-else
  />
</template>

<style lang="css">
.json pre {
  white-space: pre-wrap;
}
</style>

<script>
import axios from "axios";

import YetiForm from "@/components/scaffolding/YetiForm";
import MarkdownText from "@/components/scaffolding/MarkdownText";
import Links from "@/components/Graph/Links";
import Fields from "@/components/helpers/Fields";

import { editFields } from "./IndicatorFields.js";
import { indicatorTypes } from "./IndicatorTypes.js";

export default {
  data() {
    return {
      loading: true,
      indicator: {},
      error: {},
      defaultApiPath: `/indicators/`,
      activeTab: 0
    };
  },
  props: { id: [Number, String], edit: Boolean },
  components: {
    YetiForm,
    Fields,
    Links,
    MarkdownText
  },
  computed: {
    indicatorType() {
      let arr = this.indicator.type.split(".");
      return arr[arr.length - 1];
    },
    indicatorFields() {
      return editFields[this.indicatorType];
    },
    indicatorTypeHuman() {
      return indicatorTypes[this.indicatorType];
    }
  },
  methods: {
    fetchInfo() {
      this.loading = true;
      axios
        .get(this.defaultApiPath + this.id)
        .then(response => {
          if (response.status !== 200) {
            this.error = response.data;
          } else {
            this.indicator = response.data;
          }
        })
        .catch(error => {
          // how do we catch 404 errors?
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toggleEdit() {
      this.$router.go(-1);
    },
    getSpecificProperties(indicator) {
      var properties = [];
      for (var prop in indicator) {
        if (this.isSpecifcAttribute(indicator, prop)) {
          properties.push({ value: indicator[prop], name: prop });
        }
      }
      return properties;
    },
    getExtendedProperties(indicator) {
      var properties = [];
      for (var prop in indicator) {
        if (this.isExtendedAttribute(indicator, prop)) {
          properties.push({ value: indicator[prop], name: prop });
        }
      }
      return properties;
    },
    isSpecifcAttribute(indicator, attribute) {
      let commonProperties = [
        "created",
        "type",
        "id",
        "created_by_ref",
        "created",
        "modified",
        "revoked",
        "external_references",
        "object_marking_refs",
        "granular_markings",
        "description",
        "labels",
        "name"
      ];
      return indicator[attribute] && !commonProperties.includes(attribute) && !attribute.startsWith("x_");
    },
    isExtendedAttribute(indicator, attribute) {
      return indicator[attribute] && attribute.startsWith("x_");
    }
  },
  mounted() {
    this.fetchInfo();
  },
  watch: {
    // call again the method if the id changes
    id: "fetchInfo"
  }
};
</script>

<style lang="css">
#header {
  margin-bottom: 1rem;
}

#header .title {
  margin-bottom: 0.75rem;
}
</style>
