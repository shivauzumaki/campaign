
module.exports = function(sequelize, Sequelize) {
    var UserIdeaProbMap = sequelize.define('userideaprobmap', {
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
        ideaId: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return UserIdeaProbMap;
}