export const editFields = {
  "attack-pattern": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "kill_chain_phases", type: "killchain", humanName: "Kill-chain stage" }
  ],
  campaign: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "aliases", type: "list", humanName: "Aliases" },
    { name: "first_seen", type: "datetime", humanName: "First seen" },
    { name: "last_seen", type: "datetime", humanName: "Last seen" },
    { name: "objective", type: "text", humanName: "Objective" }
  ],
  "course-of-action": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" }
  ],
  identity: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "identity_class", type: "text", vocab: "identity-class-ov", humanName: "Identity class" },
    { name: "sectors", type: "list", vocab: "industry-sector-ov", humanName: "Industry sector" },
    { name: "contact_information", type: "text", humanName: "Contact information" }
  ],
  "intrusion-set": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "aliases", type: "list", humanName: "Aliases" },
    { name: "first_seen", type: "datetime", humanName: "First seen" },
    { name: "last_seen", type: "datetime", humanName: "Last seen" },
    { name: "goals", type: "list", humanName: "Goals" },
    { name: "resource_level", type: "text", vocab: "attack-resource-level-ov", humanName: "Resource level" },
    { name: "primary_motivation", type: "text", vocab: "attack-motivation-ov", humanName: "Primary motivation" },
    { name: "secondary_motivations", type: "list", vocab: "attack-motivation-ov", humanName: "Secondary motivations" }
  ],
  malware: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", vocab: "malware-label-ov", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "kill_chain_phases", type: "killchain", humanName: "Kill-chain stage" }
  ],
  "observed-data": [
    { name: "id", type: "text" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "first_observed", type: "text", humanName: "First observed" },
    { name: "last_observed", type: "text", humanName: "Last observed" },
    { name: "number_observed", type: "int", humanName: "Number observed" }
  ],
  report: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", vocab: "report-label-ov", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "published", type: "datetime", humanName: "Date published" }
  ],
  "threat-actor": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", vocab: "threat-actor-label-ov", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "aliases", type: "list", humanName: "Aliases" },
    { name: "roles", type: "list", vocab: "threat-actor-role-ov", humanName: "Roles" },
    { name: "goals", type: "list", humanName: "Goals" },
    { name: "sophistication", type: "text", vocab: "threat-actor-sophistication-ov", humanName: "Sophistication" },
    { name: "resource_level", type: "text", vocab: "attack-resource-level-ov", humanName: "Resource level" },
    { name: "primary_motivation", type: "text", vocab: "attack-motivation-ov", humanName: "Primary motivation" },
    { name: "secondary_motivations", type: "list", vocab: "attack-motivation-ov", humanName: "Secondary motivations" },
    { name: "personal_motivations", type: "list", vocab: "attack-motivation-ov", humanName: "Personal motivations" }
  ],
  tool: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", vocab: "tool-label-ov", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "tool_version", type: "text", humanName: "Tool version" },
    { name: "kill_chain_phases", type: "killchain", humanName: "Kill-chain stage" }
  ],
  vulnerability: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" }
  ],
  "x-incident": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "description", type: "longtext", humanName: "Description" },
    { name: "internal_references", type: "list", humanName: "Internal references" }
  ]
};

export const listFields = {
  "attack-pattern": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "kill_chain_phases", type: "killchain", humanName: "Kill-chain stage" }
  ],
  campaign: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "aliases", type: "list", humanName: "Aliases" },
    { name: "first_seen", type: "datetime", humanName: "First seen" },
    { name: "last_seen", type: "datetime", humanName: "Last seen" }
  ],
  "course-of-action": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" }
  ],
  identity: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "sectors", type: "list", humanName: "Sectors" }
  ],
  "intrusion-set": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "aliases", type: "list", humanName: "Aliases" },
    { name: "first_seen", type: "text", humanName: "First seen" },
    { name: "last_seen", type: "text", humanName: "Last seen" },
    { name: "primary_motivation", type: "text", humanName: "Primary motivation" }
  ],
  malware: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", vocab: "malware-label-ov", humanName: "Labels" },
    { name: "kill_chain_phases", type: "killchain", humanName: "Kill-chain stage" }
  ],
  "observed-data": [
    { name: "id", type: "text", humanName: "ID" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "first_observed", type: "text", humanName: "First observed" },
    { name: "last_observed", type: "text", humanName: "last observed" },
    { name: "number_observed", type: "int", humanName: "Number observed" }
  ],
  report: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "published", type: "datetime", humanName: "Date published" }
  ],
  "threat-actor": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "aliases", type: "list", humanName: "Aliases" },
    { name: "roles", type: "list", humanName: "Roles" },
    { name: "primary_motivation", type: "text", humanName: "Primary motivation" }
  ],
  tool: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "tool_version", type: "text", humanName: "Tool version" },
    { name: "kill_chain_phases", type: "killchain", humanName: "Kill-chain stage" }
  ],
  vulnerability: [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" }
  ],
  "x-incident": [
    { name: "name", type: "text", humanName: "Name" },
    { name: "labels", type: "list", humanName: "Labels" },
    { name: "internal_references", type: "list", humanName: "Internal references" }
  ]
};

export const defaultObjects = {
  malware: {
    name: "",
    labels: [],
    description: "",
    type: "malware"
  },
  "threat-actor": {
    name: "",
    labels: "",
    description: "",
    aliases: [],
    roles: [],
    goals: [],
    sophistication: "",
    resource_level: "",
    primary_motivation: "",
    secondary_motivations: [],
    personal_motivations: [],
    type: "threat-actor"
  },
  report: {
    name: "",
    labels: [],
    description: "",
    published: "",
    type: "report"
  },
  "attack-pattern": {
    name: "",
    labels: [],
    kill_chain_phases: [],
    type: "attack-pattern"
  },
  tool: {
    name: "",
    labels: [],
    description: "",
    tool_version: "",
    kill_chain_phases: [],
    type: "tool"
  },
  "intrusion-set": {
    name: "",
    labels: [],
    description: "",
    aliases: [],
    first_seen: "",
    last_seen: "",
    goals: [],
    resource_level: "",
    primary_motivation: "",
    secondary_motivations: [],
    type: "intrusion-set"
  },
  vulnerability: {
    name: "",
    labels: [],
    description: "",
    type: "vulnerability"
  },
  campaign: {
    name: "",
    labels: [],
    aliases: [],
    first_seen: "",
    last_seen: "",
    objective: "",
    type: "campaign"
  },
  "course-of-action": {
    name: "",
    labels: [],
    description: "",
    type: "course-of-action"
  },
  identity: {
    name: "",
    labels: [],
    description: "",
    identity_class: "",
    sectors: [],
    contact_information: "",
    type: "identity"
  },
  "x-incident": {
    name: "",
    labels: [],
    description: "",
    internal_references: [],
    type: "x-incident"
  }
  // No definition for observed-data since we're not currently supporting
  // manual creation.
};
