import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '@warehouse/infrastructure/controllers/inventory.controller';
import { IUpdateInventoryUseCase } from '@warehouse/domain/ports/update-inventory.use-case';
import { IGetInventoryUseCase } from '@warehouse/domain/ports/get-inventory.use-case';
import { IGetOneInventoryByIngredientIdUseCase } from '@warehouse/domain/ports/get-one-inventory-by-ingredient.use-case';
import {
  InventoryEntity,
  GetOneInventoryByIngredientIdEntity,
} from '@warehouse/domain/entities/inventory.entity';
import { ResponseEntity } from '@core/domain/entities/response.entity';

describe('InventoryController', () => {
  let controller: InventoryController;
  let mockUpdateInventoryUseCase: jest.Mocked<IUpdateInventoryUseCase>;
  let mockGetInventoryUseCase: jest.Mocked<IGetInventoryUseCase>;
  let mockGetOneInventoryByIngredientIdUseCase: jest.Mocked<IGetOneInventoryByIngredientIdUseCase>;

  beforeEach(async () => {
    mockUpdateInventoryUseCase = { execute: jest.fn() } as any;
    mockGetInventoryUseCase = { execute: jest.fn() } as any;
    mockGetOneInventoryByIngredientIdUseCase = { execute: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: IUpdateInventoryUseCase,
          useValue: mockUpdateInventoryUseCase,
        },
        {
          provide: IGetInventoryUseCase,
          useValue: mockGetInventoryUseCase,
        },
        {
          provide: IGetOneInventoryByIngredientIdUseCase,
          useValue: mockGetOneInventoryByIngredientIdUseCase,
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should call updateInventoryUseCase.execute with correct payload', async () => {
    // Arrange
    const dto: InventoryEntity = { ingredient_id: 1, quantity: 10 };
    const expectedResponse: ResponseEntity = {
      statusCode: 200,
      status: 'success',
      message: 'updated',
      data: null,
    };
    mockUpdateInventoryUseCase.execute.mockResolvedValue(expectedResponse);

    // Act
    const result = await controller.create(dto);

    // Assert
    expect(mockUpdateInventoryUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });

  it('should return all inventory items', async () => {
    // Arrange
    const expectedResponse: ResponseEntity = {
      statusCode: 200,
      status: 'success',
      message: 'found',
      data: [],
    };
    mockGetInventoryUseCase.execute.mockResolvedValue(expectedResponse);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(mockGetInventoryUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(expectedResponse);
  });

  it('should call getOneInventoryByIngredientIdUseCase.execute with correct payload', async () => {
    // Arrange
    const dto: GetOneInventoryByIngredientIdEntity = { ingredient_id: 2 };
    const expectedResponse: ResponseEntity = {
      statusCode: 200,
      status: 'success',
      message: 'found',
      data: { ingredient_id: 2, quantity: 20 },
    };
    mockGetOneInventoryByIngredientIdUseCase.execute.mockResolvedValue(
      expectedResponse,
    );

    // Act
    const result = await controller.findOneByIngredientId(dto);

    // Assert
    expect(
      mockGetOneInventoryByIngredientIdUseCase.execute,
    ).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });
});
