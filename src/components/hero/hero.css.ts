import { style, styleVariants } from '@vanilla-extract/css';

const baseContainer = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  marginTop: '-90px',
  padding: '60px 0 0',
  height: '100vh',
  color: 'var(--background)',
  backgroundColor: 'rgb(100, 100, 100)',
  backgroundSize: 'cover' as const,
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat' as const,
  textAlign: 'center' as const,
};

export const container = style({
  ...baseContainer,
  backgroundImage: 'var(--hero-mobile-small)',
});

export const containerMobileLarge = style({
  ...baseContainer,
  backgroundImage: 'var(--hero-mobile-large)',
});

export const containerDesktopMedium = style({
  ...baseContainer,
  backgroundImage: 'var(--hero-desktop-medium)',
});

export const containerDesktopLarge = style({
  ...baseContainer,
  backgroundImage: 'var(--hero-desktop-large)',
});

export const title = style({
  fontSize: '30px',
  lineHeight: 1.2,
  fontWeight: 600,
  textAlign: 'center' as const,
  marginBottom: 0,
  color: 'var(--foreground)',
  letterSpacing: '-0.5px',
});

export const heading = styleVariants({
  1: {
    fontSize: '30px',
    lineHeight: 1.2,
    fontWeight: 600,
    textAlign: 'center' as const,
    marginBottom: 0,
    color: 'var(--foreground)',
    letterSpacing: '-0.5px',
  },
  2: {
    margin: '16px 0',
    fontSize: '14px',
    lineHeight: 1.3,
    fontWeight: 600,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '-0.5px',
  },
});

export const subtitle = style({
  margin: '16px 0',
  fontSize: '14px',
  lineHeight: 1.3,
  fontWeight: 600,
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.5px',
});

export const upper = style({
  textTransform: 'uppercase' as const,
});

// Media queries
const mediaQueries = {
  '@media (min-width: 481px)': {
    title: {
      fontSize: '32px',
    },
  },
  '@media (min-width: 641px)': {
    title: {
      fontSize: '46px',
      letterSpacing: '-1px',
    },
    subtitle: {
      fontSize: '20px',
      letterSpacing: '-1px',
    },
    heading: {
      1: {
        fontSize: '46px',
        letterSpacing: '-1px',
      },
      2: {
        fontSize: '20px',
        letterSpacing: '-1px',
      },
    },
    container: {
      marginTop: '-104px',
    },
  },
  '@media (min-width: 769px)': {
    subtitle: {
      '& br': {
        display: 'inline',
      },
    },
    heading: {
      2: {
        '& br': {
          display: 'inline',
        },
      },
    },
  },
  '@media (min-width: 961px)': {
    container: {
      marginTop: '-174px',
    },
    title: {
      fontSize: '60px',
      letterSpacing: '-1px',
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: '22px',
      letterSpacing: '-1px',
    },
    heading: {
      1: {
        fontSize: '60px',
        letterSpacing: '-1px',
        marginBottom: '20px',
      },
      2: {
        fontSize: '22px',
        letterSpacing: '-1px',
      },
    },
  },
};

// Apply media queries to styles
Object.entries(mediaQueries).forEach(([query, styles]) => {
  Object.entries(styles).forEach(([key, value]) => {
    if (key === 'container') {
      Object.assign(container, { [query]: value });
    } else if (key === 'title') {
      Object.assign(title, { [query]: value });
    } else if (key === 'subtitle') {
      Object.assign(subtitle, { [query]: value });
    } else if (key === 'heading') {
      Object.entries(value).forEach(([level, levelStyles]) => {
        const levelNum = parseInt(level) as 1 | 2;
        Object.assign(heading[levelNum], { [query]: levelStyles });
      });
    }
  });
}); 
