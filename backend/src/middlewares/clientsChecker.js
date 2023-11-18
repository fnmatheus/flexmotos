async function clientAddChecker(req, res, next) {
  try {
    const values = ['name', 'birth', 'CPF', 'CNH', 'phone', 'address'];
    const { body } = req;
    const testValues = values.reduce((acc, value) => {
      if (acc) return typeof body[value] === 'string';
    }, true);
    if (!body || !testValues || req.file === undefined) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function clientCPFChecker(req, res, next) {
  try {
    const { body } = req;
    if (!body || !body.CPF) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function clientStatusChecker(req, res, next) {
  try {
    const { body } = req;
    if (!body || !typeof body.status === 'boolean') {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function clientNameChecker(req, res, next) {
  try {
    const { body } = req;
    if (!body || !typeof body.name) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function addSecuritieChecker(req, res, next) {
  try {
    const { body } = req;
    const [plate, value] = body.securitie;
    if (!body || typeof plate !== 'string' || typeof value !== 'number' || !body.CPF) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

module.exports = {
  clientAddChecker,
  clientCPFChecker,
  clientStatusChecker,
  clientNameChecker,
  addSecuritieChecker,
};