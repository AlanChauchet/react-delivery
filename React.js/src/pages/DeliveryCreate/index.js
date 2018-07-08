// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators, compose } from 'redux';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';

import styles from './style';
import AddressBox from '../../components/AddressBox';
import Map from '../../components/Map';
import { Creators as DeliveryCreators } from '../../actions/delivery';

import PickUpMarker from '../../assets/pickUpMarker.svg';
import DropOffMarker from '../../assets/dropOffMarker.svg';

type Props = {
  classes: any,
  delivery: any,
  createDelivery: (pickUp: string, dropOff: string) => Promise<any>,
};

class DeliveryCreate extends PureComponent<Props> {
  onValidateAddresses = debounce(({ pickUpAddress, dropOffAddress }, dispatch) => {
    const { delivery } = this.props;

    if (delivery.pickUp.address !== pickUpAddress) {
      dispatch(DeliveryCreators.fetchLocation(pickUpAddress, 'pickUp'))
        .catch(() => 1);
    }
    if (delivery.dropOff.address !== dropOffAddress) {
      dispatch(DeliveryCreators.fetchLocation(dropOffAddress, 'dropOff'))
        .catch(() => 1);
    }
  }, 1000);

  submit = ({ pickUpAddress, dropOffAddress }) => {
    const { classes } = this.props;

    this.props.createDelivery(pickUpAddress, dropOffAddress)
      .then(() => {
        toast('Job has been created successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          className: classes.toast,
        });
      })
      .catch(err => console.error(err));
  };

  getMarkers = () => {
    const { delivery } = this.props;
    const markers = [];

    if (typeof delivery.pickUp.location === 'object' &&
      delivery.pickUp.location !== null) {
      markers.push({
        id: 'pickUp',
        position: delivery.pickUp.location,
        icon: PickUpMarker,
      });
    }
    if (typeof delivery.dropOff.location === 'object' &&
      delivery.dropOff.location !== null) {
      markers.push({
        id: 'dropOff',
        position: delivery.dropOff.location,
        icon: DropOffMarker,
      });
    }
    return markers;
  };

  getAddressState = (location: -1 | null | Object) => {
    if (!location) {
      return 'blank';
    }
    if (location === -1) {
      return 'error';
    }
    return 'present';
  };

  getIsValid = () => {
    const { delivery } = this.props;

    return (
      typeof delivery.pickUp.location === 'object' &&
      typeof delivery.dropOff.location === 'object' &&
      delivery.pickUp.location !== null &&
      delivery.dropOff.location !== null
    );
  };

  render() {
    const { classes, delivery } = this.props;

    return (
      <div className={classes.root}>
        <div className={cx(classes.addressBox, 'row')}>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <AddressBox
              form="delivery"
              onChange={this.onValidateAddresses}
              onSubmit={this.submit}
              pickUpState={this.getAddressState(delivery.pickUp.location)}
              dropOffState={this.getAddressState(delivery.dropOff.location)}
              disabled={!this.getIsValid()}
            />
          </div>
        </div>
        <Map markers={this.getMarkers()} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  delivery: state.delivery,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    createDelivery: DeliveryCreators.createDelivery,
  },
  dispatch
);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DeliveryCreate);
