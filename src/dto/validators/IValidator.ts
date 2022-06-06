export default interface IValidator<Data> {
  Validate(data: any): data is Data
}