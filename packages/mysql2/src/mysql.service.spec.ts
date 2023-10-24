import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleMySqlService } from './mysql.service';
describe('DrizzleMySqlService', () => {
  let service: DrizzleMySqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzleMySqlService],
    }).compile();

    service = module.get<DrizzleMySqlService>(DrizzleMySqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
