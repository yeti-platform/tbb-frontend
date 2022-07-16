<template>
  <div>
    <b-taginput
      v-model="selectedPhases"
      autocomplete
      :data="autocompleteValues"
      :open-on-focus="true"
      :allow-new="false"
      field="phase_name"
      @typing="filteredItems"
      :before-adding="tag => this.selectedPhases.filter(item => item.phase_name === tag.phase_name).length === 0"
    >
    </b-taginput>
    <small>
      <b-taglist>
        <b-tag v-for="kc in this.availableKillchains" v-bind:key="kc.name" type="is-info is-light">
          {{ kc.name }}
        </b-tag>
      </b-taglist>
    </small>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    value: { type: Array, default: () => [] },
    killchainName: { type: String }
  },
  components: {},
  data() {
    return {
      item: "",
      availableKillchains: [],
      autocompleteValues: [],
      autocompleteData: [],
      selectedPhases: this.value
    };
  },
  methods: {
    fetchKillchains() {
      axios.get("/settings/killchains/").then(response => {
        this.availableKillchains = response.data;
        for (let killchain of this.availableKillchains) {
          this.autocompleteData = this.autocompleteData.concat(
            killchain.settings[killchain.name].map(phase => ({
              phase_name: phase.name,
              kill_chain_name: killchain.name
            }))
          );
          this.autocompleteValues = this.autocompleteData;
        }
      });
    },
    filteredItems(text) {
      this.autocompleteValues = this.autocompleteData.filter(item => {
        return item.phase_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    }
  },
  mounted() {
    this.fetchKillchains();
  },
  watch: {
    selectedPhases: function(val) {
      this.$emit("input", val);
    },
    value: function(val) {
      this.selectedPhases = val;
    }
  }
};
</script>

<style lang="css">
.vue-tags-input .input {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.vue-tags-input .autocomplete .selected-item {
  background-color: #007bff;
}

.vue-tags-input .tag {
  background-color: #007bff !important;
  border-radius: 0.25rem !important;
  vertical-align: baseline;
  line-height: 1;
  text-align: center;
}

.vue-tags-input .deletion-mark {
  background-color: red !important;
}
</style>
