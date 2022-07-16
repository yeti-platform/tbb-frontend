<template>
  <!-- Display details nicely -->
  <span v-if="loading" class="loading">
    <i class="fas fa-circle-notch fa-spin fa-5x m-5"></i>
  </span>
  <div v-else-if="!edit" class="entity-details">
    <!-- Title and edit button -->
    <div id="header">
      <h2 class="subtitle">
        {{ entityTypeHuman.singular }}
      </h2>
      <h1 class="title">
        {{ entity.name }}
        <b-button tag="router-link" :to="{ name: 'EntityEdit', params: { id: id } }">
          Edit
        </b-button>
      </h1>
      <fields :field="{ type: 'list', field: 'labels' }" :elt="entity" />
    </div>

    <b-tabs :animated="false">
      <b-tab-item label="Main" class="content">
        <table class="table">
          <tr>
            <th>Created:</th>
            <td>
              <fields :field="{ type: 'datetime', field: 'created' }" :elt="entity" />
            </td>
            <th>Modified:</th>
            <td>
              <fields :field="{ type: 'datetime', field: 'modified' }" :elt="entity" />
            </td>
          </tr>
          <tr v-if="entity.tool_version">
            <th>Tool version</th>
            <td>{{ entity.tool_version }}</td>
          </tr>
          <tr v-if="entity.action">
            <th>Action</th>
            <td>{{ entity.action }}</td>
          </tr>
          <tr v-if="entity.identity_class">
            <th>Identity class</th>
            <td colspan="5">{{ entity.identity_class }}</td>
          </tr>
          <tr v-if="entity.sectors">
            <th>Sectors</th>
            <td colspan="5">
              <fields :field="{ type: 'list', field: 'sectors' }" :elt="entity" />
            </td>
          </tr>
          <tr v-if="entity.contact_information">
            <th>Contact info</th>
            <td colspan="5">{{ entity.contact_information }}</td>
          </tr>
          <tr v-if="entity.aliases">
            <th>Aliases</th>
            <td colspan="5">
              <fields :field="{ type: 'list', field: 'aliases' }" :elt="entity" />
            </td>
          </tr>
          <tr v-if="entity.kill_chain_phases">
            <th>Kill-chain phases</th>
            <td colspan="5">
              <fields :field="{ type: 'killchain', field: 'kill_chain_phases' }" :elt="entity" />
            </td>
          </tr>
          <tr v-if="entity.first_seen || entity.last_seen">
            <th>First seen:</th>
            <td>
              <fields :field="{ type: 'datetime', field: 'first_seen' }" :elt="entity" />
            </td>
            <th>Last seen:</th>
            <td>
              <fields :field="{ type: 'datetime', field: 'last_Seen' }" :elt="entity" />
            </td>
          </tr>
          <tr v-if="entity.objective">
            <th>Objective</th>
            <td colspan="5">{{ entity.objective }}</td>
          </tr>
          <tr v-if="entity.roles || entity.sophistication">
            <th>Roles</th>
            <td>
              <fields :field="{ type: 'list', field: 'roles' }" :elt="entity" />
            </td>
            <th>Sophistication</th>
            <td>{{ entity.sophistication }}</td>
          </tr>
          <tr v-if="entity.goals || entity.resource_level">
            <th>Goals</th>
            <td>
              <fields :field="{ type: 'list', field: 'goals' }" :elt="entity" />
            </td>
            <th>Resource level</th>
            <td>{{ entity.resource_level }}</td>
          </tr>
          <tr v-if="entity.primary_motivation || entity.secondary_motivations || entity.personal_motivations">
            <th>Primary motivation</th>
            <td>{{ entity.primary_motivation }}</td>
            <th>Secondary</th>
            <td>
              <fields :field="{ type: 'list', field: 'secondary_motivations' }" :elt="entity" />
            </td>
            <th>Personal</th>
            <td>
              <fields :field="{ type: 'list', field: 'personal_motivations' }" :elt="entity" />
            </td>
          </tr>
        </table>

        <div class="description mb-3">
          <h2>Description</h2>
          <markdown-text :text="entity.description || 'No description'"></markdown-text>
        </div>
      </b-tab-item>

      <b-tab-item label="Details">
        <div class="details content">
          <h2>Details</h2>
          <table class="table">
            <tr>
              <td>Type</td>
              <td>
                <fields :field="{ type: 'code', field: 'type' }" :elt="entity" />
              </td>
            </tr>
            <tr>
              <td>STIX ID</td>
              <td>
                <fields :field="{ type: 'code', field: 'id' }" :elt="entity" />
              </td>
            </tr>
            <tr>
              <td>Created by</td>
              <td>
                <fields :field="{ type: 'code', field: 'created_by_ref' }" :elt="entity" />
              </td>
            </tr>
            <tr>
              <td>Created</td>
              <td>
                <fields :field="{ type: 'datetime', field: 'created' }" :elt="entity" />
              </td>
            </tr>
            <tr>
              <td>Modified</td>
              <td>
                <fields :field="{ type: 'datetime', field: 'modified' }" :elt="entity" />
              </td>
            </tr>
            <tr>
              <td>Revoked</td>
              <td>
                <fields :field="{ type: 'boolean', field: 'revoked' }" :elt="entity" />
              </td>
            </tr>
            <tr v-for="ref in entity.external_references" v-bind:key="ref.source_name">
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
                <code v-bind:key="ref" v-for="ref in entity.object_marking_refs">{{ ref }}</code>
              </td>
            </tr>
            <tr>
              <td>Granular markings</td>
              <td>
                <code v-bind:key="marking" v-for="marking in entity.granular_markings">{{ marking }}</code>
              </td>
            </tr>
          </table>

          <div v-if="getSpecificProperties(entity).length > 0">
            <h2>{{ entityTypeHuman.singular }} specific properties</h2>
            <table class="table">
              <tr v-for="prop in getSpecificProperties(entity)" v-bind:key="prop.name">
                <td>
                  <code>{{ prop.name }}</code>
                </td>
                <td>{{ prop.value }}</td>
              </tr>
            </table>
          </div>
          <div v-if="getExtendedProperties(entity).length > 0">
            <h2>Extended properties</h2>
            <table class="table">
              <tr v-for="prop in getExtendedProperties(entity)" v-bind:key="prop.name">
                <td>
                  <code>{{ prop.name }}</code>
                </td>
                <td>{{ prop.value }}</td>
              </tr>
            </table>
          </div>
        </div></b-tab-item
      >

      <b-tab-item label="Relationships">
        <links :object="entity" :detailComponent="'EntityDetails'" />
      </b-tab-item>

      <b-tab-item label="Kill-chain view">
        <kill-chain-view :entity="entity"></kill-chain-view>
      </b-tab-item>

      <b-tab-item label="Raw JSON" class="content">
        <pre>{{ entity }}</pre>
      </b-tab-item>
    </b-tabs>
  </div>

  <!--  Edit form -->
  <!-- yeti-form should use emit instead of an onSaveCallback -->
  <yeti-form
    :object="entity"
    :fields="entityFields"
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
import KillChainView from "@/components/Entities/KillChainView";
import Fields from "@/components/helpers/Fields";

import { editFields } from "./EntityFields.js";
import { entityTypes } from "./EntityTypes.js";

export default {
  data() {
    return {
      loading: true,
      entity: {},
      error: {},
      defaultApiPath: `/entities/`,
      activeTab: 0
    };
  },
  props: { id: [Number, String], edit: Boolean },
  components: {
    YetiForm,
    Fields,
    Links,
    MarkdownText,
    KillChainView
  },
  computed: {
    entityType() {
      let arr = this.entity.type.split(".");
      return arr[arr.length - 1];
    },
    entityFields() {
      return editFields[this.entityType];
    },
    entityTypeHuman() {
      return entityTypes[this.entityType];
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
            this.entity = response.data;
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
      this.$router.push({ name: "EntityDetails", params: { id: this.id } });
    },
    getSpecificProperties(entity) {
      var properties = [];
      for (var prop in entity) {
        if (this.isSpecifcAttribute(entity, prop)) {
          properties.push({ value: entity[prop], name: prop });
        }
      }
      return properties;
    },
    getExtendedProperties(entity) {
      var properties = [];
      for (var prop in entity) {
        if (this.isExtendedAttribute(entity, prop)) {
          properties.push({ value: entity[prop], name: prop });
        }
      }
      return properties;
    },
    isSpecifcAttribute(entity, attribute) {
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
      return entity[attribute] && !commonProperties.includes(attribute) && !attribute.startsWith("x_");
    },
    isExtendedAttribute(entity, attribute) {
      return entity[attribute] && attribute.startsWith("x_");
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
