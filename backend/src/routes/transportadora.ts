import express, { Request, Response, Router } from 'express';
import Transportadora from '../models/Transportadora.ts';
import Entrega from '../models/Entrega.ts';

const router: Router = express.Router();
const people: object[] = [];


// router
//     .post('/usuarios', (req: Request, res: Response) => {
//         const { nome, sobrenome } = req.body
//         res.status(200).send(`${people.push(req.body)}`);
//     })

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

// router
//     .get('/usuarios', (req: Request, res: Response) => {
//         res.status(200).send(`${people}`);
//     })

// router.get('/people', async (req: Request, res: Response) => {
//     try {
//         const people = await Person.find();
//         res.status(200).json(people);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao buscar pessoas', error });
//     }
// });

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

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const person = await Cliente.findByIdAndDelete(id);
//         if (!person) {
//             res.status(404).json({ message: 'Cliente não encontrado' });
//         }
//         res.status(200).json({ message: 'Cliente deletado com sucesso' });
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao deletar cliente', error });
//     }
// });

//     .delete('/deletar/:id', (req: Request, res: Response) => {
//         const { id } = req.params;
//         res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
//     })

export default router;