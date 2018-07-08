// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';

import styles from './style';

type Props = {
  classes: any,
  input: any,
};

class Input extends PureComponent<Props> {
  render() {
    const { classes, input, ...otherProps } = this.props;

    return (
      <input className={classes.root} {...input} {...otherProps} />
    );
  }
}

export default injectSheet(styles)(Input);
