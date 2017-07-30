
module.exports = function(sequelize, Sequelize) {
    var Idea = sequelize.define('idea', {
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
        problemId:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        summary: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        keyproblem: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        customers: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        betteridea: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        passionate: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        aboutteam: {
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
    return Idea;
}