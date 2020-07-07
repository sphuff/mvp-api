module.exports = {
    handleError: (error, res) => {
        res.status(error.status).send({error: error.message});
    }
}