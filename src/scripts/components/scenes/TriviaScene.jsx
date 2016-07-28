require('./TriviaScene.styl');
import React, { PropTypes, Component } from 'react';
import { UIScene } from '../ui';
import { connect } from 'react-redux';
import { TriviasActions } from '../../actions';
import _ from 'underscore';

@connect((state, { params }) => ({
  trivia: state.trivias.get(params.triviaId),
}))
class TriviaScene extends Component {

  static displayNmae = 'TriviaScene';

  static propTypes = {
    trivia: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    trivia: {},
    params: {},
  };

  renderContent() {
    const { trivia, params, dispatch } = this.props;
    const { question, choices } = trivia.toJS();
    const { triviaId } = params;
    return (
      <div className="u-sm-tc u-va-m u-align-center u-sm-tr">
        <div className="ncss-row pb12-md pb12-lg" key={`trivia-${params.triviaId}`}>
          <div className="ncss-brand h2 lh-h2">{question}</div>
          <div className="ncss-row">
            {
              _.map(choices, ({ title, assets }, choiceId) =>
                <div
                  key={`trivia-choice-${choiceId}`}
                  className="ncss-col-sm-6 u-align-center avatar pl1-sm choice"
                  onClick={() => dispatch(TriviasActions.voteFor(triviaId, choiceId))}
                >
                  <div
                    className="choice ncss-brand h1 u-va-m z0"
                    style={{ backgroundImage: `url('${assets.image}')` }}
                  />
                  <div className="ncss-brand h3 text-color-dark-grey">{title}</div>
                </div>
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
        content={() => (Object.keys(trivia).length > 0 ? this.renderContent() : null)}
      />
    );
  }

}

export default TriviaScene;
