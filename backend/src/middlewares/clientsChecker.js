async function clientAddChecker(req, res, next) {
  try {
    const values = ['name', 'birth', 'CPF', 'CNH', 'phone', 'address'];
    const { body } = req;
    const testValues = values.reduce((acc, value) => {
      if (acc) return typeof body[value] === 'string';
    }, true);
    if (!testValues || req.file === undefined) {
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
    if (typeof body.CPF !== 'string') {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function clientStatusChecker(req, res, next) {
  try {
    const { query } = req;
    if (!query.status) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function clientNameChecker(req, res, next) {
  try {
    const { query } = req;
    if (!query.name) {
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
    const validation = (typeof plate !== 'string' || typeof value === 'number' || typeof body.CPF === 'string');
    if (!validation) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function removeSecuritieChecker(req, res, next) {
  try {
    const { body } = req;
    const validation = (typeof body.plate === 'number' || typeof body.CPF === 'string');
    if (!validation) {
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
  removeSecuritieChecker,
};