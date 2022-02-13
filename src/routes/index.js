const express = require('express')
const router = express.Router()
const { getUsers, deleteUser } = require('../controllers/user')
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getTopings, getToping, addToping, updateToping, deleteToping } = require('../controllers/toping')
const { register, Login } = require('../controllers/auth')
const { auth } = require('../middlewars/auth')
const { uploadFile } = require('../middlewars/uploadFile')
const { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction, getTransactionUser } = require('../controllers/transaction')

router.post('/register', register)
router.post('/login', Login)

router.delete('/user/:id', deleteUser)
router.get('/users', getUsers)

router.get('/products', getProducts)
router.post('/product', auth, uploadFile("image"), addProduct)
router.patch('/product/:id', auth, updateProduct)
router.get('/product/:id', getProduct)
router.delete('/product/:id', deleteProduct)

router.get('/topings', getTopings)
router.get('/toping/:id', getToping)
router.post('/toping', auth, uploadFile("image"), addToping)
router.patch('/toping/:id', auth, updateToping)
router.delete('/toping/:id', deleteToping)

router.get('/transactions/:id', auth, getTransactions)
router.get('/transaction/:id', auth, getTransaction)
router.post('/transaction', auth, addTransaction)
router.patch('/transaction/:id', auth, updateTransaction)
router.delete('/transaction/:id', auth, deleteTransaction)
router.get('/my-transactions', auth, getTransactionUser)


module.exports = router