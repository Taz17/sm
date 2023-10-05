import { Router, Request, Response } from 'express'
import { tickets } from '../../db'

export const ticketRouter = Router()

ticketRouter.get('/tickets', (req: Request, res: Response) => {
  res.json(tickets)
})

ticketRouter.get('/ticket/:id', (req: Request, res: Response) => {
  const ticket = tickets.find((t) => t.id === req.params.id)
  if (ticket) {
    res.json(ticket)
  } else {
    res.status(404).send('Item not found')
  }
})

ticketRouter.post('/ticket', (req: Request, res: Response) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).send('Entries must have a title and description')
    return
  }

  const ticketNumber = tickets.length + 1

  const newTicket = {
    id: `ticket-${ticketNumber}`,
    title: req.body.title,
    description: req.body.description,
  }

  tickets.push(newTicket)

  res.status(201).json(newTicket)
})