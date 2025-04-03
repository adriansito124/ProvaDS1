import express, { Request, Response, Router } from 'express';
import Entrega from '../models/Entrega.ts';

const router: Router = express.Router();
const people: object[] = [];


// router
//     .post('/usuarios', (req: Request, res: Response) => {
//         const { nome, sobrenome } = req.body
//         res.status(200).send(`${people.push(req.body)}`);
//     })

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

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const produto = await Produto.findByIdAndDelete(id);
//         if (!produto) {
//             res.status(404).json({ message: 'Produto não encontrado' });
//         }
//         res.status(200).json({ message: 'Produto deletado com sucesso' });
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao deletar produto', error });
//     }
// });

//     .delete('/deletar/:id', (req: Request, res: Response) => {
//         const { id } = req.params;
//         res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
//     })

export default router;