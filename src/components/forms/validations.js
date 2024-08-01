import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
    userName: yup
        .string()
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
        .required('Debes aceptar todas las declaraciones de los Términos de servicio')
        .oneOf([true], 'Debes aceptar todas las declaraciones de los Términos de servicio'),
});

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: yup
        .string()
        .required('La contraseña es requerida'),
});

export const updateProjectValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: yup
        .string()
        .required('La contraseña es requerida'),
});

export const updateUserValidationSchema = yup.object().shape({
    userName: yup
        .string()
        .min(2, 'El nombre es muy corto')
        .max(50, 'El nombre es muy largo'),
    currentPassword: yup
        .string(),
    newPassword: yup
        .string()
        .min(6, 'La contraseña debe ser de al menos 6 caracteres')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Las contraseñas deben coincidir'),
    bio: yup
        .string()
        .max(50, 'La biografía es muy larga'),
    image: yup.string().nullable(),
    aboutMe: yup
        .string()
        .max(500, 'Puede tener hasta 500 caracteres'),
    links: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string(),
                url: yup
                    .string()
                    .url('Debe ser una URL válida')
            })
        ),
});
