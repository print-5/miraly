import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { client } from "@/lib/mongodb-client";

export async function POST() {
  try {
    await connectDB();

    const oldEmail = "admin@sainandhini.com";
    const newEmail = process.env.ADMIN_EMAIL || "admin@miralyfoods.com";

    const db = client.db();
    const usersCollection = db.collection("user");
    const accountsCollection = db.collection("account");

    // Update user email
    const userResult = await usersCollection.updateOne(
      { email: oldEmail },
      { 
        $set: { 
          email: newEmail,
          updatedAt: new Date()
        } 
      }
    );

    // Update account email (accountId)
    const accountResult = await accountsCollection.updateOne(
      { accountId: oldEmail },
      { 
        $set: { 
          accountId: newEmail,
          updatedAt: new Date()
        } 
      }
    );

    if (userResult.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "No admin user found with old email"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Admin email updated successfully!",
      details: {
        oldEmail,
        newEmail,
        userUpdated: userResult.modifiedCount > 0,
        accountUpdated: accountResult.modifiedCount > 0
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to update admin email: ${error.message}` },
      { status: 500 }
    );
  }
}
