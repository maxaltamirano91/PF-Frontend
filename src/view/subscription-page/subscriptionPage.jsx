import React, { useState } from 'react';
import axios from 'axios';
import PaymentButton from '../../components/payment-button/PaymentButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubscriptionPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [formData, setFormData] = useState({
    title: 'Membresía Premium',
    quantity: 1,
    unit_price: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/payment', formData);
      setPreferenceId(response.data.preferenceId);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Compra Membresía Premium</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Título del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
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
                    value={formData.quantity}
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
                    value={formData.unit_price}
                    readOnly
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Pagar</button>
              </form>
              {preferenceId && (
                <div className="mt-3">
                  <PaymentButton preferenceId={preferenceId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
