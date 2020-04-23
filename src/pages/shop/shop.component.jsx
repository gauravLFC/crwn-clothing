import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.get().then((snapshot) => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

export default connect(null, {
  updateCollections,
})(ShopPage);
