<template>
  <div>
    <div v-for="group in getFieldGroups" v-bind:key="group.group" class="form-section">
      <b-field :label="group[0].group" grouped>
        <yeti-form-field
          v-for="field in group"
          v-bind:key="field.label"
          :field="field"
          v-model="object[field.field]"
        ></yeti-form-field>
      </b-field>
      <hr />
    </div>

    <div v-if="!fields[0].group">
      <b-field :label="field.label" v-for="field in fields" v-bind:key="field.label">
        <yeti-form-field :field="field" v-model="object[field.field]"></yeti-form-field>
      </b-field>
    </div>

    <b-field grouped>
      <p class="control">
        <b-button @click="submitForm" type="is-primary">
          {{ saving ? "Saving..." : "Save changes" }}
        </b-button>
      </p>
      <p class="control">
        <b-button id="cancel" @click="back()">Cancel</b-button>
      </p>
    </b-field>

    <b-field label="JSON preview">
      <pre>{{ object }}</pre>
    </b-field>
    <div v-if="errors">
      <pre>{{ errors }}</pre>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import YetiFormField from "@/components/scaffolding/YetiFormField";

const methods = {
  PUT: axios.put,
  POST: axios.post
};

export default {
  components: {
    YetiFormField
  },
  props: {
    fields: { default: () => [], type: Array },
    apiPath: { type: String },
    method: { default: "POST", type: String },
    object: { default: () => {}, type: Object }
  },
  data() {
    return {
      saving: false,
      errors: "",
      tagForm: {}
    };
  },
  computed: {
    getFieldGroups() {
      return this.fields.reduce((acc, field) => {
        if (field.group) {
          acc[field.group] = acc[field.group] || [];
          acc[field.group].push(field);
        }
        return acc;
      }, {});
    }
  },
  methods: {
    submitForm: function(e) {
      this.saving = true;
      console.log("Submitting!");
      methods[this.method](this.apiPath, this.object)
        .then(response => {
          this.$emit("form-submit", response.data);
        })
        .catch(error => {
          this.errors = error.response.data;
          this.saving = false;
        });
      e.preventDefault();
    },
    back() {
      history.back();
    }
  }
};
</script>

<style lang="css">
textarea.code {
  font-family: "Courier New", Courier, monospace;
}

.form-section {
  margin-bottom: 1rem;
}

.form-section > .field > .label {
  font-size: 1.5rem;
}
</style>
