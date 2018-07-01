import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    prevHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(index + prevHash + data + timestamp).toString();

  constructor(index: number, hash: string, prevHash: string, data: string, timestamp: number) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genBlock = new Block(0, "0202022020020", "", "Hello", 123456);

let blockchain: Block[] = [genBlock];

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlock();
  const newIndex: number = prevBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(newIndex, prevBlock.hash, data, newTimeStamp);

  const newBlock: Block = new Block(newIndex, newHash, prevBlock.hash, data, newTimeStamp);
  return newBlock;
};

console.log(createNewBlock("hello"), createNewBlock("bye bye"));

export {};
