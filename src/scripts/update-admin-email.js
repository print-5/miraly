import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function updateAdminEmail() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env file');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    
    const oldEmail = 'admin@sainandhini.com';
    const newEmail = process.env.ADMIN_EMAIL || 'admin@miralyfoods.com';

    // Update in user collection
    const userResult = await db.collection('user').updateOne(
      { email: oldEmail },
      { 
        $set: { 
          email: newEmail,
          updatedAt: new Date()
        } 
      }
    );

    console.log(`\n📧 User Collection:`);
    console.log(`   Found: ${userResult.matchedCount}`);
    console.log(`   Updated: ${userResult.modifiedCount}`);

    // Update in account collection
    const accountResult = await db.collection('account').updateOne(
      { accountId: oldEmail },
      { 
        $set: { 
          accountId: newEmail,
          updatedAt: new Date()
        } 
      }
    );

    console.log(`\n🔑 Account Collection:`);
    console.log(`   Found: ${accountResult.matchedCount}`);
    console.log(`   Updated: ${accountResult.modifiedCount}`);

    if (userResult.matchedCount === 0) {
      console.log(`\n⚠️  No user found with email: ${oldEmail}`);
      console.log(`   Checking what admin users exist...`);
      
      const admins = await db.collection('user').find({ role: 'admin' }).toArray();
      console.log(`\n👥 Found ${admins.length} admin user(s):`);
      admins.forEach(admin => {
        console.log(`   - ${admin.email} (${admin.name})`);
      });
    } else {
      console.log(`\n✅ Successfully updated admin email!`);
      console.log(`   Old: ${oldEmail}`);
      console.log(`   New: ${newEmail}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB\n');
  }
}

updateAdminEmail();
