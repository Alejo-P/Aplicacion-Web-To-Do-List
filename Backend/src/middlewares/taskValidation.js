import { check, validationResult } from "express-validator";

export const taskValidation = [
    check("title")
        .exists()
            .withMessage('El campo "title" es obligatorio')
        .notEmpty()
            .withMessage('El campo "title" no puede estar vacío')
        .isString()
            .withMessage('El campo "title" debe ser una cadena de texto')
        .isLength({ min: 5, max: 50 })
            .withMessage('El campo "title" debe tener entre 5 y 50 caracteres')
        .customSanitizer(value => typeof value === "string" ? value.trim() : value),
    
    check("description")
        .exists()
            .withMessage('El campo "description" es obligatorio')
        .notEmpty()
            .withMessage('El campo "description" no puede estar vacío')
        .isString()
            .withMessage('El campo "description" debe ser una cadena de texto')
        .isLength({ min: 10, max: 255 })
            .withMessage('El campo "description" debe tener entre 10 y 255 caracteres')
        .customSanitizer(value => typeof value === "string" ? value.trim() : value),
    
    check("priority")
        .exists()
            .withMessage('El campo "priority" es obligatorio')
        .notEmpty()
            .withMessage('El campo "priority" no puede estar vacío')
        .isString()
            .withMessage('El campo "priority" debe ser una cadena de texto')
        .isIn(["Baja", "Media", "Alta"])
            .withMessage('El campo "priority" solo puede ser "Baja", "Media" o "Alta"')
        .customSanitizer(value => typeof value === "string" ? value.trim() : value),

    check("date")
        .exists()
            .withMessage('El campo "date" es obligatorio')
        .notEmpty()
            .withMessage('El campo "date" no puede estar vacío')
        .isDate()
            .withMessage('El campo "date" debe ser una fecha')
        .customSanitizer(value => typeof value === "string" ? value.trim() : value),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ 
                message: "Ocurrieron errores al validar la tarea, son los siguientes:", 
                errors: errors.array() 
            });
        }
    }
];