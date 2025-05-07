import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController } from '@warehouse/infrastructure/controllers/ingredient.controller';
import { ICreateIngredientUseCase } from '@warehouse/domain/ports/create-ingredient.use-case';
import { IGetOneIngredientByNameUseCase } from '@warehouse/domain/ports/get-one-ingredient-by-name.use-case';
import {
  IngredientEntity,
  GetOneIngredientByNameEntity,
} from '@warehouse/domain/entities/ingredient.entity';
import { ResponseEntity } from '@core/domain/entities/response.entity';

describe('IngredientController', () => {
  let controller: IngredientController;
  let mockCreateIngredientUseCase: jest.Mocked<ICreateIngredientUseCase>;
  let mockGetOneByNameIngredientUseCase: jest.Mocked<IGetOneIngredientByNameUseCase>;

  beforeEach(async () => {
    mockCreateIngredientUseCase = { execute: jest.fn() } as any;
    mockGetOneByNameIngredientUseCase = { execute: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        {
          provide: ICreateIngredientUseCase, // Usa el token de clase/interfaz
          useValue: mockCreateIngredientUseCase,
        },
        {
          provide: IGetOneIngredientByNameUseCase,
          useValue: mockGetOneByNameIngredientUseCase,
        },
      ],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  it('should call createIngredientUseCase.execute with correct payload', async () => {
    const dto: IngredientEntity = { name: 'Tomato' };
    const expectedResponse: ResponseEntity = {
      statusCode: 200,
      status: 'success',
      message: 'created',
      data: null,
    };

    mockCreateIngredientUseCase.execute.mockResolvedValue(expectedResponse);

    const result = await controller.create(dto);

    expect(mockCreateIngredientUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });

  it('should call getOneByNameIngredientUseCase.execute with correct payload', async () => {
    const dto: GetOneIngredientByNameEntity = { name: 'Onion' };
    const expectedResponse: ResponseEntity = {
      statusCode: 200,
      status: 'success',
      message: 'found',
      data: { id: 1, name: 'Onion' },
    };

    mockGetOneByNameIngredientUseCase.execute.mockResolvedValue(
      expectedResponse,
    );

    const result = await controller.findOneByName(dto);

    expect(mockGetOneByNameIngredientUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });
});
