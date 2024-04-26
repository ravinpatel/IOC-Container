import { Registry } from "../../registry/registry";
import { inject } from "../../inject/inject.decorator";

class ServiceA {
  message: string
  constructor() {
    this.message = "Service A instance msg"
  }
  getMessage() {
    return this.message
  }
}

class TestClass {
  public serviceAInstance?: ServiceA; // Explicitly define the property

  constructor() {
    // Ensure that the property is initialized
    this.serviceAInstance;
  }
}

inject({ name: 'ServiceAInstance' })(TestClass.prototype, 'serviceAInstance');

describe('integation test', () => {

  beforeEach(() => {
    // Create and register ServiceA instance in the registry before each test
    Registry.create('ServiceAInstance', new ServiceA());
  })
  
  it('should inject ServiceA instance correctly', () => {
    const testInstance = new TestClass()
    expect(testInstance.serviceAInstance).toBeDefined()
    expect(testInstance.serviceAInstance).toBeInstanceOf(ServiceA)
    expect(testInstance.serviceAInstance?.getMessage()).toEqual('Service A instance msg')
  })
})