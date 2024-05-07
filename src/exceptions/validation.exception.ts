export class ValidationException {
  constructor(public readonly errors: Record<string, any>) {}
}
