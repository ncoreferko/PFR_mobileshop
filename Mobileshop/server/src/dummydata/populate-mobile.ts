import mongoose from 'mongoose';
import { Mobile } from '../model/Mobile';

// Function to connect to MongoDB
const dbUrl = 'mongodb://localhost:6000/my_db';

async function connect() {
    await mongoose.connect(dbUrl).then((_) => {
        console.log('Successfully connected to MongoDB.');
    }).catch(error => {
        console.log(error);
        return;
    });
  }

  mongoose.connect(dbUrl).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});

async function populateDefaultData() {
  const defaultMobiles = [
    { brand: 'Brand1', modelName: 'Model1', price: 100, inStock: 10 },
    { brand: 'Brand2', modelName: 'Model2', price: 200, inStock: 20 },
    // more data
  ];

  try {
    await Mobile.insertMany(defaultMobiles);
    console.log('Default mobile data inserted successfully');
  } catch (error) {
    console.error('Error inserting default mobile data:', error);
  }
}

async function main() {
  await connect();
  await populateDefaultData();
  mongoose.disconnect();
}

main();