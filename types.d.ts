export declare module '@mui/material/Chip' {
  // eslint-disable-next-line no-unused-vars
  interface ChipPropsColorOverrides  {
    gray: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
  }

  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
  }
}