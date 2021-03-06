import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import teal from '@material-ui/core/colors/blueGrey';


const theme = createMuiTheme({

  palette: {
    primary: teal, // Purple and green play nicely together.
  },

  mixins: {
    toolbar: {
      minHeight: 48,
    }
  },

  // custom: {
  //   appbar: {
  //     position: 'fixed',
  //   }
  // },

  typography: {
    useNextVariants: true,
    subtitle2: {
      fontSize: '0.95rem',
    },
  },


  // overrides: {
  //   MuiToolbar: {
  //     root: {
  //       minHeight: 48,
  //     },
  //   },
  //   MuiAppBar: {
  //     root: {
  //       backgroundColor: colors.lightBlack,
  //     }
  //   },
  // },

});

export default theme;

