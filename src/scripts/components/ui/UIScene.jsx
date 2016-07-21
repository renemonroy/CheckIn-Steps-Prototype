import React, { PropTypes } from 'react';
import Radium from 'radium';
import cx from 'classnames';
let styles = null;

/** Scene Class
 *----------------------------------------------------------------------------*/
@Radium
class UIScene extends React.Component {

  static displayName = 'UIScene';

  static propTypes = {
    name: PropTypes.string.isRequired,
    header: PropTypes.func,
    sidebar: PropTypes.func,
    content: PropTypes.func,
    style: PropTypes.object,
  };

  render() {
    const { name, header, sidebar, content, style } = this.props;
    const { base, withHeaderStyle, withoutHeaderStyle } = styles.mainStyle;
    const className = cx({ [`${name}-scene`]: true });
    const sceneStyles = [styles.sceneStyle.base, style];
    const mainStyles = [base, header ? withHeaderStyle : withoutHeaderStyle];
    return (
      <section className={className} style={sceneStyles}>
        {header ? <div style={styles.headerStyle}>{header()}</div> : null}
        <div style={mainStyles}>
          {sidebar ? <div style={styles.sidebarStyle}>{sidebar()}</div> : null}
          {content ? <div style={styles.contentStyle}>{content()}</div> : null}
        </div>
      </section>
    );
  }

}

/** Scene Styles
 *----------------------------------------------------------------------------*/
styles = {
  sceneStyle: {
    base: {
      height: 'calc(100% - 2.1rem)',
      width: '100%',
      margin: '2.1rem 0 0',
    },
  },
  headerStyle: {
    backgroundColor: '#202223',
    height: '11.3rem',
    width: '100%',
  },
  mainStyle: {
    base: {
      width: '100%',
      overflowY: 'hidden',
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'stretch',
      alignContent: 'flex-start',
    },
    withHeaderStyle: {
      height: 'calc(100% - 11.3rem)',
    },
    withoutHeaderStyle: {
      height: '100%',
    },
  },
  sidebarStyle: {
    backgroundColor: '#f3f3f4',
    width: '15rem',
    height: '100%',
    flex: '0 1 15rem',
    order: 1,
    overflowY: 'auto',
    boxShadow: 'inset -1px 1px 0 #e8e9ea',
  },
  contentStyle: {
    backgroundColor: '#ffffff',
    height: '100%',
    flex: '1 1',
    order: 2,
    overflowY: 'auto',
    padding: '2.6rem 2.2rem',
  },
};

export default UIScene;
