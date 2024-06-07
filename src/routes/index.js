import express from 'express';
import statusPaidAction from '../composer/bot/tariff/action/statusPaidAction.js';
const router = express.Router();

router.get('/', (req, res) => res.status(200).send('The bot is working...'));

router.post('/webhooks', async (req, res) => statusPaidAction(req.body, res));

export default router