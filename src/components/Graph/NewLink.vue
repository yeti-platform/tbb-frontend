<template>
  <div>
    <b-button @click="toggleForm">Add relationships</b-button>

    <b-modal v-model="displayForm">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Add relationships
          </p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div class="card-content">
          <div class="content">
            <b-field>
              <b-taginput
                autocomplete
                :data="filteredEntities"
                v-model="newEntities"
                placeholder="Search entities..."
                field="name"
                @typing="option => (entityName = option)"
                @add="stackLink"
              >
              </b-taginput>
            </b-field>
            <div class="selected">
              <b-table :data="newLinks">
                <b-table-column label="From" field="src.name" width="200" v-slot="props">{{
                  props.row.src.name
                }}</b-table-column>
                <b-table-column label="Link type" field="link_type" width="200" v-slot="props">
                  <span v-if="props.row.link_type.length === 1">
                    {{ props.row.link_type[0] }}
                  </span>
                  <span v-else>
                    <!-- TODO: Make dropdown selection -->
                    {{ props.row.link_type }}
                  </span>
                </b-table-column>
                <b-table-column label="To" field="dst.name" width="200" v-slot="props">
                  {{ props.row.dst.name }}
                </b-table-column>
                <b-table-column label="Swap" field="description" width="200" v-slot="props">
                  <b-button @click="swapLink(props.row)">Swap!</b-button>
                </b-table-column>
              </b-table>
            </div>
            <div class="buttons">
              <b-button type="is-primary" v-bind:class="{ disabled: saving }" @click="addLink">
                {{ saving ? "Saving..." : "Save" }}
              </b-button>
              <b-button @click="toggleForm">Cancel</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { relationships } from "./StixRelationships.js";

export default {
  props: ["sourceEntity"],
  data() {
    return {
      entitiesData: [],
      newEntities: [],
      newLinks: [],
      entityName: "",
      saving: false,
      displayForm: false
    };
  },
  methods: {
    toggleForm() {
      this.displayForm = !this.displayForm;
    },
    getEntities() {
      axios.get("entities").then(response => {
        if (response.status === 200) {
          this.entitiesData = response.data;
        }
      });
    },
    stackLink(entity) {
      let linkObj = {
        src: this.sourceEntity,
        dst: entity
      };
      let linkType = relationships[this.sourceEntity.type][entity.type];
      if (linkType === undefined) {
        linkType = ["related-to"];
      }
      linkObj.link_type = linkType;

      this.newLinks.push(linkObj);
    },
    swapLink(link) {
      let index = this.newLinks.indexOf(link);
      let linkType = relationships[link.dst.type][link.src.type];
      if (linkType === undefined) {
        linkType = ["related-to"];
      }
      let newLink = {
        src: link.dst,
        dst: link.src,
        link_type: linkType
      };
      this.newLinks.splice(index, 1, newLink);
    },
    addLink() {
      this.saving = true;

      var links = [];
      for (var entity of this.newEntities) {
        let linkType = relationships[this.sourceEntity.type][entity.type];
        if (linkType === undefined) {
          linkType = ["related-to"];
        }
        links.push({
          target: entity,
          link_type: linkType[0],
          stix_rel: null
        });
      }

      axios
        .post("entities/" + this.sourceEntity.id + "/addlink/", links)
        .then(response => {
          this.$emit("links-changed", response.data);
          this.newEntities = [];
          this.$refs.relInput.clearItems();
        })
        .catch(error => {
          this.errors = error.response.data;
        })
        .finally(() => {
          this.displayForm = false;
          this.saving = false;
        });
    }
  },
  computed: {
    filteredEntities() {
      return this.entitiesData.filter(entity => {
        return entity.name.toLowerCase().indexOf(this.entityName.toLowerCase()) > -1;
      });
    }
  },
  mounted() {
    this.getEntities();
  }
};
</script>

<style></style>
