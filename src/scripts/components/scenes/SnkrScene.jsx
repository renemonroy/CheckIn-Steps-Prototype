import React, { PropTypes, Component } from 'react';
import { UIScene } from '../ui';
import { connect } from 'react-redux';

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
    const { snkr } = this.props;
    return (
      <UIScene
        name="newsnkr"
        content={() => (Object.keys(snkr).length > 0 ? this.renderSnkr() : null)}
      />
    );
  }

}

export default NewSnkrScene;
