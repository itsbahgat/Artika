const stripe = require('stripe')('sk_test_51N0Hx7Hoe9aTH9X8qsNKaeL4Jg0FiZupsXSzsycc1pcjCa5mKIsj0sM7kyYvrkkegwAKDNGbsNXpPd0ukLvY3VU400Qrj7NkBu');

module.exports.tryStripe = (request, response, next)=>{
    const { amount, currency, source, description } = request.body;
    const card = {
        number: source.number,
        exp_month: source.exp_month,
        exp_year: source.exp_year,
        cvc: source.cvc,
    };

    stripe.tokens.create({ card }, function(err, token) {
        if (err) {
        next(err);
        } else {
            stripe.charges.create({
                amount,
                currency,
                source : token.id, 
                description
            }, function(err, charge) {
                if(err)
                {
                    next(err);
                } else {
                    response.json({message : charge});
                }
            });
        }
    });
}

 //*****************for testing*********************************
    // {
    //     "amount": 3000,
    //     "currency": "EGP",
    //     "source": {
    //         "object": "Visa",
    //         "number": "4242424242424242",
    //         "exp_month": 12,
    //         "exp_year": 2024,
    //         "cvc": "123"
    //     }, 
    //     "description":"des"
    // }