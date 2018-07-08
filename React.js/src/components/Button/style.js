// @flow

import type { Theme } from '../../types/Theme';
import type { Props as ButtonProps } from './index';

export default (theme: Theme) => ({
  root: (props: ButtonProps) => ({
    ...theme.button[props.variant],
    fontFamily: theme.fontFamily,
    cursor: 'pointer',
    opacity: props.disabled ? 0.5 : 1,
    transition: 'all 300ms ease',
  })
});
