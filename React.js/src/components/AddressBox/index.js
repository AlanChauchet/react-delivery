// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';

import styles from './style';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';

import DropOffBadgeBlank from '../../assets/dropOffBadgeBlank.svg';
import PickUpBadgeBlank from '../../assets/pickUpBadgeBlank.svg';
import DropOffBadgeError from '../../assets/dropOffBadgeError.svg';
import PickUpBadgeError from '../../assets/pickUpBadgeError.svg';
import DropOffBadgePresent from '../../assets/dropOffBadgePresent.svg';
import PickUpBadgePresent from '../../assets/pickUpBadgePresent.svg';

type Props = {
  classes: any,
  pickUpState: 'blank' | 'error' | 'present',
  dropOffState: 'blank' | 'error' | 'present',
} & FormProps;

class AddressBox extends PureComponent<Props> {
  icons = {
    pickUp: {
      blank: PickUpBadgeBlank,
      error: PickUpBadgeError,
      present: PickUpBadgePresent,
    },
    dropOff: {
      blank: DropOffBadgeBlank,
      error: DropOffBadgeError,
      present: DropOffBadgePresent,
    },
  };

  render() {
    const { classes, pickUpState, dropOffState, handleSubmit, submitting, disabled } = this.props;

    return (
      <Card className={classes.root}>
        <div className={classes.inputContainer}>
          <img
            src={this.icons.pickUp[pickUpState]}
            alt="Pick up"
            className={classes.inputIcon}
          />
          <Field
            component={Input}
            name="pickUpAddress"
            placeholder="Pick up address"
          />
        </div>
        <div className={classes.inputContainer}>
          <img
            src={this.icons.dropOff[dropOffState]}
            alt="Drop off"
            className={classes.inputIcon}
          />
          <Field
            component={Input}
            name="dropOffAddress"
            placeholder="Drop off address"
          />
        </div>
        <div className={classes.submitContainer}>
          <Button onClick={handleSubmit} disabled={disabled || submitting}>
            {submitting ? 'Creating...' : 'Create job'}
          </Button>
        </div>
      </Card>
    );
  }
}

export default compose(
  injectSheet(styles),
  reduxForm()
)(AddressBox);
