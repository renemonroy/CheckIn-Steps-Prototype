require('./TriviaChoice.styl');
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { TriviasActions } from '../../actions/';
import { spring, Motion } from 'react-motion';
import { fastEaseOut, fastEaseOutElastic } from '../../constants/SpringPresets';

class TriviaChoice extends Component {

  static displayName = 'TriviaChoice';

  static propTypes = {
    dispatch: PropTypes.func,
    id: PropTypes.string,
    triviaId: PropTypes.string.isRequired,
    choiceData: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
  }

  handleEnd() {
    const { triviaId, id, active, dispatch } = this.props;
    if (active === true) {
      dispatch(TriviasActions.voteFor(triviaId, id));
    } else {
      console.log('>>> Already voted!');
    }
  }

  handleTouchStart() {
    this.setState({ isPressed: true });
  }

  handleTouchEnd() {
    this.setState({ isPressed: false }, ::this.handleEnd);
  }

  render() {
    const { isPressed } = this.state;
    const { active, choiceData } = this.props;
    const { title, votes, assets } = choiceData;
    const buttonStyle = isPressed
      ? { scale: spring(1.1, fastEaseOutElastic) }
      : { scale: spring(1, fastEaseOutElastic) };
    const votesStyle = active
      ? { hScale: spring(2, fastEaseOut), opacity: spring(0, fastEaseOut) }
      : { hScale: spring(1, fastEaseOut), opacity: spring(1, fastEaseOut) };

    return (
      <div className="ncss-col-sm-6 u-align-center avatar pl1-sm choice-col">
        <Motion style={buttonStyle}>
          {({ scale }) =>
            <div
              className="choice ncss-brand h1 u-va-m z0"
              onTouchStart={::this.handleTouchStart}
              onTouchEnd={::this.handleTouchEnd}
              style={{
                transform: `translate3d(0, 0, 0) scale(${scale})`,
                WebkitTransform: `translate3d(0, 0, 0) scale(${scale})`,
                backgroundImage: `url('${assets.image}')`,
              }}
            >
              <Motion style={votesStyle}>
                {({ opacity, hScale }) =>
                  <div
                    className="votes-number-wrapper"
                    style={{ backgroundColor: `rgba(255, 255, 255, ${opacity / 2})` }}
                  >
                    <div
                      className="votes-number ncss-brand u-align-center z9"
                      style={{ opacity }}
                    >
                      <h1
                        style={{
                          transform: `translate3d(0, 0, 0) scale(${hScale})`,
                          WebkitTransform: `translate3d(0, 0, 0) scale(${hScale})`,
                        }}
                      >
                        {votes}
                      </h1>
                    </div>
                  </div>
                }
              </Motion>
            </div>
          }
        </Motion>
        <div className="ncss-brand h3 text-color-dark-grey">{title}</div>
      </div>
    );
  }

}

export default connect()(TriviaChoice);
