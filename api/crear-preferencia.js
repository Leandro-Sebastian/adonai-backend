const mercadopago = require('mercadopago');

// Configura tu token personal
mercadopago.configure({
  access_token: 'TU_ACCESS_TOKEN_AQUÍ', // ⚠️ No subas esto público
});

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Método no permitido');
  }

  const { nombre, servicio, fecha, hora } = req.body;

  try {
    const preference = {
      items: [
        {
          title: `Turno ${servicio} - ${fecha} ${hora}`,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 5000,
        },
      ],
      payer: {
        name: nombre,
      },
      back_urls: {
        success: 'https://tusitio.com/success.html',
        failure: 'https://tusitio.com/failure.html',
        pending: 'https://tusitio.com/pending.html',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = handler;
