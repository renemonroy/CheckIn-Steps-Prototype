require('./SnkrScene.styl');
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

  constructor(props) {
    super(props);
    this.state = {
      previewLoaded: false,
      largeImageLoaded: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    if (!this.hasSnkrData()) {
      dispatch(SnkrsActions.fetchSnkrs());
    }
  }

  hasSnkrData() {
    return Object.keys(this.props.snkr).length > 0;
  }

  handlePreviewLoad() {
    this.setState({ previewLoaded: true });
  }

  handleLargeImageLoad() {
    this.setState({ largeImageLoaded: true });
  }

  renderLargeImage(src) {
    const largeImageClass = this.state.largeImageLoaded ? ' loaded' : '';
    return (
      <img
        src={src}
        role="presentation"
        onLoad={::this.handleLargeImageLoad}
        className={`snkr-large-image${largeImageClass}`}
      />
    );
  }

  renderSnkr() {
    const { snkr } = this.props;
    const { description, assets } = snkr.toJS();
    const { previewLoaded } = this.state;
    const previewLoadedClass = previewLoaded ? ' loaded' : '';
    return (
      <div className="ncss-container fixed-fluid p4-sm u-sm-t u-full-height">
        <div className="trivia-scene-content u-sm-tc u-va-m u-align-center u-sm-tr">
          <div className="ncss-col-sm-6 u-align-center p0-sm choice-col snkr-img-wrapper">
            <img
              src={assets.preload}
              role="presentation"
              onLoad={::this.handlePreviewLoad}
              className={`snkr-img-preview${previewLoadedClass}`}
            />
            {previewLoaded ?
              this.renderLargeImage(assets.default) :
              null
            }
          </div>
          <p>{description}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <UIScene
        name="snkr"
        content={() => (this.hasSnkrData() ? this.renderSnkr() : null)}
      />
    );
  }

}

export default NewSnkrScene;
