import express, { Request, Response, Router } from 'express';
import Transportadora from '../models/Transportadora.ts';
import Entrega from '../models/Entrega.ts';

const router: Router = express.Router();
const people: object[] = [];


router.post('/', async (req: Request, res: Response) => {
    const { name, cnpj, tipo_transporte: { terrestre, aereo, maritimo } } = req.body;

    try {
        let erro = 0
        const transport = await Transportadora.find();

        transport.forEach(element => {
            if (cnpj == element.cnpj) {
                erro = 1
            }
        });
        if (erro == 0) {
            const transportadora = new Transportadora({ name, cnpj, tipo_transporte: { terrestre, aereo, maritimo } });
            await transportadora.save();
            res.status(201).json(transportadora);
        }
        res.status(200).json({message: 'CNPJ ja utilizado'});
    } catch (error) {
        res.status(400).json({ message: 'Erro ao cadatrar transportadora', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const people = await Transportadora.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pessoas', error });
    }
});


router.get('/:id/deliveries', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const transport = await Transportadora.findById(id);
        if (!transport) {
            res.status(404).json({ message: 'Transportadora não encontrado' });
        }
        const deliveries = await Entrega.find({ transportadoraID: id })
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao encontrar transportadora', error });
    }
});


export default router;