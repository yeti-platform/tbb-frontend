<template>
  <div>
    <ul class="nav nav-tabs mb-3" id="tabs-tab" role="tablist">
      <li class="nav-item" v-for="(killchain, index) in nonEmptyKillChains" v-bind:key="killchain.name">
        <a
          class="nav-link"
          :id="killchain.name + '-tab'"
          data-toggle="pill"
          :href="'#' + killchain.name"
          v-bind:class="{ active: index === 0 }"
          role="tab"
          :aria-controls="killchain.name"
          aria-selected="true"
          >{{ killchain.human_name }}</a
        >
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(killchain, index) in nonEmptyKillChains"
        v-bind:key="killchain.name"
        class="tab-pane"
        v-bind:class="{ active: index === 0 }"
        :id="killchain.name"
        role="tabpanel"
        :aria-labelledby="killchain.name + '-tab'"
      >
        <table class="table">
          <tr v-for="phase in getPhases(killchain)" v-bind:key="phase.name">
            <th>{{ phase.human_name }}</th>
            <td
              class="neighbor-data"
              v-for="neighbor in neighborsPerKillchain[killchain.name][phase.name]"
              v-bind:key="killchain.name + phase.name + neighbor.id"
            >
              <router-link :to="{ name: 'EntityDetails', params: { id: neighbor.id } }">
                <type-to-icon :type="neighbor.type" class="neighbor-icon"></type-to-icon
                ><span>{{ neighbor.name }}</span>
              </router-link>
              <neighbor-icons :entity="neighbor" :neighbors="extendedGraph"></neighbor-icons>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TypeToIcon from "@/components/scaffolding/TypeToIcon";
import NeighborIcons from "@/components/Graph/NeighborIcons";

export default {
  components: {
    TypeToIcon,
    NeighborIcons
  },
  props: ["entity"],
  data() {
    return {
      killchains: [],
      extendedGraph: { edges: [], vertices: [] },
      neighborsPerKillchain: {}
    };
  },
  methods: {
    getKillchains() {
      axios
        .get("/settings/killchains/")
        .then(response => {
          this.killchains = response.data;
          var neighborsPerKillchain = {};
          for (var killchain of this.killchains) {
            neighborsPerKillchain[killchain.name] = {};
            for (var phase of killchain.settings[killchain.name]) {
              neighborsPerKillchain[killchain.name][phase.name] = [];
            }
          }
          this.neighborsPerKillchain = neighborsPerKillchain;
          this.getNeighbors();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    getPhases(killchain) {
      return killchain.settings[killchain.name];
    },
    getNeighbors() {
      axios
        .post("/entities/" + this.entity.id + "/neighbors/")
        .then(response => {
          this.sortNeighborsByPhase(response.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});

      let extendedGraphParams = {
        hops: 2,
        include_original: true
      };
      axios
        .post("/entities/" + this.entity.id + "/neighbors/", extendedGraphParams)
        .then(response => {
          this.extendedGraph = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sortNeighborsByPhase(neighbors) {
      for (var neighbor of Object.values(neighbors.vertices)) {
        if (neighbor.kill_chain_phases === undefined) {
          return;
        }

        neighbor.kill_chain_phases.map(phase => {
          if (this.neighborsPerKillchain[phase.kill_chain_name] === undefined) {
            console.log(`Kill chain ${phase.kill_chain_name} not system; did you import it?`);
          } else {
            this.neighborsPerKillchain[phase.kill_chain_name][phase.phase_name].push(neighbor);
          }
        });
      }
    }
  },
  computed: {
    nonEmptyKillChains() {
      var neighbors = this.neighborsPerKillchain;
      return this.killchains.filter(
        item => Object.values(neighbors[item.name]).reduce((r, k) => r.concat(k)).length > 0
      );
    }
  },
  mounted() {
    this.getKillchains();
  }
};
</script>

<style>
.neighbor-icon {
  margin-right: 0.25rem;
}
</style>
