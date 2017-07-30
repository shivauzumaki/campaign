
module.exports = function(sequelize, Sequelize) {
    var Category = sequelize.define('category', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        category:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        subcategory: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        subcategoryimageurl:{
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return Category;
}