import * as yup from 'yup'

export const signupValidationSchema = yup.object().shape({
    userName: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, 'El nombre debe contener solo letras')
        .min(2, 'El nombre es muy corto')
        .max(50, 'El nombre es muy largo')
        .required('El nombre es requerido'),
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: yup
        .string()
        .min(6, 'La contraseña debe contener al menos 6 caracteres')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
        .required('La contraseña es requerida'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirma tu contraseña'),
    terms: yup
        .boolean()
        .required(
            'Debes aceptar todas las declaraciones de los Términos de servicio'
        )
        .oneOf(
            [true],
            'Debes aceptar todas las declaraciones de los Términos de servicio'
        ),
})

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: yup
        .string()
        .required('La contraseña es requerida'),

})

export const updateProjectValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: yup
        .string()
        .required('La contraseña es requerida'),

})