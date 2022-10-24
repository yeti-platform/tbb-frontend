export const editFields = {
  indicator: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "pattern", type: "code", label: "STIX pattern" },
    { field: "valid_from", type: "datetime", label: "Valid from" },
    { field: "valid_until", type: "datetime", label: "Valid until" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ],
  "x-regex": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "pattern", type: "code", label: "Regular expression" },
    { field: "valid_from", type: "datetime", label: "Valid from" },
    { field: "valid_until", type: "datetime", label: "Valid until" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ],
  "x-yara": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "pattern", type: "code", label: "Yara rule" },
    { field: "valid_from", type: "datetime", label: "Valid from" },
    { field: "valid_until", type: "datetime", label: "Valid until" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ],
  "x-sigma": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "pattern", type: "code", label: "Sigma rule" },
    { field: "valid_from", type: "datetime", label: "Valid from" },
    { field: "valid_until", type: "datetime", label: "Valid until" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ]
};

export const listFields = {
  indicator: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ],
  "x-regex": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ],
  "x-yara": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ],
  "x-sigma": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stages" }
  ]
};

export const defaultObjects = {
  indicator: {
    spec_version: "2.1",
    name: "",
    labels: [],
    description: "",
    pattern: "",
    valid_from: null,
    valid_until: null,
    kill_chain_phases: [],
    type: "indicator"
  },
  "x-regex": {
    spec_version: "2.1",
    name: "",
    labels: [],
    description: "",
    pattern: "",
    valid_from: null,
    valid_until: null,
    kill_chain_phases: [],
    type: "x-regex"
  },
  "x-yara": {
    spec_version: "2.1",
    name: "",
    labels: [],
    description: "",
    pattern: "",
    valid_from: null,
    valid_until: null,
    kill_chain_phases: [],
    type: "x-yara"
  },
  "x-sigma": {
    spec_version: "2.1",
    name: "",
    labels: [],
    description: "",
    pattern: "",
    valid_from: null,
    valid_until: null,
    kill_chain_phases: [],
    type: "x-sigma"
  }
};
