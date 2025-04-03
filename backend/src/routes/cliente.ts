import express, { Request, Response, Router } from 'express';
import Cliente from '../models/Cliente.ts';
import Pedido from '../models/Pedido.ts';

const router: Router = express.Router();
const people: object[] = [];

router.post('/', async (req: Request, res: Response) => {
    const { name, email, telefone, endereco } = req.body;

    try {
        const cliente = new Cliente({ name, email, telefone, endereco });
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao cadastrar cliente', error });
    }
});


router.get('/', async (req: Request, res: Response) => {
    try {
        const people = await Cliente.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pessoas', error });
    }
});


router.get('/:id/orders', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const person = await Cliente.findById(id);
        if (!person) {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
        const orders = await Pedido.find({ clienteID: id })
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao encontrar cliente', error });
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const person = await Cliente.findById(id);
        if (!person) {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
        const orders = await Pedido.find({ clienteID: id })
        if (orders.length > 0) {
            res.status(404).json({ message: 'Cliente não pode ser removido, ele ainda tem pedidos abertos' });
        }
        else {
            const person2 = await Cliente.findByIdAndDelete(id);
            if (!person2) {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.status(200).json({ message: 'Cliente deletado com sucesso' });
        }
        
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar cliente', error });
    }
});


export default router;