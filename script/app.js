import { BinanceSocket } from "./Utils/BinanceSocket.js";

const socket = new BinanceSocket("btc");

socket.changeTicker("eth");
