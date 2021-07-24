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
            pageWiseVisits: analyticsData.reverse().reduce((acc, value) => {
                const visitTimeData = value.visit_time ? {
                    time: value.visit_time.time,
                    tz: value.visit_time.tz
                } : {
                    time: value.visit_time,
                    tz: null
                };
                const formattedValue = {
                    page: value.page,
                    userAgent: value.user_agent,
                    visitTime: {
                        ...visitTimeData
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
        return { statusCode: 500, body: 'Something Went Wrong' };
    } finally {
        await client.close();
    }
};
