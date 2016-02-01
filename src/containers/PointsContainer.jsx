import { connect } from 'react-redux';

import Points from '../components/Points';
import * as pointsActions from '../actions/points';


function mapStateToProps(state) {
  return {
    points: state.points
  };
}

export default connect(
  mapStateToProps,
  pointsActions
)(Points);
