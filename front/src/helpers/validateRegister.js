const validateRegister = (formData) => {
    const errors = {};

    if (!formData.userName){
        errors.userName = "El campo username es requerido";
    }

    if (!formData.password){
        errors.password = "El password es requerido";
    } else if (formData.password.length < 8){
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!formData.confirmPassword){
        errors.confirmPassword = "La confirmacion del password es requerido";
    } else if (formData.password != formData.confirmPassword){
        errors.confirmPassword = "La contraseña no coincide"
    }

    if (!formData.email) {
        errors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Porfavor ingresa un email válido"
    }

    if (!formData.nDni){
        errors.nDni = "El numero dni es requerido"
    }

    if (!formData.birthdate) {
        errors.birthdate = "La fecha de nacimiento es requerida";
    } else{
        const currentYear = new Date().getFullYear();
        const minAge = 18;
        const minBirthYear = currentYear - minAge;
        const birthYear = new Date(formData.birthdate).getFullYear();
        if (birthYear > minBirthYear) {
            errors.birthdate = "Debes tener al menos 18 años para agendar un turno";
        }
    }

    if (!formData.name){
        errors.name = "El nombre es requerido"
    }

    return errors;
};

export default validateRegister;