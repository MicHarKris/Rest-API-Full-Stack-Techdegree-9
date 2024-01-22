"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  // Define a User class that extends the Sequelize Model class
  class User extends Model {}

  // Initialize the User model with the specified attributes and validations
  User.init(
    {
      // User's first name attribute
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A First Name is required",
          },
          notEmpty: {
            msg: "Please provide a First Name",
          },
        },
      },
      // User's last name attribute
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A Last Name is required",
          },
          notEmpty: {
            msg: "Please provide a Last Name",
          },
        },
      },
      // User's email attribute
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email you entered already exists",
        },
        validate: {
          notNull: {
            msg: "An Email address is required",
          },
          isEmail: {
            msg: "Please provide a valid Email address",
          },
        },
      },

      // I kept running into an issue where I couldn't check the password length, without it comparing to the hashed password value (regardless of implemented order of operations), so I added a virtual attribute for the password and set the password attribute to a string. This fixed the issue.

      // Virtual attribute for the user's password (not stored in the database)
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A Password is required",
          },
          notEmpty: {
            msg: "Please provide a Password",
          },
          len: {
            args: [8, 20],
            msg: "The Password must be between 8 and 20 characters in length",
          },
        },
      },
      // User's password attribute (stored in the database)
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue("password", hashedPassword);
        },
      },
    },
    //
    {
      sequelize,
      modelName: "User",
    }
  );

  // Define the association with the Course model
  User.associate = (model) => {
    User.hasMany(model.Course, {
      foreignKey: {
        fieldName: "userId",
      },
    });
  };

  // Return the User model
  return User;
};
