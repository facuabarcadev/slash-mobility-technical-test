
/**
 * 1_JS Concurrency Exercise
 * Given an array of URLs and a MAX_CONCURRENCY integer, implement a function that will asynchronously
 * fetch each URL, not requesting more than MAX_CONCURRENCY URLs at the same time. The URLs should be
 * fetched as soon as possible. The function should return an array of responses for each URL.
 * How would you write a test for such a function?
 */

export type Task = { index: number; url: string; };

type Result = Response | Error;

async function createWorker(taskQueue: Task[], results: Result[]): Promise<void> {
  while (taskQueue.length > 0) {
    const { index, url } = taskQueue.shift()!;
    try {
      results[index] = await fetch(url);
    } catch (error) {
      results[index] = error as Error;
    }
  }
}

async function runWorkers(urls: string[], maxConcurrency: number): Promise<Result[]> {
  const results: Result[] = new Array(urls.length);
  const taskQueue: Task[] = urls.map((url, index) => ({ url, index }));
  const totalWorkers = Math.min(maxConcurrency, urls.length);
  const workers: Promise<void>[] = [];

  for (let i = 0; i < totalWorkers; i++) {
    workers.push(createWorker(taskQueue, results));
  }

  await Promise.all(workers);
  return results;
}

export async function fetchWithConcurrency(urls: string[], maxConcurrency: number): Promise<Result[]> {
  return runWorkers(urls, maxConcurrency);
}
