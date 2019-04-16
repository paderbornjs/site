const grey = {
  greyXDark: 'hsl(199, 40%, 28%)',
  greyDark: 'hsl(199, 38%, 47%)',
  greyMDark: 'hsl(199, 36%, 66%)',
  greyMedium: 'hsl(199, 24%, 85%)',
  greyMBright: 'hsl(199, 30%, 94%)',
  greyBright: 'hsl(199, 38%, 98%)',
  greyXBright: 'hsl(199, 40%, 100%)',
}

const primary = {
  primaryXDark: 'hsl(219, 100%, 20%)',
  primaryDark: 'hsl(219, 90%, 30%)',
  primaryMDark: 'hsl(219, 80%, 40%)',
  primaryMedium: 'hsl(219, 70%, 50%)',
  primaryMBright: 'hsl(219, 80%, 68%)',
  primaryBright: 'hsl(219, 90%, 85%)',
  primaryXBright: 'hsl(219, 100%, 93%)',
}

const accent = {
  accentXDark: 'hsl(54, 100%, 22%)',
  accentDark: 'hsl(54, 97%, 28%)',
  accentMDark: 'hsl(54, 95%, 41%)',
  accentMedium: 'hsl(54, 93%, 54%)',
  accentMBright: 'hsl(54, 95%, 65%)',
  accentBright: 'hsl(54, 97%, 76%)',
  accentXBright: 'hsl(54, 100%, 87%)',
}

export default {
  breakpoints: ['550px', '768px'],
  fontSizes: [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72],
  space: [
    0,
    4,
    8,
    12,
    16,
    24,
    32,
    48,
    64,
    96,
    128,
    192,
    256,
    384,
    512,
    640,
    768,
  ],
  fonts: {
    sans:
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans",Ubuntu,Cantarell,"Helvetica Neue",Arial,sans-serif',
    serif: 'Merriweather,serif',
  },
  colors: {
    ...grey,
    ...primary,
    ...accent,
  },
}
