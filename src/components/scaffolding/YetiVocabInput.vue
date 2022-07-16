<template>
  <div>
    <b-taginput v-model="vocabList" placeholder="Add a tag"> </b-taginput>
    <small v-if="autocompleteVocab" class="form-text text-muted">
      Autocompleting from <code>{{ autocompleteVocab }}</code>
    </small>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  props: ["value", "autocompleteVocab", "displayKey"],
  data() {
    return {
      autocompleteItems: [],
      vocabList: this.value
    };
  },
  methods: {
    getValuesForVocab: function() {
      axios
        .get("/settings/vocabs/" + this.autocompleteVocab + "/")
        .then(response => {
          if (response.status === 200) {
            this.autocompleteItems = response.data.map(item => Object({ text: item }));
          }
        })
        .catch(error => {
          if (error.response.status == 404) {
            console.log(`No vocab found for ${this.autocompleteVocab}: ${error}`);
          }
        });
    }
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(validTag => new RegExp(this.item, "i").test(validTag.text));
    },
    listItems() {
      if (this.displayKey) {
        return (this.vocabList || []).map(item => Object({ text: item[this.displayKey] }));
      } else {
        return (this.vocabList || []).map(item => Object({ text: item }));
      }
    }
  },
  mounted() {
    if (this.autocompleteVocab) {
      this.getValuesForVocab();
    }
  },
  watch: {
    vocabList: function(vocabList) {
      this.$emit("input", vocabList);
    },
    value: function(val) {
      this.vocabList = val;
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
