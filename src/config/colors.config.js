const list = [
  '3C79D8',
  '3D86C6',
  'A61C00',
  'CC0000',
  'E69438',
  'F1C232',
  '674EA7',
  'A64D79'
];

const colors = {
  newNote: '6AA84F',
  newContrast: 'F3F3F3',
  noteContrast: 'F3F3F3',
  gravatarContrast: 'fff',
  variantContrast: 'F3F3F3',
  list: list,
  default: list[0]
};

document.documentElement.style.setProperty(
  '--avatar-contrast',
  `#${colors.gravatarContrast}`
);
document.documentElement.style.setProperty('--avatar-color', '#1e8cbe');
document.documentElement.style.setProperty(
  '--note-contrast',
  `#${colors.noteContrast}`
);
document.documentElement.style.setProperty('--note-contrast-hover', '#d9d9d9');
document.documentElement.style.setProperty('--color-variant-highlight', '#000');

export default colors;
