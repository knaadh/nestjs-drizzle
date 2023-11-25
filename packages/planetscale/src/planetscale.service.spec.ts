import { Test, TestingModule } from '@nestjs/testing';
import { DrizzlePlanetScaleService } from './planetscale.service';
describe('DrizzlePlanetScaleService', () => {
  let service: DrizzlePlanetScaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzlePlanetScaleService],
    }).compile();

    service = module.get<DrizzlePlanetScaleService>(DrizzlePlanetScaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
