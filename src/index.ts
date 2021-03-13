import 'reflect-metadata';
import DiContainer from './diContainer';
import { Server } from './server';

const server = new Server().server;

server.listen(3000, () => {
    console.log('Server running');
})