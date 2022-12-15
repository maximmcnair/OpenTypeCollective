const fs = require("fs");
const path = require("path");
var fontkit = require('fontkit');

const typeDirectory = path.join(process.cwd(), "static/typefaces/");
const typefaces = fs.readdirSync(typeDirectory);

const typefaceMetaData = {};

typefaces.forEach(t => {
  const dir = path.join(process.cwd(), `static/typefaces/${t}`);
  const fonts = fs.readdirSync(dir);
  fonts.forEach(f => {
    const metaData = {};
    const font = fontkit.openSync(`./static/typefaces/${t}/${f}`);
    metaData.name = font.fullName;
    metaData.characterSet = font.characterSet;
    metaData.availableFeatures = font.availableFeatures;
    metaData.variationAxes = font.variationAxes;
    try {
      metaData.namedVariations = font.namedVariations;
    } catch(err) {
      metaData.namedVariations = {};
    }
    typefaceMetaData[font.fullName] = metaData;
  })
})

fs.writeFile(
  'src/lib/typefaceMetaData.json',
  JSON.stringify(typefaceMetaData),
  'utf8',
  () => {
    console.log('Typeface MetaData saved');
  }
);
