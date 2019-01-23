import React from "react";
import Proptypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "./../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: Proptypes.instanceOf(Object).isRequired,
    updateFish: Proptypes.func.isRequired,
    deleteFish: Proptypes.func.isRequired,
    addFish: Proptypes.func.isRequired,
    loadSamplesFishes: Proptypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  logout = async () => {
    console.log("login out");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log out!</button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    } else if (this.state.uid !== this.state.owner) {
      <div>
        <p>Sorry, you are not the owner</p>
        {logout}
      </div>;
    } else {
      return (
        <div className="Inventory">
          <h2>Inventory</h2>
          {logout}
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSamplesFishes}>
            Load Sample Fishes
          </button>
        </div>
      );
    }
  }
}

export default Inventory;
