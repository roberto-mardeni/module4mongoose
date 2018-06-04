const express      = require('express')
const app          = express()
const mongoose     = require('mongoose')
const morgan       = require('morgan')
const errorhandler = require('errorhandler')
const bodyparser   = require('body-parser')
mongoose.Promise   = global.Promise

mongoose.connect('mongodb://localhost:27017/edx-course-db')

app.use(morgan('tiny'))
app.use(errorhandler())
app.use(bodyparser.json())

const accountSchema = mongoose.Schema({
  name: String,
  balance: Number
})
let Account = mongoose.model('Account', accountSchema)

app.get('/accounts', (rweq, res)=> {
  Account.find({}, (err, accounts) => {
    if(err) res.send(err)
    res.send(accounts)
  })
})
app.post('/accounts', (req, res)=> {
  new Account({
      name : req.body.name,
      balance : req.body.balance
  }).save((err)=>{
      if(err) res.send(err)
      res.send("Account Saved")
  })
})
app.put('/accounts/:id', (req, res)=> {
  Account.findByIdAndUpdate({'_id':req.params.id}, {
      name : req.body.name,
      balance : req.body.balance
  }, (err, acc)=>{
      if(err) res.send(err)
      res.send("Account Updated")
  })
})
app.delete('/accounts/:id', (req, res)=> {
  Account.findByIdAndDelete({'_id':req.params.id}, (err, acc)=>{
      if(err) res.send(err)
      res.send("Account Deleted")
  })
})

app.listen(4000)