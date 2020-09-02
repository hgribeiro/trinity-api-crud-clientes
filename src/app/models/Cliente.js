import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        nascimento: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Cliente;
