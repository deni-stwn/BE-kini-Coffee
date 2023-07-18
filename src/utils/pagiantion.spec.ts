import { Repository } from 'typeorm';
import { pagination, getTotalCount } from './paginationUtils';

describe('Pagination', () => {
  it('should return paginated data from repository', async () => {
    const page = 1;
    const limit = 10;
    const mockRepo: Repository<any> = {
      find: jest.fn().mockResolvedValueOnce(['data1', 'data2']),
    } as any;

    const result = await pagination(page, limit, mockRepo);

    expect(mockRepo.find).toHaveBeenCalledWith({ skip: 0, take: limit });
    expect(result).toEqual(['data1', 'data2']);
  });
});

describe('getTotalCount', () => {
  it('should return total count from repository', async () => {
    const mockRepo: Repository<any> = {
      count: jest.fn().mockResolvedValueOnce(5),
    } as any;

    const result = await getTotalCount(mockRepo);

    expect(mockRepo.count).toHaveBeenCalled();
    expect(result).toEqual(5);
  });
});
