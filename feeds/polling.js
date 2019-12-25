const fs = require('fs');
const request = require('request');
const sanitiser = require('./util/response-sanitation');
const email = require('./util/email-reminder');

const THIRTY_MIN = 1.8e6;
const STREAM_ID = 'user/a9d30e18-47ec-4606-b3b8-46aa2c138647/category/96e0529d-bdbd-4e15-b75b-48ecc0f3c3a2'

module.exports = {
    liverpoolFeeds: function () {
        setInterval(() => {
            request(
                'https://feedly.com/v3/mixes/contents',
                {
                    headers: { [process.env.AUTH_KEY]: process.env.AUTH_VALUE },
                    qs: {
                        streamId: STREAM_ID,
                        count: 3,
                        hours: 9,
                    }
                },
                (err, res, body) => {
                    const response = JSON.parse(body);

                    if (response.errorCode == 401) {
                        email.sendMail(body)
                        return;
                    }
                    const articles = sanitiser.stripFeed(response);

                    fs.writeFile("./feeds/featured-feed.txt", JSON.stringify(articles), (err) => {
                        if (err) {
                            console.log("error writing to featured file")
                        } else {
                            console.log("successfully wrote featured file")
                        }
                    });
                }
            )

            request(
                'https://feedly.com/v3/streams/contents',
                {
                    headers: { [process.env.AUTH_KEY]: process.env.AUTH_VALUE },
                    qs: {
                        streamId: STREAM_ID,
                        count: 40,
                        ranked: 'newest',
                        similar: true,
                    }
                },
                (err, res, body) => {
                    const response = JSON.parse(body);

                    if (response.errorCode == 401) {
                        email.sendMail(body)
                        return;
                    }
                    const articles = sanitiser.stripFeed(response);

                    fs.writeFile("./feeds/general-feed.txt", JSON.stringify(articles), (err) => {
                        if (err) {
                            console.log("error writing to general file")
                        } else {
                            console.log("successfully wrote to general file")
                        }
                    });
                }
            )
        }, THIRTY_MIN)
    }
}