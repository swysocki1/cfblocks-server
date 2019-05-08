export class MysqlConnector {
  timeout = 3000;
  client;
  constructor(client?) {
    if (client)
      this.client = client;
  }
  getClient() {
    return this.client;
  }
  connect(res) {
    if (!this.isConnected()) {
      const hostname = process.env.MYSQL_HOSTNAME;
      const username = process.env.MYSQL_USERNAME;
      const password = process.env.MYSQL_PASSWORD;
      const mysql = require('mysql2/promise');
      mysql.createConnection({
        host: hostname,
        user: username,
        password: password,
        database: process.env.MYSQL_DATABASE,
        connectTimeout: this.timeout
      }).then((client) => {
        this.client = client;
        res(null, client);
      }).catch((connectionError) => {
        res(connectionError);
      });
    } else {
      res(null, 'Already Connected!');
    }
  }
  isConnected() {
    return !!this.client;
  }
  disconnect(res) {
    if (this.client) {
      this.client.end((message) => {
        res(message);
      });
    } else {
      res();
    }
  }
  query(query: string, timeout: number): Promise<any[]> {
    console.log('do query: ', query);
    return new Promise((resolve, reject) => {
      this.connect((connectErr, client) => {
        if (connectErr) reject(connectErr);
        else {
          const timeoutEvent = setTimeout(() => {
            reject(`MYSQL TIMEOUT - ${timeout}ms`);
          }, timeout);
          this.client.execute(query, (err, response) => {
            clearTimeout(timeoutEvent);
            if (err) {
              reject(err);
            } else {
              // console.log('query Response: ', response);
              resolve(response);
            }
          });
        }
      });
    });
  }
}