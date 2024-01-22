# Rest-API

# About the Project
 A REST API using Express. This API will provide a way to administer a school database containing information about users and courses.

 I experienced a weird behavior while implementing a length check to the password model, where the check would always only be performed on the hashed value, even if the bcrypt encryption happened at a later point in the code - I circumvented the problem by applying the validation checks on the DataTypes.VIRTUAL password, and then storing the DataTypes.STRING password with the hashed value.

 ### Tools and Technologies
 JavaScript, 
 Express, 
 Node.js, 
 Sequelize,
 REST API,
 Postman,
 DB Browser for SQLite
