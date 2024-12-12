import { Test, TestingModule } from '@nestjs/testing';
import { ExitController } from './exit.controller';
import { ExitService } from './exit.service';

describe('ExitController', () => {
  let controller: ExitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExitController],
      providers: [ExitService],
    }).compile();

    controller = module.get<ExitController>(ExitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
