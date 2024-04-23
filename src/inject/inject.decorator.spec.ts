import { registry } from "../registry/registry.decorator"
import { Registry } from "../registry/registry"
import { inject } from "../inject/inject.decorator"

class C {
  @inject() public readonly registry: Registry;
}

class B {
  @inject() public readonly c: C;
}

class A {
  @inject() public readonly b: B;
}


@registry([A, B, C])

class App {
  @inject()
  public readonly a: A;
}

describe("App Class Test", () => {
  let appInstance: App
  beforeEach(() => {
    appInstance = new App();

  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("Should create an instance of App with injected properties", () => {
    expect(appInstance.a).toBeInstanceOf(A);
    expect(appInstance.a.b).toBeInstanceOf(B);
    expect(appInstance.a.b.c).toBeInstanceOf(C);
  });
});