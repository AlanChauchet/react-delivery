// @flow

import type { Theme } from '../../types/Theme';

export default (theme: Theme) => ({
  root: {
    padding: theme.units.spacing * 2,
    backgroundColor: 'white',
    borderRadius: theme.units.radius * 2,
    boxShadow: theme.shadows[2],
  },
  inputContainer: {
    display: 'flex',
    marginBottom: theme.units.spacing * 2,
    '& input': {
      flex: 1,
    }
  },
  inputIcon: {
    marginRight: theme.units.spacing,
  },
  submitContainer: {
    display: 'flex',
    paddingLeft: theme.units.spacing * 5,
    '& button': {
      flex: 1,
    }
  }
});
