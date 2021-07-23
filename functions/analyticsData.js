const { MongoClient } = require('mongodb');
const { DB_URL } = process.env;

exports.handler = async (event) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const client = await MongoClient.connect(DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        if (!client) {
            return { statusCode: 500, body: 'Failed to connect to DB!' };
        }

        const db = client.db('portfolioVisit');
        const collection = db.collection('visit');
        const findRes = collection.find();
        const analyticsData = await findRes.toArray()

        const formattedData = {
            visits: analyticsData.length,
            pageWiseVisits: analyticsData.reduce((acc, value) => {
                const formattedValue = {
                    page: value.page,
                    userAgent: value.user_agent,
                    visitData: {
                        time: value.visit_time.time || value.visit_time,
                        tz: value.visit_time.tz || null
                    },
                    logTime: value.log_time
                }
                if (acc[value.page]) {
                    acc[value.page].push(formattedValue);
                } else {
                    acc[value.page] = [formattedValue];
                }
                return acc;
            }, {}),
        }

        return {
            statusCode: 200,
            body: JSON.stringify(formattedData)
        };
    } catch (e) {
        // for easier debugging in netlify console
        console.log(e);
        return { statusCode: 500, body: 'Something Went Wrong' };
    } finally {
        await client.close();
    }
};
