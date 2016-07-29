require('./App.styl');
import React, { PropTypes, Component } from 'react';
import { UIContent, UIScenesGroup, UIPlayer } from './ui';

class App extends Component {

  static displayName = 'App';

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const { children, location: loc } = this.props;
    return (
      <div id="app">
        <UIContent>
          <UIScenesGroup scenes={() => children} sceneRoute={loc.pathname} />
        </UIContent>
        <UIPlayer />
        <span className="preload-font ncss-brand">Nike</span>
      </div>
    );
  }

}

export default App;
