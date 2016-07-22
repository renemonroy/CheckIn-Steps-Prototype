import React, { PropTypes, Component } from 'react';
import { UIContent, UIScenesGroup } from './ui';

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
      </div>
    );
  }

}

export default App;
