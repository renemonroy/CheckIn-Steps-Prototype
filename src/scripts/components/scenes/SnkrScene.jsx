import React, { PropTypes, Component } from 'react';
import { UIScene } from '../ui';
import { connect } from 'react-redux';

@connect((state, props) => ({
  snkr: state.Snkrs.get(props.params.snkrId).toJS(),
}))
class NewSnkrScene extends Component {

  static displayName = 'NewSnkrScene';

  static propTypes = {
    snkr: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object,
  };

  static defaultProps = {
    snkr: {},
  };

  static contextTypes = {
    location: PropTypes.object,
  };

  getContext() {
    return { location: this.props.location };
  }

  renderContent() {
    const { description } = this.props.snkr;
    return (
      <div>
        <p>{description}</p>
      </div>
    );
  }

  render() {
    const { snkr } = this.props;
    console.log('asdalsdas');
    return (
      <UIScene
        name="newsnkr"
        content={() => (Object.keys(snkr).length > 0 ? this.renderContent() : null)}
      />
    );
  }

}

export default NewSnkrScene;
