import { Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

export async function pagination(
  page: number,
  limit: number,
  repo: Repository<any>,
  sortingOptions?: FindManyOptions['order'],
): Promise<any[]> {
  const skip = (page - 1) * limit;
  const options: FindManyOptions = {
    skip,
    take: limit,
    order: sortingOptions, // Set the sorting options
  };
  const datas = await repo.find(options);
  return datas;
}

export async function getTotalCount(repo: Repository<any>): Promise<number> {
  const articleCount = await repo.count();
  return articleCount;
}
