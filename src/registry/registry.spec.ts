import { Registry } from "./registry"

describe('Registry', () => {
  let registry: Registry
  let createSpy: jest.SpyInstance
  let getSpy: jest.SpyInstance

  beforeEach(() => {
    registry = new Registry()
    createSpy = jest.spyOn(Map.prototype, 'set')
    getSpy = jest.spyOn(Map.prototype, 'get')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('creates instance of class', () => {
    expect(registry).toBeInstanceOf(Registry)
  })

  it('Uses Map method of set for create', () => {
    Registry.create('testName', 'testValue')
    expect(createSpy).toHaveBeenCalledTimes(1)
  })

  it('Uses Map method of get for retrieve', () => {
    Registry.retrieve('testName')
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveReturnedWith('testValue')
  })

  it('Throws error when retrieve is called but name does not exist', () => {
    Registry.retrieve('notExist')
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toThrow(TypeError)
    expect(getSpy).toHaveReturnedWith(undefined)
  })
})