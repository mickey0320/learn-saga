class Channel {
  currentTask = [];
  constructor() {
    this.currentTask = [];
  }
  take(actionType, taker) {
    taker.actionType = actionType;
    taker.cancel = () => {
      this.currentTask = this.currentTask.filter((t) => t !== taker);
    };

    this.currentTask.push(taker);
  }
  put(action) {
    this.currentTask.forEach((taker) => {
      if (taker.actionType === action.type) {
        taker.cancel();
        taker(action);
      }
    });
  }
}

export default Channel;
