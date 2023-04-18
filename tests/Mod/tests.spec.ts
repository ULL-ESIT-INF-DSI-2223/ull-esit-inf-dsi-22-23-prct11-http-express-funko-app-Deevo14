import 'mocha';
import {expect} from 'chai';
import net from "net";

describe('Server', function() {
    it('should return the output of a command', function(done) {
      const client = net.connect({ port: 60500 }, () => {
        const command = 'echo';
        const args:string = 'hola';
        const data = JSON.stringify({ command, args });
  
        client.write(data);
      });
  
      client.on('data', (data) => {
        const response = JSON.parse(data.toString());
  
        expect(response.result).to.equal('hola\n');
  
        client.end();
        done();
      });
  
      client.on('end', () => {
        console.log('Disconnected from server');
      });
    });
    it('shloud return an error message for an invalid command', function(done) {
      const client = net.connect({ port: 60500 }, () => {
        const command = 'ls';
        const args:string = '-abcde';
        const data = JSON.stringify({ command, args });
  
        client.write(data);
      });
  
      client.on('data', (data) => {
        const response = JSON.parse(data.toString());
  
        expect(response.error).to.eql("Command failed: ls -abcde\nls: opción incorrecta -- «e»\nPruebe 'ls --help' para más información.\n");
  
        client.end();
        done();
      });
  
      client.on('end', () => {
        console.log('Disconnected from server');
      });
    });
    it('should return an error message for an unexisting command', function(done) {
      const client = net.connect({ port: 60500 }, () => {
        const command = 'mkd';
        const args:string = 'carpeta';
        const data = JSON.stringify({ command, args });
  
        client.write(data);
      });
  
      client.on('data', (data) => {
        const response = JSON.parse(data.toString());
  
        expect(response.error).to.equal("Command failed: mkd carpeta\n/bin/sh: 1: mkd: not found\n");
  
        client.end();
        done();
      });
  
      client.on('end', () => {
        console.log('Disconnected from server');
      });
    });
  });