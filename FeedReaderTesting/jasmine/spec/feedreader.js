$(function() {
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URL defined and not empty', function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        })

        it('have name defined and not empty', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    });
    describe('The menu', () => {
        it('is hidden by default', () => {
            expect($('.slide-menu').css('display')).toBe('none');
        });
        it('changes visibility when the icon is clicked', () => {
            expect(menuClicked).not.toEqual(0);
        }); 
    });  
    describe('Initial Entries', function() {
        beforeEach((done)=> {
            loadFeed(0, () => {
                done();
            });
        });
        it('at least a single .entry element', (done) => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });
    describe('New Feed Selection', function() {
        beforeEach((done)=> {
            feedContent = {
                first:"",
                last:""
            }
            loadFeed(0, () => feedContent.first = $('.feed').html());
            allFeeds.push({
                name: 'Portuguese News',
                url: 'http://feeds.feedburner.com/JN-Ultimas'
            });
            loadFeed(4, () => {
                feedContent.last = $('.feed').html();
                done();
            })
        })
        it('Content changes when new feed is loaded', (done) => {
            expect(feedContent.last).not.toEqual(feedContent.first);
            done();
        });
    });
}());
