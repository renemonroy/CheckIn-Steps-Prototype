require('./UIScenesGroup.styl');
import React, { PropTypes } from 'react';
import { RouteTransition, presets } from 'react-router-transition';

class UIScenesGroup extends React.Component {

  static displayName = 'UIScenesGroup';

  static propTypes = {
    scenes: PropTypes.func.isRequired,
    sceneRoute: PropTypes.string.isRequired,
  };

  render() {
    const { sceneRoute, scenes } = this.props;
    return (
      <RouteTransition
        component={'div'}
        pathname={sceneRoute}
        className="ui-scenes-group"
        {...presets.slideLeft}
      >
        {scenes()}
      </RouteTransition>
    );
  }

}

export default UIScenesGroup;
