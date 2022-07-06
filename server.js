const { conn, User, Thing } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/things', async(req, res, next)=> {
  try {
    res.status(201).send(await Thing.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/things/rankDown', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.body.thingId);
    await thing.increment({ rank: 1 }); // higher rank number is a lower rank
    res.status(200).send(thing);
  }
  catch(ex){
    console.error(ex);
    next(ex);
  }
});

app.put('/api/things/rankUp', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.body.thingId);
    await thing.decrement({ rank: 1 }); // lower rank number is a higher rank
    res.status(200).send(thing);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/things/user', async(req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.body.thingId);
    const oldOwnerId = thing.userId;
    const newOwner = await User.findByPk(req.body.newOwnerId);
    await thing.setUser(newOwner);
    res.send({
      thingId: thing.id,
      oldOwnerId: oldOwnerId,
      newOwnerId: thing.userId,
    });
  }
  catch(ex) {
    next(ex)
  }
})

app.delete('/api/things/:id', async(req, res, next)=> {
  try {
    await Thing.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/users', async(req, res, next)=> {
  try {
    res.status(201).send(await User.create(req.body));
  }
  catch(ex) {
    next(ex);
  }
})

app.delete('/api/users/:id', async(req, res, next)=> {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const init = async()=> {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy, ethyl] = await Promise.all(
      ['moe', 'larry', 'lucy', 'ethyl'].map( name => User.create({ name }))
    );
    // initially, rank is arbitrarily based on order created
    const [foo, bar, bazz, quq, fizz] = await Promise.all(
      ['foo', 'bar', 'bazz', 'quq', 'fizz'].map((name, index) => Thing.create({ name, rank: ++index }))
    );

    await moe.addThings([foo, bar]);
    await larry.addThing(bazz);
    await lucy.addThing(quq);
    await ethyl.addThing(fizz);
  }
  catch(ex){
    console.log(ex);
  }
};

init();
