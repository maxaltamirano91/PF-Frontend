import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, createPreference } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import PaymentButton from '../../components/payment-button/PaymentButton';

const SubscriptionPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedUser, token } = useSelector((state) => state.auth);
    const { preferenceId } = useSelector((state) => state.subscription); // Asegúrate de que sea de 'subscription'

    const product = {
        title: 'Premium',
        quantity: 1,
        unit_price: 2000,
        // discount: 40, // Eliminado descuento
        id: loggedUser?.id,
    };

    useEffect(() => {
        dispatch(getUserProfile(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (loggedUser) {
            dispatch(createPreference(product));
        }
    }, [dispatch, loggedUser]);

    const subtotal = product?.unit_price;
    // const discountAmount = (product?.unit_price * product?.discount) / 100; // Eliminado descuento
    // const total = subtotal - discountAmount; // Eliminado descuento
    const total = subtotal; // Solo subtotal

    const amounts = [
        { label: 'Subtotal', value: subtotal },
        // { label: `Descuento (${product?.discount}%)`, value: -discountAmount }, // Eliminado descuento
    ];

    return (
        <div className="w-100 h-100 m-0 row">
            <div className="p-5 col-8 d-flex align-items-center"></div>
            <div className="p-5 border col-4 d-flex align-items-center">
                <div className="w-100 p-5">
                    <h3 className="mb-5">Orden de compra</h3>
                    <div className="text-secondary">
                        {amounts.map((amount, index) => (
                            <div key={index} className="py-3 d-flex justify-content-between">
                                <span>{amount.label}</span>
                                <span>$ {amount.value}</span>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4" />
                    <div className="mb-5 fs-3 d-flex justify-content-between">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <div>
                        {preferenceId ? (
                            <PaymentButton preferenceId={preferenceId} />
                        ) : (
                            <p>Cargando opciones de pago...</p>
                        )}
                        <p className='my-3 text-center text-secondary'>o</p>
                        <div>
                            <button></button>
                            <button></button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
