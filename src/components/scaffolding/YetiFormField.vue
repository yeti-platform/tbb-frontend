<template>
  <!-- plain text input -->
  <div>
    <small v-if="field.group">{{ field.label }}</small>

    <yeti-text-input v-if="field.type === 'text'" v-model="bufferValue" :vocab="field.vocab" :id="slug" />

    <!-- code input -->
    <b-input
      v-else-if="field.type === 'code'"
      v-model="bufferValue"
      type="textarea"
      class="form-control code"
      :id="slug"
      rows="8"
      cols="80"
    ></b-input>

    <!-- textarea -->
    <b-input
      v-else-if="field.type === 'longtext'"
      v-model="bufferValue"
      type="textarea"
      class="form-control"
      :id="slug"
      rows="8"
      cols="80"
    ></b-input>

    <!-- datetime -->
    <!--
      date-parser doesn't seem to run if the input is not an actual date
      So instead of using v-model we have to use the `value` prop and catch @input events
       -->
    <b-datepicker
      v-else-if="field.type === 'datetime'"
      :value="computedDateValue"
      @input="value => (this.bufferValue = value)"
      :id="slug"
      placeholder="Click to select..."
      trap-focus
      :date-formatter="customFormatter"
    >
    </b-datepicker>

    <!-- list-type input -->
    <yeti-vocab-input v-else-if="field.type === 'list'" v-model="bufferValue" :autocompleteVocab="field['vocab']" />

    <!-- tag input -->
    <yeti-vocab-input
      v-else-if="field.type === 'tags'"
      v-model="bufferValue"
      displayKey="name"
      :autocompleteVocab="field['vocab']"
    />

    <!-- killchain input -->
    <yeti-killchain-input v-else-if="field.type === 'killchain'" v-model="bufferValue" />

    <small v-if="field.help" class="form-text text-muted">{{ field.help }}</small>
  </div>
</template>

<script>
import YetiVocabInput from "@/components/scaffolding/YetiVocabInput";
import YetiTextInput from "@/components/scaffolding/YetiTextInput";
import YetiKillchainInput from "@/components/scaffolding/YetiKillchainInput";
var moment = require("moment");

export default {
  components: {
    YetiVocabInput,
    YetiTextInput,
    YetiKillchainInput
  },
  data() {
    return {
      bufferValue: null,
      availableKillchains: []
    };
  },
  props: ["field", "value"],
  methods: {
    valueUpdated() {
      this.$emit("input", this.bufferValue);
    },
    customFormatter(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss ZZ");
    }
  },
  computed: {
    slug() {
      return this.field.field.toLowerCase().replace(/[\s_]+|[^\w-]|^-+|-+$/g, "");
    },
    computedDateValue() {
      if (this.bufferValue) {
        return moment(this.bufferValue, "YYYY-MM-DD HH:mm:ss ZZ").toDate();
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.bufferValue = this.value;
  },
  watch: {
    bufferValue: "valueUpdated",
    value: function(val) {
      this.bufferValue = val;
    }
  }
};
</script>

<style lang="css">
.form-control.code textarea {
  font-family: "Courier New", Courier, monospace;
}

.field.is-grouped .control {
  margin-right: 0.75rem;
}
</style>
