import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function checkAdmin() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    
    // Check users
    const users = await db.collection('user').find({ role: 'admin' }).toArray();
    console.log('👥 Admin Users:');
    users.forEach(user => {
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   User _id: ${user._id}`);
      console.log('');
    });

    // Check accounts
    console.log('🔑 Checking accounts for admin users...');
    for (const user of users) {
      const accounts = await db.collection('account').find({ 
        $or: [
          { userId: user.id },
          { userId: user._id?.toString() }
        ]
      }).toArray();
      
      console.log(`   Accounts for ${user.email}:`);
      if (accounts.length === 0) {
        console.log('     ⚠️  No accounts found!');
      } else {
        accounts.forEach(acc => {
          console.log(`     - Provider: ${acc.providerId}`);
          console.log(`       Account ID: ${acc.accountId}`);
          console.log(`       User ID: ${acc.userId}`);
        });
      }
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

checkAdmin();
