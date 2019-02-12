import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import '../css/app.css'

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel={channel} />, root);
}

// export default
class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      gameBoard: [],
      tempValue: null,
      tempID: null,
      isChecking: false
    };
    // this.initTiles   = this.initTiles.bind(this);
    this.check_match = this.check_match.bind(this);
    this.got_view = this.got_view.bind(this);

      this.channel
          .join()
          .receive("ok", this.got_view)
          .receive("error", resp => { console.log("Unable to join", resp) });

  }

  got_view(view){
    console.log("new view", view.game);
    this.setState(view.game);

  }

  renderTile(i){
    if (this.state.gameBoard.length ==0){
      return;
    }
    else {
      return(
        <Tile
          id={i}
          value={ this.state.gameBoard[i].value }
          isHidden={this.state.gameBoard[i].isHidden}
          hasMatched={this.state.gameBoard[i].hasMatched}
          ClickOnTile={this.check_match}
        />
      );
    }
  }

  render() {
    return(
      <div>
        <div className="row">Memory Game</div>
        <button className="rbtn" onClick={this.restart.bind(this)}> Restart Game </button>
        <div className="row">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
          {this.renderTile(3)}
        </div>
        <div className="row">
          {this.renderTile(4)}
          {this.renderTile(5)}
          {this.renderTile(6)}
          {this.renderTile(7)}
        </div>
        <div className="row">
          {this.renderTile(8)}
          {this.renderTile(9)}
          {this.renderTile(10)}
          {this.renderTile(11)}
        </div>
        <div className="row">
          {this.renderTile(12)}
          {this.renderTile(13)}
          {this.renderTile(14)}
          {this.renderTile(15)}
        </div>
      </div>
    );
  }

  // render() {
  //   return (<React.Fragment />);
  // }
  check_match(id){
    // console.log("I am checking");
    if(this.state.isChecking){
      return;
    }
    else {
      let v = this.state.gameBoard[id].value;
      let t = this.state.gameBoard;
      t[id].isHidden = false;
      this.setState({gameBoard: t});
      // console.log(v);

      if(this.state.tempValue != null){
        this.setState({isChecking: true})
        if(this.state.tempValue == v){

          this.channel.push("matched", {curID: id})
              .receive("ok", this.got_view);
          // t[id].isHidden = false;
          // t[id].hasMatched = true;
          // this.setState({gameBoard: t, tempValue: null, isChecking: false});
          this.setState({isChecking: false});
        }
        else {
          t[id].isHidden = false;
          setTimeout(()=> {
            // console.log("-----------");
            this.channel.push("notMatched", {curID: id, tempID: this.state.tempID})
                .receive("ok", this.got_view);
            // t[id].isHidden = true;
            // t[this.state.tempID].isHidden = true;
            // this.setState({gameBoard: t, tempValue:null, tempID:null, isChecking: false});
            this.setState({isChecking: false})
          }, 1000);
        }
      }
      else{
        this.channel.push("flipFirst", {curID: id, curValue: v})
            .receive("ok", this.got_view);
        // this.setState({gameBoard:t, tempValue: v, tempID: id, isChecking: false});
        this.setState({isChecking: false})
       }
    }
  }

  restart(){
    this.channel.push("restart", {})
	      .receive("ok", this.got_view);
  }
}


class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    if(this.props.isHidden){
      this.props.ClickOnTile(this.props.id);
    }
  }

  render (){
    if(this.props.isHidden){
      return (<button className="tile" onClick={this.handleClick}>
      </button>);
    }
    else if (this.props.hasMatched) {
      return (<button className="matched_tile">
      {this.props.value}
      </button>);
    }
    else {
        return(
          <button className="tile">
            { this.props.value }
          </button>
        );
    }
  }
}
