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
    children: PropTypes.any,
  };

  getAnimation() {
    const { sceneRoute } = this.props;
    return [{
      key: sceneRoute,
      data: this.props.scenes(),
      style: { opacity: spring(1, fastEaseOut) },
    }];
  }

  willEnter() {
    return { opacity: spring(0, fastEaseOut) };
  }

  willLeave() {
    return { opacity: spring(0, fastEaseOut) };
  }

  handleScenesGroup(interpolatedStyles) {
    const scenes = _.map(_.keys(interpolatedStyles), (key) => {
      const sceneAnim = interpolatedStyles[key];
      const sceneStyle = { opacity: sceneAnim.opacity };
      const style = [styles.sceneWrapper, sceneStyle];
      return (
        <div key={`${key}-scene-trans`} style={style}>
          {sceneAnim.data}
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
