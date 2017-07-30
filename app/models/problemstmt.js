
module.exports = function(sequelize, Sequelize) {
    var ProblemStatement = sequelize.define('problemstmt', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        userId:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        description: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        category: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        subcategory: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return ProblemStatement;
}