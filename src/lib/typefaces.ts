type Variation = [string, string, number, number, number, number];
// value, name, min, max, default, step

export interface Typeface {
  name: TypefaceName;
  source: string;
  foundery: string;
  variations: Variation[];
  categories: string[];
}

enum TypefaceName {
  Inter = 'Inter'
}

export const typefaces = [
  {
    name: "Inter",
    source: "https://github.com/rsms/inter",
    foundery: "rsms",
    variations: [
      ['wght', 'Weight', 100, 900, 400, 1],
      ['slnt', 'Slant', -10, 0, 0, 1]
    ]
  },
  {
    name: "Anybody",
    source: "",
    foundery: "ETC",
    variations: [
      ['wght', 'Weight', 200, 900, 100, 1],
      ['wdth', 'Width', 100, 150, 100, 1], 
      ['slnt', 'Slant', -10, 0, 0, 1]
    ]
  },
  {
    name: "Epilogue",
    source: "",
    foundery: "ETC",
    variations: [
      ['wght', 'Weight', 100, 900, 400, 10],
    ]
  },
  {
    name: "Trispace",
    source: "",
    foundery: "ETC",
    variations: [
      ['wght', 'Weight', 100, 800, 100, 1],
      ['wdth', 'Width', 75, 125, 100, 1], 
    ]
  },
  {
    name: "Fraunces",
    source: "",
    foundery: "",
    variations: [
      ['opsz', 'Optical Size', 9, 144, 9, 1],
      ['wght', 'Weight', 100, 900, 900, 1],
      ['SOFT', 'Softness', 0, 100, 0, 1],
      ['WONK', 'Wonky', 0, 1, 1, 1],
    ]
  },
  {
    name: "Hubot Sans",
    source: "",
    foundery: "Github + Degarism",
    variations: [
      ['wght', 'Weight', 200, 900, 200, 1],
      ['wdth', 'Width', 75, 125, 100, 1], 
      ['ital', 'Italic', 0, 10, 0, 1]
    ]
  },
  {
    name: "Mona Sans",
    source: "",
    foundery: "Github + Degarism",
    variations: [
      ['wght', 'Weight', 200, 900, 200, 1],
      ['wdth', 'Width', 75, 125, 100, 1], 
      ['ital', 'Italic', 0, 12, 0, 1]
    ]
  },
  {
    name: "Source Code Pro",
    source: "",
    foundery: "Adobe",
    variations: [
      ['wght', 'Weight', 200, 900, 200, 1],
    ]
  },
  {
    name: "Source Sans",
    source: "",
    foundery: "Adobe",
    variations: [
      ['wght', 'Weight', 200, 900, 200, 1],
    ]
  },
  {
    name: "Source Serif",
    source: "",
    foundery: "Adobe",
    variations: [
      ['wght', 'Weight', 200, 900, 400, 1],
      ['opsz', 'Optical Size', 8, 60, 20, 1],
    ]
  },
  {
    name: "Space Grotesk",
    source: "",
    foundery: "Florain Karsten + Colophon",
    variations: [
      ['wght', 'Weight', 300, 700, 300, 1],
    ]
  },
];
