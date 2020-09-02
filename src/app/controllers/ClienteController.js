import Cliente from '../models/Cliente';

class ClienteController {
  async store(req, res) {
    const clienteExists = await Cliente.findOne({
      where: { cpf: req.body.cpf },
    });

    if (clienteExists) {
      return res.status(400).json({ error: 'Cliente já cadastrado na base' });
    }
    const cliente = await Cliente.create(req.body);

    return res.status(200).json(cliente);
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

    const cliente = await clienteExists.update(req.body);

    return res.status(200).json(cliente);
  }

  async show(req, res) {
    const clienteExists = await Cliente.findByPk(req.params.id);
    if (!clienteExists) {
      return res
        .status(404)
        .json({ error: 'Cliente não cadastrado na base de dados.' });
    }

    res.status(200).json(clienteExists);
  }

  // LISTAGEM DE TODOS OS CLIENTES.
  async index(req, res) {
    const clientes = await Cliente.findAll();

    return res.json(clientes);
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
