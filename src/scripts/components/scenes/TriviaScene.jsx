require('./TriviaScene.styl');
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
    style: PropTypes.object,
  };

  static defaultProps = {
    trivia: {},
    params: {},
  };

  renderLoading() {
    return (
      <div className="ncss-container fixed-fluid p4-sm u-sm-t u-full-height">
        <div className="trivia-scene-content u-sm-tc u-va-m u-align-center u-sm-tr">
          <div className="ncss-row pb12-md pb12-lg">
            <h2 className="ncss-brand placeholder bg-offwhite"></h2>
          </div>
          <div className="ncss-row">
            <div className="ncss-col-sm-6 u-align-center avatar pl1-sm choice-col">
              <div className="trivia-choice ncss-brand h1 u-va-m z0 placeholder bg-offwhite" />
              <div className="ncss-brand h3 text-color-dark-grey placeholder bg-offwhite" />
            </div>
            <div className="ncss-col-sm-6 u-align-center avatar pl1-sm choice-col">
              <div className="trivia-choice ncss-brand h1 u-va-m z0 placeholder bg-offwhite" />
              <div className="ncss-brand h3 text-color-dark-grey placeholder bg-offwhite" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    const { trivia, params, style } = this.props;
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
    const { trivia, style } = this.props;
    return (
      <UIScene
        name="trivia"
        style={style}
        content={() => (Object.keys(trivia).length > 0 ?
          this.renderContent() : this.renderLoading()
        )}
      />
    );
  }

}

export default TriviaScene;
