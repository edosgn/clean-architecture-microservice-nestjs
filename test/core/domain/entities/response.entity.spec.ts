import {
  ResponseEntity,
  statusCode,
  statusType,
} from '@core/domain/entities/response.entity';

describe('ResponseEntity', () => {
  it('should create a successful response with data', () => {
    // Arrange
    const statusCode: statusCode = 200;
    const status: statusType = 'success';
    const message = 'Operation completed';
    const data = { id: 1, name: 'Test' };

    // Act
    const response = new ResponseEntity();
    response.statusCode = statusCode;
    response.status = status;
    response.message = message;
    response.data = data;

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.status).toBe('success');
    expect(response.message).toBe('Operation completed');
    expect(response.data).toEqual({ id: 1, name: 'Test' });
  });

  it('should create an error response without data', () => {
    // Arrange
    const response = new ResponseEntity();

    // Act
    response.statusCode = 500;
    response.status = 'error';
    response.message = 'Internal Server Error';

    // Assert
    expect(response.statusCode).toBe(500);
    expect(response.status).toBe('error');
    expect(response.message).toBe('Internal Server Error');
    expect(response.data).toBeUndefined();
  });

  it('should support all allowed status codes and types', () => {
    const statusCodes: statusCode[] = [200, 204, 400, 404, 500];
    const statusTypes: statusType[] = ['success', 'error', 'warning', 'info'];

    statusCodes.forEach((code) => {
      statusTypes.forEach((type) => {
        // Arrange
        const entity = new ResponseEntity();
        entity.statusCode = code;
        entity.status = type;
        entity.message = `Test message ${code}-${type}`;

        // Assert
        expect(entity.statusCode).toBe(code);
        expect(entity.status).toBe(type);
        expect(entity.message).toContain('Test message');
      });
    });
  });
});
