const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const db = mongoose.connection.db;
    const settings = await db.collection('settings').findOne({});
    if(settings) {
        const update = {};
        if(settings.logo && settings.logo.length > 500) {
            console.log('Logo size was:', settings.logo.length);
            update.logo = '';
        }
        if(settings.favicon && settings.favicon.length > 500) {
            console.log('Favicon size was:', settings.favicon.length);
            update.favicon = '';
        }
        
        // Also check if there is an ogImage
        if(settings.seo && settings.seo.ogImage && settings.seo.ogImage.length > 500) {
            console.log('ogImage size was:', settings.seo.ogImage.length);
            update['seo.ogImage'] = '';
        }

        if(Object.keys(update).length > 0) {
            await db.collection('settings').updateOne({_id: settings._id}, {$set: update});
            console.log('Cleaned massive base64 strings from Settings:', Object.keys(update));
        } else {
            console.log('Settings are fine. No massive strings.');
            // Dump the size of settings string
            console.log('Settings total string length:', JSON.stringify(settings).length);
        }
    } else {
        console.log('No settings');
    }
    process.exit(0);
});
