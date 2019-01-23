import React from "react";
import Proptypes from "prop-types";
import { formatPrice } from "./../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: Proptypes.shape({
        image: Proptypes.string,
        name: Proptypes.string,
        desc: Proptypes.string,
        status: Proptypes.string,
        price: Proptypes.number,
    }),
    addToOrder: Proptypes.func.isRequired
  };
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const fish = this.props.details;
    const isAvailable = fish.status === "available";
    return (
      <li className="menu-fish">
        <img src={fish.image} alt={fish.name} />
        <h3 className="fish-name">
          {fish.name}
          <span className="price">{formatPrice(fish.price)}</span>
        </h3>
        <p>{fish.desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add to order" : "Sold out"}
        </button>
      </li>
    );
  }
}

export default Fish;
