export class AboutMe {
  /**
   * @param {string} pic
   */
  constructor(pic) {
    this.events = {};
    this.pictures = [
      "./assets/img/mememe.jpg",
      "./assets/img/li-1.jpg",
      "./assets/img/li-2.jpg",
      "./assets/img/li-3.jpg",
      "./assets/img/li-4.jpg",
    ];
    this.current_content = pic;
  }

  /**
   * @param {number} i
   * @returns {string}
   */
  getContentOnIndex(i) {
    if (this.pictures.length < i) return "./assets/img/mememe.jpg";
    return this.pictures[i];
  }

  /**
   * @returns {string}
   */
  get current_content() {
    return this._current_content;
  }

  /**
   * @param {string}
   */
  set current_content(pic) {
    this._current_content = pic;
    this.emit("new-pic", pic);
  }

  /**
   * @param {string} eventName
   * @param {Function} cb
   */
  on(eventName, cb) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(cb);
  }

  /**
   * @param {string} eventName
   * @param {*=} param
   */
  emit(eventName, param) {
    if (eventName in this.events) {
      for (const f of this.events[eventName]) {
        f(param);
      }
    }
  }
}
