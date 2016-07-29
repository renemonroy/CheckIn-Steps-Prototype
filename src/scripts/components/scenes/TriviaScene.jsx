import React, { PropTypes, Component } from 'react';
import { UIScene } from '../ui';
import { connect } from 'react-redux';
import { TriviaChoice } from '../sections';
import _ from 'underscore';

@connect((state, { params }) => ({
  trivia: state.trivias.get(params.triviaId),
}))
class TriviaScene extends Component {

  static displayNmae = 'TriviaScene';

  static propTypes = {
    trivia: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  static defaultProps = {
    trivia: {},
    params: {},
  };

  renderLoading() {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  renderContent() {
    const { trivia, params } = this.props;
    const { question, choices, voted } = trivia.toJS();
    const { triviaId } = params;
    return (
      <div className="ncss-container fixed-fluid p4-sm u-sm-t u-full-height">
        <div className="trivia-scene-content u-sm-tc u-va-m u-align-center u-sm-tr">
          <div className="ncss-row pb12-md pb12-lg" key={`trivia-${params.triviaId}`}>
            <h2 className="ncss-brand">{question}</h2>
          </div>
          <div className="ncss-row">
            {
              _.map(choices, (choiceData, choiceId) =>
                <TriviaChoice
                  key={`trivia-choice-${choiceId}`}
                  id={choiceId}
                  triviaId={triviaId}
                  choiceData={choiceData}
                  active={!voted}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { trivia } = this.props;
    return (
      <UIScene
        name="snkr-trivia"
        content={() => (Object.keys(trivia).length > 0 ?
          this.renderContent() : null
        )}
      />
    );
  }

}

export default TriviaScene;
