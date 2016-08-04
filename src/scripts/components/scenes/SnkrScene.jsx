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
    style: PropTypes.object,
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

  renderLargeImage(src, unlocked) {
    const largeImageClass = this.state.largeImageLoaded ? ' loaded' : '';
    const blurValue = (100 - (unlocked * 100)) / 5;
    return (
      <img
        src={src}
        role="presentation"
        onLoad={::this.handleLargeImageLoad}
        className={`snkr-large-image${largeImageClass}`}
        style={{ filter: `blur(${blurValue}px)` }}
      />
    );
  }

  renderProgress(progress, remaining) {
    const width = this.state.largeImageLoaded ? progress * 100 : 0;
    const opacity = this.state.largeImageLoaded ? 1 : 0;
    const remaininActive = this.state.largeImageLoaded ? ' active' : '';
    return (
      <div
        className="snkr-progress-wrapper"
        style={{ opacity }}
      >
        <div
          className="snkr-progress"
          style={{ width: `${width}%` }}
        >
          <div className={`snkr-remaining${remaininActive}`}>
            <h2>{remaining}</h2>
            <h6>More</h6>
            <div className="snkr-remaining-arrow" />
          </div>
        </div>
      </div>
    );
  }

  renderSnkr() {
    const { snkr } = this.props;
    const { title, subtitle, description, assets, votes } = snkr.toJS();
    const { previewLoaded } = this.state;
    const previewLoadedClass = previewLoaded ? ' loaded' : '';
    const percent = votes.current / votes.limit;
    const remaining = votes.limit - votes.current;
    return (
      <div className="ncss-container fixed-fluid p0-sm u-sm-t u-full-height">
        <div className="trivia-scene-content u-sm-tc u-align-center u-sm-tr">
          <div className="ncss-row u-align-center p0-sm m0-sm snkr-img-wrapper">
            <img
              src={assets.preload}
              role="presentation"
              onLoad={::this.handlePreviewLoad}
              className={`snkr-img-preview${previewLoadedClass}`}
            />
            {previewLoaded ?
              this.renderLargeImage(assets.default, percent) :
              null
            }
          </div>
          {this.renderProgress(percent, remaining)}
          <div className="ncss-row ncss-row mt4-sm pt4-sm pb2-sm pl4-sm pr4-sm">
            <div className="ncss-col-sm-12">
              <h2 className="ncss-brand">{title}</h2>
              <h5 className="ncss-brand pb4-sm">{subtitle}</h5>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <UIScene
        name="snkr"
        style={this.props.style}
        content={() => (this.hasSnkrData() ? this.renderSnkr() : null)}
      />
    );
  }

}

export default NewSnkrScene;
