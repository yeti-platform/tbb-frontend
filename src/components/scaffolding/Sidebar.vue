<template lang="html">
  <b-menu>
    <b-menu-list label="Intelligence">
      <b-menu-item
        v-for="item in entities"
        v-bind:key="item.type"
        :label="item.label"
        :icon="item.icon"
        tag="router-link"
        :active="$route.params.type === item.type"
        :to="{ name: 'EntityList', params: { type: item.type } }"
      >
      </b-menu-item>
    </b-menu-list>
    <b-menu-list label="Operations">
      <b-menu-item
        icon="fire"
        tag="router-link"
        label="Incidents"
        :active="$route.params.type === 'x-incident'"
        :to="{ name: 'EntityList', params: { type: 'x-incident' } }"
      ></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Indicators">
      <b-menu-item
        v-for="item in indicators"
        v-bind:key="item.type"
        :label="item.label"
        :icon="item.icon"
        tag="router-link"
        :active="$route.params.type === item.type"
        :to="{ name: 'IndicatorList', params: { type: item.type } }"
      >
      </b-menu-item>
    </b-menu-list>
  </b-menu>

  <!--

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>Observables</span>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'ObservableList' }">
          <i class="fas fa-fw fa-lg fa-search"></i>Browse observables
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'ObservablesBulk' }">
          <i class="fas fa-fw fa-lg fa-archive"></i>Bulk observable match
        </router-link>
      </li>
    </ul>
  </b-menu> -->
</template>

<script>
export default {
  data() {
    return {
      entities: [
        { label: "Attack pattern", type: "attack-pattern", icon: "gamepad" },
        { label: "Courses of action", type: "course-of-action", icon: "medkit" },
        { label: "Identities", type: "identity", icon: "id-card" },
        { label: "Intrusion sets", type: "intrusion-set", icon: "umbrella" },
        { label: "Malware", type: "malware", icon: "bug" },
        { label: "Reports", type: "report", icon: "newspaper" },
        { label: "Threat actors", type: "threat-actor", icon: "user-secret" },
        { label: "Tools", type: "tool", icon: "wrench" },
        { label: "Vulnerabilities", type: "vulnerability", icon: "bolt" }
      ],
      indicators: [
        { label: "STIX Indicators", type: "indicator", icon: "bolt" },
        { label: "Regular expressions", type: "x-regex", icon: "bolt" },
        { label: "Yara rules", type: "x-yara", icon: "bolt" },
        { label: "Sigma rules", type: "x-sigma", icon: "bolt" }
      ]
    };
  }
};
</script>

<style lang="css">
/*
 * Sidebar
 */
</style>
