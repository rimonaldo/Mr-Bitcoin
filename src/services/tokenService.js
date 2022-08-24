// const SHA2556 = require('crypto-js/sha256')

// class Block {
//     constructor(index, timestamp, data, previousHash = ''){
//         this.index = index
//         this.timestamp = timestamp
//         this.data = data
//         this.previousHash = previousHash
//         this.hash = this.calculateHash()
//     }

//     calculateHash(){
//         return SHA2556(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
//     }

// }

// class Blockchain {
//     constructor(){
//         this.chain = [this.createGenesisBlock()]
//     }

//     createGenesisBlock(){
//         return new Block(0, Date.now(), 'Genesis block','0'  )
//     }

//     getLatestBlock(){
//         return this.chain[this.chain.length - 1]
//     }

//     addBlock(newBlock){
//         newBlock.previousHash = this.getLatestBlock().hash
//         newBlock.hash = newBlock.calculateHash()
//         this.chain.push(newBlock)
//     }
// }

// let popCoin = new Blockchain()

// popCoin.addBlock(new Block(1, Date.now(), {from:'rimon', to:'lolo', amount:4}))
// popCoin.addBlock(new Block(2, Date.now(), {from:'rimon', to:'lolo', amount:4}))
// popCoin.addBlock(new Block(3, Date.now(), {from:'rimon', to:'lolo', amount:4}))

// console.log(popCoin);
