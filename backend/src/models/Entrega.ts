import mongoose, { Schema, Document } from 'mongoose';

interface IEntrega extends Document {
    pedidoID: string;
    transportadoraID: string;
    status: string;
}

const entragaSchema: Schema = new Schema({
    clienteID: { type: String, required: true },
    transportadoraID: { type: String, required: true },
    status: { type: String, required: true },
});

const Entrega = mongoose.model<IEntrega>('Entrega', entragaSchema);

export default Entrega;