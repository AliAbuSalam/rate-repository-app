import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textWhite: '#FFFFFF',
    primary: '#0366d6',
    appBarBackground: '#2ADBB0',
    appBarText: '#FFFFFF',
    background: '#e1e4e8',
    buttonBackground: '#0269FE',
    touchableBackground: '#CFD1D5',
    buttonRed: '#EA1E02',
  },
  fontSizes: {
    body: 14,
    button: 16,
    subheading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
};

export default theme;