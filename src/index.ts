import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    prevHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(index + prevHash + data + timestamp).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.prevHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

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

  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(aBlock.index, aBlock.prevHash, aBlock.data, aBlock.timestamp);

const isBlockValid = (candBlock: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(candBlock)) {
    return false;
  } else if (prevBlock.index + 1 !== candBlock.index) {
    return false;
  } else if (prevBlock.hash !== candBlock.prevHash) {
    return false;
  } else if (getHashForBlock(candBlock) !== candBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candBlock: Block): void => {
  if (isBlockValid(candBlock, getLatestBlock())) {
    blockchain.push(candBlock);
  }
};

createNewBlock("2nd block");
createNewBlock("3rd block");
createNewBlock("4th block");

console.log(blockchain);

export {};
