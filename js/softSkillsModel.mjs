export class SoftSkills {
  constructor() {
    this.events = {};
    this.content = [
      "I do my best to keep myself in a neutral emotional state during coding and problem solving to stay on track and to make the best decisions. In this case it's not about routine tasks where the brain goes on vacation.",
      "I accept the fact that there is always constant change and movement forwards. Today the most popular beer in Bavaria has something around 5% alcohol. Some society changing events happen and two years later everyone at Oktoberfest is enjoying alcohol free beer and chorizos. Augustiner has to react quickly or adiós.",
      "I am fine with the concept of leaving the warm and cozy comfort zone. Exploring new horizons is a core element for every person working in the tech branch.",
      "Last year I started step for step some healthy routines. Months later I was amazed to see all the results of this new lifestyle which are improving every single aspect of my daily wellbeing.",
    ];
    this.current_content = this.content[0];
  }

  /**
   * @param {number} i
   * @returns {string}
   */
  getContentOnIndex(i) {
    if (this.content.length < i) return this.current_content;
    return this.content[i];
  }

  /**
   * @returns {string}
   */
  get current_content() {
    return this._current_content;
  }

  /**
   * @param {string} content
   */
  set current_content(content) {
    this._current_content = content;
    this.emit("new-content", content);
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
