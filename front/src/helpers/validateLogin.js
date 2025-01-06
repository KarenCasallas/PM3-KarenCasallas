const validateLogin = (formData) => {
    const errors = {};

    if (!formData.userName){
        errors.userName = "El campo username es requerido";
    }

    if (!formData.password){
        errors.password = "El password es requerido";
    } else if (formData.password.length < 8){
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
};

export default validateLogin;