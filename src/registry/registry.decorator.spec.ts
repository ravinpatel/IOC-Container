import { registry, Injection } from './registry.decorator'
import { Registry } from './registry'

jest.mock('./registry')

class MockService {}

describe('Registry Decorator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register injections correctly', () => {
    const injections = [
      new Injection('DependencyA', 'valueA'),
      new Injection('DependencyB', 'valueB'),
      MockService
    ];

    @registry(injections)
    class TestClass {}

    new TestClass();

    expect(Registry.create).toHaveBeenCalledWith('dependencya', 'valueA');
    expect(Registry.create).toHaveBeenCalledWith('dependencyb', 'valueB');
    expect(Registry.create).toHaveBeenCalledWith('mockservice', expect.any(MockService));
  });

  it('should handle undefined injections', () => {
    @registry()
    class TestClass {}

    new TestClass();

    expect(Registry.create).not.toHaveBeenCalled();
  });

  it('should handle empty injections array', () => {
    @registry([])
    class TestClass {}

    new TestClass();

    expect(Registry.create).not.toHaveBeenCalled();
  });
});