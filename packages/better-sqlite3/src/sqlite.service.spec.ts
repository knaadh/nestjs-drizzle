import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleBetterSQLiteService } from './sqlite.service';
describe('DrizzleBetterSQLiteService', () => {
  let service: DrizzleBetterSQLiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzleBetterSQLiteService],
    }).compile();

    service = module.get<DrizzleBetterSQLiteService>(
      DrizzleBetterSQLiteService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
