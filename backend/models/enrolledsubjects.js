'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnrolledSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EnrolledSubjects.init({
    studentId: DataTypes.STRING,
    subjectCode: DataTypes.STRING,
    enrolledDate: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN,
    session: DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EnrolledSubjects',
  });
  return EnrolledSubjects;
};