import { action, makeObservable, observable } from "mobx"

export default class Apple {
  constructor(apple) {
    this.id = apple.id
    this.weight = apple.weight
    this.isEaten = apple.isEaten || false
    makeObservable(this, {
      isEaten: observable,
      modifyIsEaten: action.bound,
    })
  }
  modifyIsEaten() {
    this.modifyIsEaten = true
  }
}
