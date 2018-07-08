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
} & FormProps;

class AddressBox extends PureComponent<Props> {
  render() {
    const { classes, handleSubmit, submitting, invalid } = this.props;

    return (
      <Card className={classes.root}>
        <div className={classes.inputContainer}>
          <img
            src={DropOffBadgeBlank}
            alt="Drop off"
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
            src={PickUpBadgeBlank}
            alt="Pick up"
            className={classes.inputIcon}
          />
          <Field
            component={Input}
            name="dropOffAddress"
            placeholder="Drop off address"
          />
        </div>
        <div className={classes.submitContainer}>
          <Button onClick={handleSubmit} disabled={invalid || submitting}>
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
