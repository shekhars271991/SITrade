const express = require('express');
const apiRouter = require('./routes');

const app = express();
app.use(express.json());
app.use('/apiv1/orders', apiRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


