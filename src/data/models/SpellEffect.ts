export default class SpellEffect {
  private readonly type: string
  private readonly params: any[]
  
  constructor(type: string, params: any[]) {
    this.type = type
    this.params = params
  }
  
  Type(): string {
    return this.type
  }
  
  Params(): any[] {
    return this.params
  }
}