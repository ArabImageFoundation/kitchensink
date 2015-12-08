import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import RightNav from './RightNav'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
};

const standardActions = [
  {
    text: 'Okay',
  },
];

const Main = React.createClass({

	getInitialState() {
      return {
        open:false
      };
    },

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  _handleTouchTap() {
    this.setState({
      open: true,
    });
  },

  render() {
    return (
      <div style={containerStyle}>
	    <RightNav ref="RightNav">abcfdde</RightNav>
        <Dialog
          open={this.state.open}
          title="Super Secret Password"
          actions={standardActions}
          onRequestClose={this._handleRequestClose}
        >
          1-2-3-4-5
        </Dialog>
        <h1>material-ui</h1>
        <h2>example project</h2>
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
		<RaisedButton label="Super Secret Password" primary={true} onTouchTap={()=>this.refs.RightNav.toggle(1)} />
      </div>
    );
  },
});

export default Main;
