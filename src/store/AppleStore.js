import { action, computed, makeObservable, observable } from "mobx"
// import AppleItem from "./AppleItem"

export default class AppleStore {
  constructor() {
    this.apples = [
      {
        id: 0,
        weight: 233,
        isEaten: false
      },
      {
        id: 1,
        weight: 235,
        isEaten: true
      },
    ]
    this.newAppleId = this.apples.length
    this.isPicking = false
    this.buttonText = '摘苹果'

    makeObservable(this, {
      apples: observable,
      currentApples: computed,
      newAppleId: observable,
      isPicking: observable,
      buttonText: observable,
      pickApple: action.bound,
      eatApple: action.bound,
      appleStatus: computed,
    })
  }

  eatApple(appleId) {
    let targetIndex = '';
    this.apples.forEach((apple, index) => {
      if (apple.id === appleId) {
        targetIndex = index
      }
    });
    if (targetIndex !== '') {
      this.apples[targetIndex].isEaten = true;
    }
  }

  pickApple() {
    /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
    if (this.isPicking) {
      return;
    }

    this.isPicking = true;
    this.buttonText = '正在采摘...';
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .then(res => {
        /** 备注这里的url只是测试用的，这个是之前hackernews的api, 这里只是确保接口是通的，至于数据还是自己mock */
        let weight = Math.floor(200 + Math.random() * 50);
        this.isPicking = false;
        this.buttonText = '摘苹果';
        this.apples.push({
          id: this.newAppleId++,
          weight: weight,
          isEaten: false
        });
      });
  }

  get currentApples() {
    return this.apples.filter(apple => !apple.isEaten)
  }

  get appleStatus() {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      }
    };
    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
      status[selector].quantity++;
      status[selector].weight += apple.weight;
    });
    return status;
  }
}
