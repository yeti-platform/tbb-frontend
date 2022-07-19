<template lang="html">
  <b-icon pack="fa" :icon="getIcon" size="is-small">123</b-icon>
</template>

<script>
const typeToIcon = {
  malware: "fa-bug",
  "threat-actor": "fa-user-secret",
  "attack-pattern": "fa-gamepad",
  tool: "fa-wrench",
  "intrusion-set": "fa-umbrella",
  indicator: "fa-bolt",
  "x-regex": "fa-bolt",
  "x-yara": "fa-bolt",
  vulnerability: "fa-bolt",
  campaign: "fa-fighter-jet",
  "course-of-action": "fa-medkit",
  identity: "fa-id-card",
  "x-incident": "fa-fire"
};

export default {
  props: ["type", "large"],

  computed: {
    getIcon() {
      return typeToIcon[this.type];
    }
  }
};
</script>

<style lang="css"></style>
