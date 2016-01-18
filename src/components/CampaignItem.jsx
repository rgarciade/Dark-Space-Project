import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class CampaignItem extends Component {

  constructor(props) {
    super(props);

  }

  handleRemoveButtonClick(e) {
    e.stopPropagation();
    const { onRemoveCampaign, campaign, onRemoveMissionForPoints} = this.props;
    onRemoveCampaign(campaign.id);
    onRemoveMissionForPoints(campaign.id);
  }

  calculatePercentage(points){
      return points * 100 / 500;
  }

  render() {

    const { campaign, points} = this.props;

    return (
        <div className="col-xs-12 showlist">
          <li className="list-group-item action-element  col-xs-12">
            <Link to={`/select/${campaign.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}><span className="col-xs-4">Mission {campaign.id}:  {campaign.title}</span></Link>
            <span className="text-danger col-xs-3"><Link to={`/select/${campaign.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>Attack <span className="glyphicon glyphicon-screenshot"></span></Link></span>
            <span className="col-xs-3">Status:  {( this.calculatePercentage(points) >= 50) ? <span className='glyphicon glyphicon-ok text-success'></span> : <span className='glyphicon glyphicon-remove text-danger'></span>}</span>
            <div className="col-xs-1"><Link to={`/selectEnemy/${campaign.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}><span className={'glyphicon glyphicon-cog action-icon'}/></Link></div>
            <div className="col-xs-1"><span  onClick={(e) => this.handleRemoveButtonClick(e)} className={'glyphicon glyphicon-trash action-icon'}/></div>
            <div className="setPadding col-xs-12">
              <div className="progress">
                {(this.calculatePercentage(points) >= 50) ? <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style={{width: this.calculatePercentage(points) + "%"}}><span className="spanProgress">{this.calculatePercentage(points) + "%"}</span></div>
                : <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" style={{width:this.calculatePercentage(points) + "%"}}><span className="spanProgress">{this.calculatePercentage(points) + "%"}</span></div>}
              </div>
            </div>
            <div className="pointsPerMission col-xs-12">
            <p className="col-xs-12 col-md-1">Enemy Fleet:</p>
            {
                campaign.playerFleet.map( (ship, index) => <div key={index} className="col-xs-7 col-md-1"><img src={ship.img}/></div> )
              }
             </div>
          </li>
        </div>
    );
  }
}

/*
CampaignItem.propTypes = {
  campaign: PropTypes.object.isRequired,
  points: PropTypes.number.isRequired,
  onRemoveCampaign: PropTypes.func.isRequired,
  onRemoveMissionForPoints: PropTypes.func.isRequired
};
*/
