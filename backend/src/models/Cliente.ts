import mongoose, { Schema, Document } from 'mongoose';

interface ICliente extends Document {
    name: string;
    email: string;
    telefone: string;
    endereco: string;
}

const clienteSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
});

const Cliente = mongoose.model<ICliente>('Cliente', clienteSchema);

export default Cliente;