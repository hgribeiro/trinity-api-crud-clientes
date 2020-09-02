import Sequelize from 'sequelize';

import Cliente from '../app/models/Cliente';
import Endereco from '../app/models/Endereco';

import databaseConfig from '../config/database';

const models = [Cliente, Endereco];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
