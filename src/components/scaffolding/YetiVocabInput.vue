<template>
  <div>
    <b-taginput
      v-if="autocompleteVocab"
      @typing="filteredItems"
      autocomplete
      :data="autocompleteValues"
      v-model="vocabList"
      placeholder="Add comma-separated list items..."
      :open-on-focus="vocabList ? vocabList.length < 20 : false"
    >
    </b-taginput>

    <b-taginput v-else v-model="vocabList" placeholder="Add comma-separated list items..." field="text"> </b-taginput>
    <small v-if="autocompleteVocab" class="form-text text-muted">
      Autocompleting items from <code>{{ autocompleteVocab }}</code>
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
      autocompleteData: [],
      autocompleteValues: [],
      vocabList: this.value || []
    };
  },
  methods: {
    getValuesForVocab: function() {
      axios
        .get("/settings/vocabs/" + this.autocompleteVocab + "/")
        .then(response => {
          if (response.status === 200) {
            this.autocompleteData = response.data;
            this.autocompleteValues = this.autocompleteData;
          }
        })
        .catch(error => {
          if (error.response.status == 404) {
            console.log(`No vocab found for ${this.autocompleteVocab}: ${error}`);
          }
        });
    },
    filteredItems: function(text) {
      if (text) {
        this.autocompleteValues = this.autocompleteData.filter(
          item => item.text.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      } else {
        this.autocompleteValues = this.autocompleteData;
      }
    }
  },
  computed: {
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
