import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleTursoService } from './turso.service';
describe('DrizzleTursoService', () => {
  let service: DrizzleTursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzleTursoService],
    }).compile();

    service = module.get<DrizzleTursoService>(DrizzleTursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
