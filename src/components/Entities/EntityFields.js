export const editFields = {
  "attack-pattern": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stage" }
  ],
  campaign: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "aliases", type: "list", label: "Aliases" },
    { field: "first_seen", type: "datetime", label: "First seen" },
    { field: "last_seen", type: "datetime", label: "Last seen" },
    { field: "objective", type: "text", label: "Objective" }
  ],
  "course-of-action": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" }
  ],
  identity: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "identity_class", type: "text", vocab: "identity-class-ov", label: "Identity class" },
    { field: "sectors", type: "list", vocab: "industry-sector-ov", label: "Industry sector" },
    { field: "contact_information", type: "text", label: "Contact information" }
  ],
  "intrusion-set": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "aliases", type: "list", label: "Aliases" },
    { field: "first_seen", type: "datetime", label: "First seen" },
    { field: "last_seen", type: "datetime", label: "Last seen" },
    { field: "goals", type: "list", label: "Goals" },
    { field: "resource_level", type: "text", vocab: "attack-resource-level-ov", label: "Resource level" },
    { field: "primary_motivation", type: "text", vocab: "attack-motivation-ov", label: "Primary motivation" },
    { field: "secondary_motivations", type: "list", vocab: "attack-motivation-ov", label: "Secondary motivations" }
  ],
  malware: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", vocab: "malware-label-ov", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stage" }
  ],
  "observed-data": [
    { field: "id", type: "text" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "first_observed", type: "text", label: "First observed" },
    { field: "last_observed", type: "text", label: "Last observed" },
    { field: "number_observed", type: "int", label: "Number observed" }
  ],
  report: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", vocab: "report-label-ov", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "published", type: "datetime", label: "Date published" }
  ],
  "threat-actor": [
    { field: "name", type: "text", label: "Name", group: "Main" },
    { field: "labels", type: "list", vocab: "threat-actor-label-ov", label: "Labels", group: "Main" },
    { field: "description", type: "longtext", label: "Description", group: "Description" },
    { field: "aliases", type: "list", label: "Aliases", group: "Aliases & roles" },
    { field: "roles", type: "list", vocab: "threat-actor-role-ov", label: "Roles", group: "Aliases & roles" },
    { field: "goals", type: "list", label: "Goals", group: "Aliases & roles" },
    {
      field: "sophistication",
      type: "text",
      vocab: "threat-actor-sophistication-ov",
      label: "Sophistication",
      group: "Sophistication"
    },
    {
      field: "resource_level",
      type: "text",
      vocab: "attack-resource-level-ov",
      label: "Resource level",
      group: "Sophistication"
    },
    {
      field: "primary_motivation",
      type: "text",
      vocab: "attack-motivation-ov",
      label: "Primary motivation",
      group: "Motivations"
    },
    {
      field: "secondary_motivations",
      type: "list",
      vocab: "attack-motivation-ov",
      label: "Secondary motivations",
      group: "Motivations"
    },
    {
      field: "personal_motivations",
      type: "list",
      vocab: "attack-motivation-ov",
      label: "Personal motivations",
      group: "Motivations"
    }
  ],
  tool: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", vocab: "tool-label-ov", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "tool_version", type: "text", label: "Tool version" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stage" }
  ],
  vulnerability: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" }
  ],
  "x-incident": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "description", type: "longtext", label: "Description" },
    { field: "internal_references", type: "list", label: "Internal references" }
  ]
};

export const listFields = {
  "attack-pattern": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stage" }
  ],
  campaign: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "aliases", type: "list", label: "Aliases" },
    { field: "first_seen", type: "datetime", label: "First seen" },
    { field: "last_seen", type: "datetime", label: "Last seen" }
  ],
  "course-of-action": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" }
  ],
  identity: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "sectors", type: "list", label: "Sectors" }
  ],
  "intrusion-set": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "aliases", type: "list", label: "Aliases" },
    { field: "first_seen", type: "text", label: "First seen" },
    { field: "last_seen", type: "text", label: "Last seen" },
    { field: "primary_motivation", type: "text", label: "Primary motivation" }
  ],
  malware: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", vocab: "malware-label-ov", label: "Labels" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stage" }
  ],
  "observed-data": [
    { field: "id", type: "text", label: "ID" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "first_observed", type: "text", label: "First observed" },
    { field: "last_observed", type: "text", label: "last observed" },
    { field: "number_observed", type: "int", label: "Number observed" }
  ],
  report: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "published", type: "datetime", label: "Date published" }
  ],
  "threat-actor": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "aliases", type: "list", label: "Aliases" },
    { field: "roles", type: "list", label: "Roles" },
    { field: "primary_motivation", type: "text", label: "Primary motivation" }
  ],
  tool: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "tool_version", type: "text", label: "Tool version" },
    { field: "kill_chain_phases", type: "killchain", label: "Kill-chain stage" }
  ],
  vulnerability: [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" }
  ],
  "x-incident": [
    { field: "name", type: "text", label: "Name" },
    { field: "labels", type: "list", label: "Labels" },
    { field: "internal_references", type: "list", label: "Internal references" }
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
