import React, { Component, PropTypes } from 'react';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addDisabledName: true,
      addDisabledImage: true
    };
  }

handleOnChangeName() {
    const node = this.refs.username;
    const username =  node.value.trim();
    this.setState({
      addDisabledName: username.length === 0
    });
  }

  handleOnChangeImage() {
    const node = this.refs.userimage;
    const userimage =  node.value.trim();
    this.setState({
      addDisabledImage: userimage.length === 0
    });
  }

  handleOnNameKeyDown(event) {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY && !this.state.addDisabled) {
      this.handleOnAddNameButtonClick();
    }
  }

   handleOnImageKeyDown(event) {
    const ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY && !this.state.addDisabled) {
      this.handleOnAddImageButtonClick();
    }
  }

  handleOnAddNameButtonClick(){
    const {auth, changeUserName} = this.props;
    const node = this.refs.username;
    const username =  node.value.trim();
    changeUserName(auth.id, username);
    node.value = '';
  }

  handleOnAddImageButtonClick(){
    const {auth, changeUserImage} = this.props;
    const node = this.refs.userimage;
    const userimage =  node.value.trim();
    changeUserImage(auth.id, userimage);
    node.value = '';
  }

  render() {
    const {auth, firebase, changeUserName, changeUserImage} = this.props;
    return (
      (auth.authenticated) ?
      <div className="row">
        <div className="titlePadding">
              <h2>Settings</h2>
        </div>
        <div  className="col-md-12">
        <div className="col-md-6">
        <label>Change username :</label>
          <div className="input-group">
                <input type="text" onChange={e => this.handleOnChangeName(e)} onKeyDown={e => this.handleOnNameKeyDown(e)} className="form-control" placeholder="New User Name" ref="username" />
                 <span className="input-group-btn">
                  <button disabled={this.state.addDisabledName} onClick={ () => this.handleOnAddNameButtonClick() } className="btn btn-info" type="button"><span className="glyphicon glyphicon-ok-sign" /></button>
                </span>
          </div>
        </div>
        <div className="col-md-6">
          <label>Change user image (URL) :</label>
          <div className="input-group">
                <input type="text" onChange={e => this.handleOnChangeImage(e)} onKeyDown={e => this.handleOnImageKeyDown(e)} className="form-control" placeholder="New User Image" ref="userimage" />
                 <span className="input-group-btn">
                  <button disabled={this.state.addDisabledImage} onClick={ () => this.handleOnAddImageButtonClick() } className="btn btn-info" type="button"><span className="glyphicon glyphicon-ok-sign" /></button>
                </span>
          </div>
          </div>
        </div>
      </div> :
      <div className="col-xs-12">
              <div className="titlePadding">
                  <h2>Error, please identify yourself</h2>
              </div>
            </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  changeUserName: PropTypes.func.isRequired,
  changeUserImage: PropTypes.func.isRequired
};
