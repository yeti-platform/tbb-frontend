<template>
  <div style="width:100%">
    <b-input v-if="fieldVocab.length == 0" v-model="bufferValue" />
    <b-autocomplete
      placeholder="Start typing..."
      v-else
      open-on-focus
      v-model="bufferValue"
      :data="filteredVocabValues"
      clearable
    ></b-autocomplete>
    <small v-if="vocab"
      >Suggested values from <code>{{ vocab }}</code
      >: {{ fieldVocab.join(", ") }}</small
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["value", "vocab"],
  data() {
    return {
      fieldVocab: [],
      bufferValue: this.value
    };
  },
  methods: {
    getVocabValues() {
      axios
        .get("/settings/vocabs/" + this.vocab + "/")
        .then(response => {
          if (response.status === 200) {
            this.fieldVocab = response.data;
          }
        })
        .catch(error => {
          if (error.response.status == 404) {
            console.log(`No vocab found for ${this.vocab}: ${error}`);
          }
        });
    },
    valueUpdated() {
      console.log("updated");
      this.$emit("input", this.bufferValue);
    }
  },
  computed: {
    filteredVocabValues() {
      return this.fieldVocab.filter(item => item.toLowerCase().indexOf(this.bufferValue.toLowerCase()) > -1);
    }
  },
  mounted() {
    if (this.vocab) {
      this.getVocabValues();
    }
  },
  watch: {
    bufferValue: function(value) {
      this.$emit("input", value);
    },
    value: function(val) {
      this.bufferValue = val;
    }
  }
};
</script>

<style></style>
