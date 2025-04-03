import express, { Request, Response, Router } from 'express';
import Entrega from '../models/Entrega.ts';

const router: Router = express.Router();
const people: object[] = [];


router.post('/', async (req: Request, res: Response) => {
    const { pedidoID, transportadoraID, status } = req.body;

    try {
        const entrega = new Entrega({ pedidoID, transportadoraID, status });
        await entrega.save();
        res.status(201).json(entrega);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar entrega', error });
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const entrega = await Entrega.findById(id);
        if (!entrega) {
            res.status(404).json({ message: 'Entrega não encontrada' });
        }
        res.status(200).json(entrega);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao encontrar entrega', error });
    }
});

router.put('/:id/status', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const entrega = await Entrega.findByIdAndUpdate(id, { status }, { new: true });
        if (!entrega) {
            res.status(404).json({ message: 'Entrega não encontrada' });
        }
        res.status(200).json(entrega);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar entrega', error });
    }
});



export default router;