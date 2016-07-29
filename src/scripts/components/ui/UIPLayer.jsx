import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

@connect((state) => ({
  player: state.ui.get('audioPlayer').toJS(),
}))
class UIPlayer extends Component {

  static displayName = 'UIPlayer';

  static propTypes = {
    player: PropTypes.object,
  };

  componentDidMount() {
    this.player = this.refs.player;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.player.src !== this.props.player.src;
  }

  componentDidUpdate() {
    const { player } = this.props;
    if (player.status === 1) {
      this.load(player.src);
      this.play();
    }
  }

  load(src) {
    this.player.src = src;
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.pause();
    this.player.removeAttribute('src');
  }

  render() {
    const { src } = this.props.player;
    return (
      <audio ref="player" preload="auto">
        <source src={src} type="audio/mpeg" />
      </audio>
    );
  }

}

export default UIPlayer;
