import express, { Request, Response, Router } from 'express';
import Pedido from '../models/Pedido.ts';

const router: Router = express.Router();
const people: object[] = [];


// router
//     .post('/usuarios', (req: Request, res: Response) => {
//         const { nome, sobrenome } = req.body
//         res.status(200).send(`${people.push(req.body)}`);
//     })

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


// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const pedidos = await Pedido.find();
//         res.status(200).json(pedidos);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao buscar pedidos', error });
//     }
// });

router.get('/', async (req: Request, res: Response) => {
    try {
        const pedidos = await Pedido.find({status: "pendente"});
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pedidos', error });
    }
});

// router.get('/people', async (req: Request, res: Response) => {
//     try {
//         const people = await Cliente.find();
//         res.status(200).json(people);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao buscar pessoas', error });
//     }
// });


// router.get('/:id/orders', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const person = await Cliente.findById(id);
//         if (!person) {
//             res.status(404).json({ message: 'Cliente não encontrado' });
//         }
//         res.status(200).json(person);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao encontrar cliente', error });
//     }
// });

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