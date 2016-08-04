import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import Radium from 'radium';
import { fastEaseOutElastic } from '../../constants/SpringPresets';
// import { UIActions } from '../../actions';
let styles = null;

/** UIContent Class
 *----------------------------------------------------------------------------*/
@connect(state => ({
  // active: !state.UI.get('showSidebar'),
  // slideWidth: state.UI.get('sidebarWidth'),
  // disableSidebarAnimation: state.UI.get('disableSidebarAnimation'),
  active: true,
  slideWidth: 0,
  disableSidebarAnimation: true,
}))
@Radium
class UIContent extends React.Component {

  static displayName = 'UIContent';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    disableSidebarAnimation: PropTypes.bool.isRequired,
    slideWidth: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  getAnimation() {
    const { active, slideWidth } = this.props;
    return { x: spring(active ? 0 : slideWidth, fastEaseOutElastic) };
  }

  setStyles(anim) {
    const { slideWidth, disableSidebarAnimation } = this.props;
    const x = disableSidebarAnimation ? slideWidth : anim.x;
    const animStyle = {
      WebkitTransform: `translate3d(${x}px, 0, 0)`,
      transform: `translate3d(${x}px, 0, 0)`,
    };
    if (disableSidebarAnimation) {
      animStyle.width = `calc(100% - ${slideWidth}px)`;
    }
    return [styles.contentStyle, animStyle];
  }

  renderOverlay() {
    // const toggleSidebar = () => this.props.dispatch(UIActions.toggleSidebar());
    // return <div style={styles.overlayStyle} onClick={toggleSidebar}></div>;
    return null;
  }

  renderContent(anim) {
    const { children, disableSidebarAnimation } = this.props;
    return (
      <div style={this.setStyles(anim)}>
        {disableSidebarAnimation ? null : this.renderOverlay()}
        {children}
      </div>
    );
  }

  render() {
    return (
      <Motion style={this.getAnimation()}>
        {this.renderContent.bind(this)}
      </Motion>
    );
  }

}

/** UIContent Styles
 *----------------------------------------------------------------------------*/
styles = {
  contentStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  overlayStyle: {
    height: '100%',
    width: '100%',
  },
};

export default UIContent;
