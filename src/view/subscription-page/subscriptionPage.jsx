import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, createPreference } from '../../redux/actions/subscriptionActions';
import MembershipProduct from '../../components/membership-product/MembershipProduct';
import PaymentButton from '../../components/payment-button/PaymentButton';

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const { product, preferenceId, loading, error } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPreference(product));
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Compra Membresía Premium</h5>
              <form onSubmit={handleSubmit}>
                {product && <MembershipProduct product={product} />}
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Pagar
                </button>
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
