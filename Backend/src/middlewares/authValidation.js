import { check, validationResult } from 'express-validator'

export const authValidation =[
    check("email")
        .isEmail()
            .withMessage('El campo "email" no es correcto')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),
    
    check("password")
        .isLength({ min: 7 })
            .withMessage('El campo "password" debe tener al menos 7 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*).*$/)
            .withMessage('El campo "password" debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),
    
    check("username")
        .isLength({ min: 3, max: 12 })
            .withMessage('El campo "username" debe tener entre 3 y 12 caracteres')
        .isAlphanumeric()
            .withMessage('El campo "username" debe contener solo letras y números')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),


    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ 
                message: "Ocurrio errores de autenticacion, son los siguientes:", 
                errors: errors.array()
            });
        }
    }
]
