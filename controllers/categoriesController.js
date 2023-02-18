const Category = require('../models/category');

module.exports = 
{
    create(req, res) 
    {
        const category = req.body;
        Category.create(category, (err, idCategory) => 
        {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Ocurrio un error con la creación de la nueva categoria',
                    error: err
                });
            }      

            return res.status(200).json({
                success: true,
                message: 'La categoria se creo correctamente',
                data: `${idCategory}`
            });

        });
    }
}