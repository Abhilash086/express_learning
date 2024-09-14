// export const createUserValidationSchema = [body('uName')
//     .notEmpty()
//     .withMessage("Cannot be empty")
//     .isLength({min: 5, max: 32})
//     .withMessage("Name should be between 5 and 32 characters"),
//     body('gpa').notEmpty()];

export const createUserValidationSchema = {
    uName: {
        isLength: {
            options:{
                min: 5,
                max: 32
            },
            errorMessage: "Name should be between 5 and 32 characters",
        },
        notEmpty: {
            errorMessage: "Cannot be empty"
        }
    },
    gpa: {
        notEmpty: true
    }
}

export const createQuerySchema = {
    filter: {
        isString: true,
        notEmpty:{
            errorMessage: "Filter Cannot be Empty"
        }
    },
    value: {
        isString: true,
        notEmpty:{
            errorMessage: "Value cannot be Empty"
        }
    }
}