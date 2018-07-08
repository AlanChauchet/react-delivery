// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';

import styles from './style';

type Props = {
  classes: any,
  children: any,
};

class Card extends PureComponent<Props> {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}

export default injectSheet(styles)(Card);
