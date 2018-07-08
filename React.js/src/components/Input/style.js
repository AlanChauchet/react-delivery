// @flow

import type { Theme } from '../../types/Theme';

export default (theme: Theme) => ({
  root: {
    fontFamily: theme.fontFamily,
    color: theme.color.text.primary,
    border: 'none',
    borderRadius: theme.units.radius,
    backgroundColor: theme.color.background.greyLight,
    height: 32,
    paddingLeft: theme.units.spacing,
    paddingRight: theme.units.spacing,
    '&::placeholder': {
      color: theme.color.text.secondary,
    }
  }
});
