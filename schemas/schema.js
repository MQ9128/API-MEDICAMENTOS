const Joi = require('joi');

const medicamentoSchema = Joi.object({
    fecha_de_corte: Joi.date().required(),
    numero_cum: Joi.string().required(),
    nombre_del_medicamento: Joi.string().required(),
    forma_farmaceutica: Joi.string().required(),
    descripcion_medicamento: Joi.string().required(),
    valor_minimo: Joi.number().positive().required(),
    valor_maximo: Joi.number().positive().required()
});

module.exports = { medicamentoSchema };