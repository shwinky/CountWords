
jest.mock('util');
const util = require('util');

util.promisify = jest.fn(() => ()=>({body:"This sentence has seven words in it"}));
const StringService = require('../services/StringService');
const UrlService = require('../services/UrlService');
//
 describe("Services tests", () => {
        beforeEach(() => {
            mockPersist={
                add: jest.fn(),
                get: jest.fn()
            }
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('String service should add 5 words from string', async () => {
            const stringService = new StringService(mockPersist);
            const input ="This sentence has five words";
            stringService.countWords(input);
            expect(mockPersist.add.mock.calls.length).toBe(5);
        });
        it('Url service should add 7 words from url', async () => {
            const urlService = new UrlService(mockPersist);
            await urlService.countWords("mockUrl");
            expect(mockPersist.add.mock.calls.length).toBe(7);
        });
 });

