import express, { Request, Response, Router } from 'express';
import Produto from '../models/Produto.ts';
import Pedido from '../models/Pedido.ts';

const router: Router = express.Router();
const people: object[] = [];


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

router.get('/', async (req: Request, res: Response) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar produtos', error });
    }
});

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


export default router;