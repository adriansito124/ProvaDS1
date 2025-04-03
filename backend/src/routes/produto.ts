import express, { Request, Response, Router } from 'express';
import Produto from '../models/Produto.ts';
import Pedido from '../models/Pedido.ts';

const router: Router = express.Router();
const people: object[] = [];


// router
//     .post('/usuarios', (req: Request, res: Response) => {
//         const { nome, sobrenome } = req.body
//         res.status(200).send(`${people.push(req.body)}`);
//     })

router.post('/', async (req: Request, res: Response) => {
    const { name, preco, estoque } = req.body;

    try {
        const produto = new Produto({ name, preco, estoque });
        await produto.save();
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao cadatrar produto', error });
    }
});

// router
//     .get('/usuarios', (req: Request, res: Response) => {
//         res.status(200).send(`${people}`);
//     })

router.get('/', async (req: Request, res: Response) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar produtos', error });
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

// router.put('/person/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { name, age } = req.body;

//     try {
//         const person = await Cliente.findByIdAndUpdate(id, { name, age }, { new: true });
//         if (!person) {
//             res.status(404).json({ message: 'Pessoa não encontrada' });
//         }
//         res.status(200).json(person);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
//     }
// });

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
        const orders = await Pedido.find({ produtos: produto?.name})
        if (orders.length > 0) {
            res.status(404).json({ message: 'Produto não pode ser removido, ele ainda tem pedidos abertos' });
        }
        else
        {
            const produto2 = await Produto.findByIdAndDelete(id);
            if (!produto2) {
                res.status(404).json({message: 'produto não encontrado'})
            }
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar produto', error });
    }
});

//     .delete('/deletar/:id', (req: Request, res: Response) => {
//         const { id } = req.params;
//         res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
//     })

export default router;