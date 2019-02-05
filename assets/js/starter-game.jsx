import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: this.initTiles(),
      gameStatus: false,
      tempValue: null,
      tempID: null
    }
    this.initTiles = this.check_match.bind(this);
    this.check_match = this.check_match.bind(this);
    // console.log(this.state);

  }

  initTiles(){
    let data = [];
    for(let i = 'A'.charCodeAt(); i <='H'.charCodeAt(); i++){
      let t1 = {
        isHidden: true,
        hasMatched: false,
        value: String.fromCharCode(i),
      }

      let t2 = {
        isHidden: true,
        hasMatched: false,
        value: String.fromCharCode(i),
      }
      data.push(t1);
      data.push(t2);
    }
    data =_.shuffle(data);
    return data;
  }

  renderTile(i){
    return(
      <Tile
      id={i}
      value={this.state.gameBoard[i].value}
      isHidden={this.state.gameBoard[i].isHidden}
      hasMatched={this.state.gameBoard[i].hasMatched}
      ClickOnTile={this.check_match.bind(this)}
      />
    );
  }

  render() {
    return(
      <div>
        <div className="row">Memory Game</div>
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

  check_match(id){
    let v = this.state.gameBoard[id].value;
    let t = this.state.gameBoard;
    console.log(this.state.gameBoard[id]);
    t[id].isHidden = false;
    this.setState({gameBoard: t});
    console.log(this.state.gameBoard[id]);

    if(this.state.tempValue != null){
      if(this.state.tempValue == v){
        t[id].isHidden = false;
        t[id].hasMatched = true;
        this.setState({gameBoard: t, tempValue: null});
      }
      else {
        // console.log("here");
        t[id].isHidden = false;
        setTimeout(()=> {
          t[id].isHidden = true;
          t[this.state.tempID].isHidden = true;
          this.setState({gameBoard: t, tempValue:null, tempID:null});
        }, 1000);
      }
    }
    else{
      this.setState({gameBoard:t, tempValue: v, tempID: id});
     }
  }
}


class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(){
    if(this.props.isHidden){
      this.props.ClickOnTile(this.props.id);
    }

  }

  render (){
    if(this.props.isHidden){
      return (<button className="tile" onClick={this.handleClick.bind(this)}>
      </button>);
    }
    else if (this.props.hasMatched) {
      return (<button className="tile">
      {this.props.value}
      </button>);
    }
    else {
        return(<button className="tile">
        {this.props.value
        }</button>);
    }
  }
}
