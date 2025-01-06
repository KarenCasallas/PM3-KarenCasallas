const validateAppointmentForm = (formData) => {
    const errors = {};

    if (!formData.date){
        errors.date = "la Fecha es requerida";
    } else {
        
        const today = new Date();
        const todayString = today.toISOString().split("T")[0]; 

        if (formData.date < todayString) {
            errors.date = "No puedes agendar una cita para un día anterior al actual";
        }

        const selectedDate = new Date(formData.date);
        const dayOfWeek = selectedDate.getDay();
        
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            errors.date = "No se agendan citas los fines de semana.";
        }
        
    };
        

    if (!formData.time){
        errors.time = "La hora es requerida";
    } else {

        const [hours, minutes] = formData.time.split(":").map(Number);

        if (![0, 15, 30, 45].includes(minutes)) {
            errors.time = "Solo se permiten intervalos de 15 minutos (00, 15, 30, 45).";
        }
    }

    return errors;
};

export default validateAppointmentForm;