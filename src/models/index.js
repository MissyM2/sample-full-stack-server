import Sequelize from 'sequelize';

import userModel from './user';
import messageModel from './message';

// sequelize
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      ssl: true,
      dialectOptions: {
        ssl: true,
      },
    }
  );
}

const models = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Message: messageModel(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
