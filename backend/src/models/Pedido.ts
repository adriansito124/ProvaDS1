import mongoose, { Schema, Document } from 'mongoose';
import Produto from './Produto.ts';

interface IPedido extends Document {
    clienteID: string;
    produtos: Array<string>;
    status: string;
}

const pedidoSchema: Schema = new Schema({
    clienteID: { type: String, required: true },
    produtos: { type: Array<String>, required: true },
    status: { type: String, required: true },
});

const Pedido = mongoose.model<IPedido>('Pedido', pedidoSchema);

export default Pedido;