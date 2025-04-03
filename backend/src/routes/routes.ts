import { Express } from 'express';
import express from 'express'
import cliente from './cliente.ts'
import produto from './produto.ts'
import pedido from './pedido.ts'
import entrega from './entrega.ts'
import transportadora from './transportadora.ts'
import auth from '../routes/auth.ts'

export default function (app: Express) 
{
    app
    .use(express.json())
    .use('/customers', cliente)
    .use('/carriers', transportadora)
    .use('/products', produto)
    .use('/orders', pedido)
    .use('/deliveries', entrega)
    .use(auth)
}