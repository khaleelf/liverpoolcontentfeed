var assert = require('assert');
const { stripFeed } = require('../feeds/util/response-sanitation');
const popularFeed = require('../test/util/popularfeedtest.json')
const empireOfTheKopFeed = require('../test/util/empireofthekopfeed.json')

describe('stripFeed', function () {
    describe('new object creation', function () {

        it('should contain originId, title and visual', function () {
            const sanitisedFeed = stripFeed(popularFeed);
            const firstItem = sanitisedFeed.items[0]
            assert.deepEqual(Object.keys(firstItem), ["originId", "title", "visual"]);
        });

        it('visual should contain a url', function () {
            const sanitisedFeed = stripFeed(popularFeed);
            const firstItem = sanitisedFeed.items[0].visual
            assert.deepEqual(Object.keys(firstItem), ["url"]);
        });

        it('empire of the cop url stripped out and replaced with constant', function () {
            const sanitisedFeed = stripFeed(empireOfTheKopFeed);
            assert.deepEqual(empireOfTheKopFeed.items[39].visual.url, 'none')
            assert.deepEqual(sanitisedFeed.items[39].visual.url, "https://pbs.twimg.com/profile_images/1138760979880304641/B72IMxOm_400x400.jpg");
        });
    });
});