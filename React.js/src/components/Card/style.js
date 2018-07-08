// @flow

import type { Theme } from '../../types/Theme';

export default (theme: Theme) => ({
  root: {
    padding: theme.units.spacing * 2,
    backgroundColor: 'white',
    borderRadius: theme.units.radius * 2,
    boxShadow: theme.shadows[2],
  }
});
