import { Injectable } from '@nestjs/common';
import { createPool, Pool } from "generic-pool"
import { Client } from 'ts-postgres';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PgPoolService {

  pool : Pool<Client>;

  constructor(private readonly configService: ConfigService) {

    this.pool = createPool({
      create: async () => {
        const pgConfig = JSON.parse(this.configService.get<string>('pg'));
        const client = new Client(pgConfig);
        return client.connect().then(() => {
          client.on('error', console.log);
          return client;
        });
      },
      destroy: async (client: Client) => {
        return client.end().then(() => { })
      },
      validate: (client: Client) => {
        return Promise.resolve(!client.closed);
      }
    },
      { testOnBorrow: true,
        max: 10, // maximum size of the pool
        min: 2 // minimum size of the pool
    });
  }


  client = async () => {
      return await this.pool.acquire()
  }
}1
