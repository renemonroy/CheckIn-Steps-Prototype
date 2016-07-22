import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { UIScene } from '../ui';
import { VoteForLoyalty } from '../blocks';

class SnkrVoteScene extends Component {

  static displayName = 'SnkrVoteScene';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Dispatch the loading of the match
    // this.props.dispatch(MissionActions.fetchMissionsList());
  }

  render() {
    console.log('SnkrVoteScene');
    return (
      <UIScene
        content={() => <VoteForLoyalty />}
        name="snkrvote"
      />
    );
  }

}

export default connect()(SnkrVoteScene);
