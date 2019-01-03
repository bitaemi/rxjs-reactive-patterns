

export function newsletterRoute(req, res) {

    const payload = req.body;

    console.log('subscribing to newsletter ...', payload.email);

    res.status(200).send();
}