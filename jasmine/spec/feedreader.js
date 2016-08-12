/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have a URL property which is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        it('have a name property which is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('changes visibility when clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('loadFeed adds at least one .entry element to .feed container', function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Section', function() {
        var initialFirstItemText;
        getFirstItemText = function() {
            return $($('.feed').find('.entry')[0]).find('h2').text();
        };
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFirstItemText = getFirstItemText();
                loadFeed(1, function() {
                    done();
                });
            });
        })
        it('loadFeed changes the content when called with a new index', function() {
            expect(getFirstItemText()).not.toBe(initialFirstItemText);
        });
     });
}());
