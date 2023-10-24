import { Test, TestingModule } from '@nestjs/testing';
import { DrizzlePGService } from './node-postgres.service';

describe('DrizzlePGService', () => {
  let service: DrizzlePGService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzlePGService],
    }).compile();

    service = module.get<DrizzlePGService>(DrizzlePGService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
