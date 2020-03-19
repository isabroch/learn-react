import React from "react";
import "rc-input-number/assets/index.css";
import InputNumber from "rc-input-number";
import "./Product.scss";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasingQuantity: 1,
      availableStock: this.props.existingStock
    };
  }

  updatePurchasingQuantity = value => {
    this.setState({ purchasingQuantity: value });
  };

  callUpdateCart = () => {
    this.props.updateCart(this.props.productId, this.state.purchasingQuantity);
    this.setState({purchasingQuantity: 1});

    this.setState((state, props) => ({availableStock: props.existingStock - props.reservedStock}))
  };

  render() {
    const isOutOfStock = this.state.availableStock === 0;

    return (
      <article
        className={`product-card ${
          isOutOfStock ? "product-card--no-stock" : ""
        }`.trim()}
      >
        <img
          src={`https://picsum.photos/seed/${this.props.productId}/300/200`}
          width="300"
          height="200"
          alt=""
          className="product-card__image"
        />
        <div className="product-card__details">
          <h3 className="product-card__title">
            <span className="product-card__name">{this.props.productName}</span>
            {isOutOfStock && (
              <span className="product-card__stock-status">
                &nbsp;- out of stock
              </span>
            )}
          </h3>
          <strong className="product-card__price">
            {this.props.productPrice} kr
          </strong>
          <div className="product-card__actions">
            <InputNumber
              precision={0}
              min={1}
              max={this.state.availableStock}
              className="product-card__quantity"
              value={this.state.purchasingQuantity}
              onChange={this.updatePurchasingQuantity}
              tabIndex={isOutOfStock ? -1 : 0}
            />
            <button
              className="product-card__button"
              onClick={this.callUpdateCart}
            >
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </article>
    );
  }
}

export default Product;
