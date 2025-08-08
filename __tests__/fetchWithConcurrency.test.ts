import { fetchWithConcurrency } from '../src/fetchWithConcurrency';

const urlsMock = ['url1', 'url2', 'url3', 'url4', 'url5'];

describe('fetchWithConcurrency', () => {

  it('should fetch all URLs with limited concurrency and maintains order', async () => {

    global.fetch = jest.fn((url) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(`Response for ${url}`), Math.random() * 100)
      )
    ) as jest.Mock;

    const results = await fetchWithConcurrency(urlsMock, 3);

    expect(results).toEqual([
      'Response for url1',
      'Response for url2',
      'Response for url3',
      'Response for url4',
      'Response for url5',
    ]);

    expect(fetch).toHaveBeenCalledTimes(urlsMock.length);
  });

  it('should not exceed the configured maximum concurrency', async () => {
    const maxConcurrency = 2;

    let activeFetches = 0;
    let maxObservedConcurrency = 0;

    global.fetch = jest.fn((url) => {
      activeFetches++;
      if (activeFetches > maxObservedConcurrency) {
        maxObservedConcurrency = activeFetches;
      }

      return new Promise((resolve) =>
        setTimeout(() => {
          activeFetches--;
          resolve(`Response for ${url}`);
        }, 50)
      );
    }) as jest.Mock;

    const results = await fetchWithConcurrency(urlsMock, maxConcurrency);

    expect(results.length).toBe(urlsMock.length);
    expect(maxObservedConcurrency).toBeLessThanOrEqual(maxConcurrency);
  });
});

