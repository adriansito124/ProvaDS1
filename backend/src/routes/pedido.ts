import express, { Request, Response, Router } from 'express';
import Pedido from '../models/Pedido.ts';

const router: Router = express.Router();
const people: object[] = [];


router.post('/', async (req: Request, res: Response) => {
    const { clienteID, produtos, status } = req.body;

    try {
        const pedido = new Pedido({ clienteID, produtos, status });
        await pedido.save();
        res.status(201).json(pedido);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao cadastrar pedido', error });
    }
});


router.get('/', async (req: Request, res: Response) => {
    try {
        const pedidos = await Pedido.find({status: "pendente"});
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pedidos', error });
    }
});


router.put('/:id/cancel', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const pedido = await Pedido.findByIdAndUpdate(id, { status }, { new: true });
        if (!pedido) {
            res.status(404).json({ message: 'Pedido não encontrada' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar pedido', error });
    }
});

export default router;