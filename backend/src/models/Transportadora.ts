import mongoose, { Schema, Document } from 'mongoose';

interface ITransportadora extends Document {
    name: string;
    cnpj: string;
    tipo_transporte: {terrestre: boolean, aereo: boolean, maritimo: boolean};
}

const transportadoraSchema: Schema = new Schema({
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    tipo_transporte: {
        terrestre: { type: Boolean, required: true },
        aereo: { type: Boolean, required: true },
        maritimo: { type: Boolean, required: true },
    },
});

const Transportadora = mongoose.model<ITransportadora>('Transportadora', transportadoraSchema);

export default Transportadora;