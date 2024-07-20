import React from 'react';

const MembershipProduct = ({ product }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="title">Título del Producto</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={product.title}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Cantidad</label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          name="quantity"
          value={product.quantity}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="unit_price">Precio Unitario</label>
        <input
          type="number"
          className="form-control"
          id="unit_price"
          name="unit_price"
          value={product.unit_price}
          readOnly
        />
      </div>
    </div>
  );
};

export default MembershipProduct;