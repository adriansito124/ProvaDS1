import mongoose, { Schema, Document } from 'mongoose';

interface IProduto extends Document {
    name: string;
    preco: number;
    estoque: string;
}

const produtoSchema: Schema = new Schema({
    name: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: String, required: true },
});

const Produto = mongoose.model<IProduto>('Produto', produtoSchema);

export default Produto;