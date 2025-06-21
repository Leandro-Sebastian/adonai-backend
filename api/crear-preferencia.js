import mercadopago from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Solo POST');

  const { nombre, servicio, fecha, hora } = req.body;

  mercadopago.configure({
    access_token: 'APP_USR-2551654686545169-062021-b088ba2ac1066337b334537b890e1012-293204491',
  });

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
      payer: { name: nombre },
      back_urls: {
        success: 'https://adonai-backend.onrender.com/success.html',
        failure: 'https://adonai-backend.onrender.com/failure.html',
        pending: 'https://adonai-backend.onrender.com/pending.html',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
