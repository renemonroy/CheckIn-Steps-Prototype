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

  componentDidMount() {
    this.props.dispatch(TriviasActions.fetchTrivias());
  }

  renderContent() {
    const { trivia, params } = this.props;
    const { question, choices } = trivia.toJS();
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

// require('./SnkrTriviaScene.styl');
// import React, { PropTypes, Component } from 'react';
// import { connect } from 'react-redux';
// import { UIScene } from '../ui';
// import { TriviasActions } from '../../actions';
// import _ from 'lodash';
//
// @connect(state => ({
//   trivias: state.Trivias.toJS(),
// }))
// class SnkrVoteScene extends Component {
//
//   static displayName = 'SnkrVoteScene';
//
//   static propTypes = {
//     router: PropTypes.object,
//     dispatch: PropTypes.func.isRequired,
//     trivias: PropTypes.object.isRequired,
//     triviaId: PropTypes.number,
//   };
//
//   static defaultProps = {
//     trivias: {},
//     triviaId: 1123,
//   };
//
//   static contextTypes = {
//     router: PropTypes.object,
//   };
//
//   shouldComponentUpdate(nextProps) {
//     const { trivias, triviaId } = this.props;
//     return trivias[triviaId] !== nextProps.trivias[nextProps.triviaId];
//   }
//
//   componentDidUpdate(prevProps) {
//     const { trivias, triviaId } = this.props;
//     const trivia = trivias[triviaId];
//     // if (prevProps.trivias[prevProps.triviaId].selected !== trivia.selected) {
//     //   this.context.router.push(`/snkrs/${trivia.options[trivia.selected].snkr}`);
//     // }
//   }
//
//   getContext() {
//     return { router: this.props.router };
//   }
//
//   renderContent() {
//     const { trivias, dispatch, triviaId } = this.props;
//     const { question, options } = trivias[triviaId];
//     return (
//       <div className="u-sm-tc u-va-m u-align-center u-sm-tr">
//         <div className="ncss-row pb12-md pb12-lg" key={`trivia-${triviaId}`}>
//           <div className="ncss-brand h2 lh-h2">{question}</div>
//           <div className="ncss-row">
//             {
//               _.map(options, ({ title, image }, optionId) =>
//                 <div
//                   key={`trivia-option-${optionId}`}
//                   className="ncss-col-sm-6 u-align-center avatar pl1-sm choice"
//                   onClick={() =>
//                     dispatch(TriviasActions.selectTriviaOption(triviaId.toString(), optionId))}
//                 >
//                   <div
//                     className="choice ncss-brand h1 u-va-m z0"
//                     style={{ backgroundImage: `url('${image}')` }}
//                   />
//                   <div className="ncss-brand h3 text-color-dark-grey">
//                     {title}
//                   </div>
//                 </div>
//               )
//             }
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   render() {
//     const { trivias } = this.props;
//     return (
//       <UIScene
//         name="snkrvote"
//         content={() => (Object.keys(trivias).length > 0 ? this.renderContent() : null)}
//       />
//     );
//   }
//
// }
//
// export default SnkrVoteScene;
