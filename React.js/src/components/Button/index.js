// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { cx } from 'emotion';

import styles from './style';

export type Props = {
  classes: any,
  children: any,
  className?: any,
  variant: 'primary',
  disabled?: boolean,
};

class Button extends PureComponent<Props> {
  static defaultProps = {
    variant: 'primary',
  };

  render() {
    const { classes, children, className, ...otherProps } = this.props;

    return (
      <button className={cx(classes.root, className)} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default injectSheet(styles)(Button);
