// @ flow

import type { Theme } from '../../types/Theme';

export default (theme: Theme) => ({
  row: {
    position: 'relative',
  },
  addressBox: {
    position: 'absolute',
    top: theme.units.spacing * 4,
    left: theme.units.spacing * 4,
    right: theme.units.spacing * 4,
    zIndex: 9,
  },
  toast: {
    backgroundColor: 'rgba(51, 51, 51, 0.90)',
    minHeight: 40,
    borderRadius: theme.units.radius * 2,
    boxShadow: theme.shadows[2],
    color: 'white',
  }
});
