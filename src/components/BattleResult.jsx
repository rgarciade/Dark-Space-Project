import React, { Component, PropTypes } from 'react';
import ResultShipItem from './ResultShipItem';
import { Link } from 'react-router';

export default class BattleResult extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {points, auth} = this.props;
    let point = Math.floor(this.calculatePercentage());
    let i = 0;
    let id = 0;
    while (i < points.length){
     (auth.id === points[i].id) ? id = i : null;
      i++;
    }
    this.handleBackButtonClick(point, id);
  }

  handleBackButtonClick(newPoints, iduser){
    const idCampaign = this.props.params.idCampaign;
    const {onBattleResult} = this.props;
    let i = 0;
    let id = 0;
    onBattleResult(idCampaign, newPoints, iduser);
  }

  calculatePoints(){
    const {enemyPlayerFleetAfterFight} = this.props;
    let result = 0;
    for (let i = 0; i < enemyPlayerFleetAfterFight.length; i++){
      if (enemyPlayerFleetAfterFight[i].hull <= 0) {
        result = result + enemyPlayerFleetAfterFight[i].points;
      }
    }
    return result;
  }

  totalpoints(){
        const {enemyPlayerFleetAfterFight} = this.props;
    let result = 0;
    for (let i = 0; i < enemyPlayerFleetAfterFight.length; i++){
        result = result + enemyPlayerFleetAfterFight[i].points;
    }
    return result;
  }

  calculatePercentage(){
    return  this.calculatePoints() * 500 / this.totalpoints();
  }

  render() {
    const { playerFleetAfterFight, enemyPlayerFleetAfterFight } = this.props;
    const point = Math.floor(this.calculatePercentage());

    return (
              <div className="col-xs-12">
                <div className="result">
                  <h1 className="col-xs-12">{(this.calculatePercentage() <= 50) ? "Defeat" : "Victory" }</h1>
                  <h3 className="col-xs-12">{point} points of 500 points</h3>
                </div>
                <div className="col-xs-12">
                  <h3>Player Fleet:</h3>
                  {
                    playerFleetAfterFight.map( (ship, index) => <ResultShipItem key={index} resultShipProp={ship}/>)
                  }
                </div>
                <div className="col-xs-12">
                  <h3>Enemy Fleet:</h3>
                  {
                     enemyPlayerFleetAfterFight.map( (ship, index) => <ResultShipItem key={index} resultShipProp={ship}/>)
                  }
                </div>
                <div className="col-xs-4">
                  <Link to="/campaign" style={{color: 'inherit', textDecoration: 'inherit'}}><p className="btn btn-primary btn-md" role="button">Back</p></Link>
                </div>
              </div>
    );
  }
}

BattleResult.propTypes = {
  playerFleetAfterFight: PropTypes.array.isRequired,
  enemyPlayerFleetAfterFight: PropTypes.array.isRequired,
  onBattleResult: PropTypes.func.isRequired,
  points: PropTypes.array.isRequired
};
