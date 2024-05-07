const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = {
    makePayment: async (req, res) => {
        const { productos } = req.body;

        try {
            console.log(productos)
            const line_items = productos.map(producto => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: producto.nombre,
                        images: [`http://localhost:3002/img/products/${producto.imageUrl}`],
                    },
                    unit_amount: producto.precio * 100
                },
                quantity: producto.quantity,
            }));

            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                shipping_address_collection:{
                    allowed_countries: ['ES'],
                },
                success_url: `${process.env.BASE_URL}/complete`,
                cancel_url: `${process.env.BASE_URL}/cancel`
            });

            res.json({ url: session.url });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

};

module.exports = stripeController;