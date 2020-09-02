import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';

class ClienteController {
  async store(req, res) {
    const clienteExists = await Cliente.findOne({
      where: { cpf: req.body.cpf },
    });

    if (clienteExists) {
      return res.status(400).json({ error: 'Cliente já cadastrado na base' });
    }

    const { nome, cpf, nascimento, endereco } = req.body;
    const {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    } = endereco;

    const newCliente = { nome, cpf, nascimento };
    const { id } = await Cliente.create(newCliente);
    const cliente_id = id;
    await Endereco.create({
      cliente_id,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    });

    return res.status(200).json({ id, nome, cpf, nascimento, endereco });
  }

  async update(req, res) {
    const clienteExists = await Cliente.findByPk(req.params.id);

    if (!clienteExists) {
      return res
        .status(404)
        .json({ error: 'Cliente não cadastrado na base de dados.' });
    }

    if (req.body.cpf === clienteExists.cpf) {
      return res
        .status(400)
        .json({ error: 'Esse CPF já está cadastrado na base dados!' });
    }

    const { nome, cpf, nascimento } = await clienteExists.update(req.body);

    const enderecoExists = Endereco.findOne({
      where: { cliente_id: req.body.id },
    });

    const endereco = await enderecoExists.update(req.body.endereco);

    return res.status(200).json({ nome, cpf, nascimento, endereco });
  }

  async show(req, res) {
    const clienteExists = await Cliente.findByPk(req.params.id);
    if (!clienteExists) {
      return res
        .status(404)
        .json({ error: 'Cliente não cadastrado na base de dados.' });
    }
    const { id, nome, cpf, nascimento } = clienteExists;
    const {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    } = await Endereco.findOne({
      where: { cliente_id: req.params.id },
    });

    res.status(200).json({
      id,
      nome,
      cpf,
      nascimento,
      endereco: { logradouro, numero, complemento, bairro, cidade, uf, cep },
    });
  }

  // LISTAGEM DE TODOS OS CLIENTES.
  async index(req, res) {
    const clientes = await Cliente.findAll();
    const enderecos = await Endereco.findAll();

    const arrayCliente = [];

    for (let i = 0; i < clientes.length; i++) {
      const { id, nome, cpf, nascimento } = clientes[i];
      const {
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        cep,
      } = enderecos[i];
      arrayCliente.push({
        id,
        nome,
        cpf,
        nascimento,
        endereco: { logradouro, numero, complemento, bairro, cidade, uf, cep },
      });
    }

    return res.json(arrayCliente);
  }

  async delete(req, res) {
    const cliente = await Cliente.findOne({
      where: { id: req.params.id },
    });
    if (!cliente) {
      return res
        .status(404)
        .json({ error: 'Cliente não encontrado na base de dados.' });
    }

    await cliente.destroy(cliente);
    res.status(200).json({ messagem: 'Cliente deletado com sucesso!' });
  }
}

export default new ClienteController();
