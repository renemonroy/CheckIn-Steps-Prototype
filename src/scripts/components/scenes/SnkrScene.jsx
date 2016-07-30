import React, { PropTypes, Component } from 'react';
import { UIScene } from '../ui';
import { connect } from 'react-redux';
import { SnkrsActions } from '../../actions';

@connect((state, { params }) => ({
  snkr: state.snkrs.get(params.snkrId),
}))
class NewSnkrScene extends Component {

  static displayName = 'NewSnkrScene';

  static propTypes = {
    snkr: PropTypes.object.isRequired,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    snkr: {},
    params: {},
  };

  componentWillMount() {
    const { dispatch } = this.props;
    if (!this.hasSnkrData()) {
      dispatch(SnkrsActions.fetchSnkrs());
    }
  }

  shouldComponentUpdate() {
    return !this.hasSnkrData();
  }

  hasSnkrData() {
    return Object.keys(this.props.snkr).length > 0;
  }

  renderSnkr() {
    const { snkr } = this.props;
    const { description } = snkr.toJS();
    return (
      <div>
        <p>{description}</p>
      </div>
    );
  }

  render() {
    return (
      <UIScene
        name="newsnkr"
        content={() => (this.hasSnkrData() ? this.renderSnkr() : null)}
      />
    );
  }

}

export default NewSnkrScene;
