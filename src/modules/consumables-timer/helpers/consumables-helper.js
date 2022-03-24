const rings = [
  {
    itemName: "Axe Ring",
    durationInMinutes: 30
  },
  {
    itemName: "Blister Ring",
    durationInMinutes: 60
  },
  {
    itemName: "Club Ring",
    durationInMinutes: 30
  },
  {
    itemName: "Dwarven Ring",
    durationInMinutes: 60
  },
  {
    itemName: "Energy Ring",
    durationInMinutes: 10
  },
  {
    itemName: "Life Ring",
    durationInMinutes: 20
  },
  {
    itemName: "Power Ring",
    durationInMinutes: 30
  },
  {
    itemName: "Prismatic Ring",
    durationInMinutes: 60
  },
  {
    itemName: "Ring of Blue Plasma",
    durationInMinutes: 30
  },
  {
    itemName: "Ring of Green Plasma",
    durationInMinutes: 30
  },
  {
    itemName: "Ring of Red Plasma",
    durationInMinutes: 30
  },
  {
    itemName: "Ring of Souls",
    durationInMinutes: 120
  },
  {
    itemName: "Shapeshifter Ring",
    durationInMinutes: 600
  },
  {
    itemName: "Star Ring",
    durationInMinutes: 10
  },
  {
    itemName: "Stealth Ring",
    durationInMinutes: 10
  },
  {
    itemName: "Sword Ring",
    durationInMinutes: 30
  },
  {
    itemName: "Time Ring",
    durationInMinutes: 10
  }
]

const amulets = [
  {
    itemName: "Collar of Blue Plasma",
    durationInMinutes: 30
  },
  {
    itemName: "Collar of Green Plasma",
    durationInMinutes: 30
  },
  {
    itemName: "Collar of Red Plasma",
    durationInMinutes: 30
  },
  {
    itemName: "Enchanted Pendulet",
    durationInMinutes: 120
  },
  {
    itemName: "Enchanted Sleep Shawl",
    durationInMinutes: 60
  },
  {
    itemName: "Enchanted Theurgic Amulet",
    durationInMinutes: 120
  },
  {
    itemName: "Enchanted Werewolf Amulet",
    durationInMinutes: 60
  }
]

const potions = [
  {
    itemName: 'Berserk Potion',
    durationInMinutes: 10
  },
  {
    itemName: 'Bullseye Potion',
    durationInMinutes: 10
  },
  {
    itemName: 'Mastermind Potion',
    durationInMinutes: 10
  },

]

const mapToVuetifyAutoCompleteFormat = ({itemName, durationInMinutes}) => {
  return {
    text: `${itemName} - ${durationInMinutes}m`,
    value: {
      itemName,
      durationInSeconds: durationInMinutes * 60 // Converting to seconds
    }
  };
};


export const consumables = [...rings, ...amulets, ...potions].map(mapToVuetifyAutoCompleteFormat);
