import { registry } from "../registry/registry.decorator"
import { inject } from "../inject/inject.decorator"

class C {
  log() {
    console.log('Logging from class C');
  }
}

class B {
  @inject() public readonly c: C
}

class A {
  @inject() public readonly b: B
}


@registry([A, B, C])

class App {
  @inject()
  public readonly a: A
}

describe("App Class Test", () => {
  let appInstance: App
  beforeEach(() => {
    appInstance = new App()

  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("Should create an instance of App with injected properties", () => {
    expect(appInstance).toBeInstanceOf(App)
    expect(appInstance.a).toBeInstanceOf(A)
    expect(appInstance.a.b).toBeInstanceOf(B)
    expect(appInstance.a.b.c).toBeInstanceOf(C)
    const consoleLogSpy = jest.spyOn(console, 'log')
    appInstance.a.b.c.log()
    expect(consoleLogSpy).toHaveBeenCalledWith('Logging from class C')
  });
});