import React, { PropTypes } from 'react';
import _ from 'lodash';
import { TransitionMotion, spring } from 'react-motion';
import Radium from 'radium';
import { fastEaseOut } from '../../constants/SpringPresets';
let styles = null;

/** UIScenesGroup Class
 *----------------------------------------------------------------------------*/
@Radium
class UIScenesGroup extends React.Component {

  static displayName = 'UIScenesGroup';

  static propTypes = {
    sceneRoute: PropTypes.string.isRequired,
    scenes: PropTypes.func.isRequired,
  };

  getAnimation() {
    return {
      [this.props.sceneRoute]: {
        handler: this.props.scenes(),
        opacity: spring(1, fastEaseOut),
      },
    };
  }

  willEnter() {
    return { handler: this.props.scenes(), opacity: spring(0, fastEaseOut) };
  }

  willLeave(key, anim) {
    return { handler: anim.handler, opacity: spring(0, fastEaseOut) };
  }

  handleScenesGroup(anim) {
    const scenes = _.map(_.keys(anim), (key) => {
      const sceneAnim = anim[key];
      const sceneStyle = { opacity: sceneAnim.opacity };
      const style = [styles.sceneWrapper, sceneStyle];
      return (
        <div key={`${key}-scene-trans`} style={style}>
          {sceneAnim.handler}
        </div>
      );
    });
    return <div id="scenes-group">{scenes}</div>;
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getAnimation()}
        willEnter={::this.willEnter}
        willLeave={::this.willLeave}
      >
        {this.handleScenesGroup.bind(this)}
      </TransitionMotion>
    );
  }

}

/** UIScenesGroup Styles
 *----------------------------------------------------------------------------*/
styles = {
  sceneWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export default UIScenesGroup;
