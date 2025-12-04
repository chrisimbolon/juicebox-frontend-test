// src/lib/design-tokens.ts

export const DESIGN_TOKENS = {
  // Exact colors from Figma
  colors: {
    background: {
      dark: '#0C0D10',
      light: '#FAFAFA',
    },
    type: {
      lightHeading: '#FAFAFA',
      darkHeading: '#0C0D10',
      muted: '#BFBFBF',
    },
    brand: {
      primary: '#CDAAFF',
      accent: '#9B7FF7',
    },
    overlay: {
      glass: 'rgba(255, 255, 255, 0.05)', // #FFFFFF0D
      glassBorder: 'rgba(255, 255, 255, 0.1)', // #FFFFFF1A
      input: 'rgba(255, 255, 255, 0.2)', // #FFFFFF33
    },
  },

  // Spacing from Figma
  spacing: {
    moduleLeftRight: 20, // px
    smlModuleTopBtm: 28, // px
    mdSpacing: 20, // px
  },

  // Typography from Figma
  typography: {
    h2: {
      fontFamily: 'Bagoss TRIAL',
      fontSize: 34, // Text Size/H2
      lineHeight: '120%',
      letterSpacing: '1%',
    },
    body: {
      fontFamily: 'Söhne',
      fontSize: 18, // Text Size/Body
      lineHeight: '135%',
      letterSpacing: '2%',
    },
    caption: {
      fontFamily: 'Söhne',
      fontSize: 12, // Text Size/Caption
      lineHeight: '135%',
      letterSpacing: '2%',
    },
  },

  // Border radius
  radius: {
    button: 12, // px
    input: 12, // px
    card: 16, // px
    full: 200, // px (for circular elements)
  },

  // Component dimensions
  dimensions: {
    button: {
      height: 60,
      width: 350,
    },
    input: {
      height: 44,
      width: 330,
    },
    backButton: {
      size: 46,
    },
  },
} as const;

// Helper to convert design tokens to CSS variables
export const cssVars = {
  '--bg-dark': DESIGN_TOKENS.colors.background.dark,
  '--bg-light': DESIGN_TOKENS.colors.background.light,
  '--type-light': DESIGN_TOKENS.colors.type.lightHeading,
  '--type-dark': DESIGN_TOKENS.colors.type.darkHeading,
  '--type-muted': DESIGN_TOKENS.colors.type.muted,
  '--primary': DESIGN_TOKENS.colors.brand.primary,
  '--accent': DESIGN_TOKENS.colors.brand.accent,
  '--glass': DESIGN_TOKENS.colors.overlay.glass,
  '--glass-border': DESIGN_TOKENS.colors.overlay.glassBorder,
  '--input-bg': DESIGN_TOKENS.colors.overlay.input,
} as const;