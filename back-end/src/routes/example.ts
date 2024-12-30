import { Router } from 'express';

const router = Router();

// Return the members of mom jeans as an array
const exampleData = [
  'Eric Butler',
  'Austin Carango',
  'Bart Thompson',
  'Sam Kless'
];

router.get('/', (req, res) => {
  res.send(exampleData.toString());
});

export default router;
