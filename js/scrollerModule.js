class Member {
  constructor() {
    this.scroller_id = "";
    this.scroller_name = "";
    this.scroll_quest_completed = false;
    this.member = false;
    this.timestamps = [`${snapMoment()} / Entry`];

    this.events = {};
  }

  /**
   * set all the Member's props
   * @param {Member} member
   */
  init(member) {
    this._scroller_id = member.scroller_id;
    this._scroller_name = member.scroller_name;
    this._scroll_quest_completed = member.scroll_quest_completed;
    this._member = member.member;
    this._timestamps = member.timestamps;
  }

  /**
   * @returns {string} firebase generated user id
   */
  get scroller_id() {
    return this._scroller_id;
  }

  /**
   * @returns {string} scroller club name
   */
  get scroller_name() {
    return this._scroller_name;
  }

  /**
   * @returns {boolean} scroll to the bottom
   */
  get scroll_quest_completed() {
    return this._scroll_quest_completed;
  }

  /**
   * @returns {boolean} rules accepted?
   */
  get member() {
    return this._member;
  }

  /**
   * @returns {[]}
   */
  get timestamps() {
    return this._timestamps;
  }

  /**
   *
   * @returns {Object} everything for localStorage
   */
  getAllProps() {
    const all = {};
    all.scroller_id = this._scroller_id;
    all.scroller_name = this._scroller_name;
    all.scroll_quest_completed = this._scroll_quest_completed;
    all.member = this._member;
    all.timestamps = this._timestamps;
    return all;
  }

  /**
   * @param {string} id
   */
  set scroller_id(id) {
    this._scroller_id = id;
  }

  /**
   * @param {string} name
   */
  set scroller_name(name) {
    this._scroller_name = name;
  }

  /**
   * @param {boolean} completed
   */
  set scroll_quest_completed(completed) {
    this._scroll_quest_completed = completed;
  }

  /**
   * @param {boolean} membership
   */
  set member(membership) {
    this._member = membership;
  }

  /**
   * @param {[]} timestamps
   */
  set timestamps(timestamps) {
    this._timestamps = [...timestamps];
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

  /**
   * @param {string} section_id
   */
  addTimestamp(section_id) {
    const timestamp = `${snapMoment()} / ${section_id}`;
    this.timestamps.push(timestamp);
    this.emit("add-timestamp", timestamp);
  }

  completeQuest() {
    this.scroll_quest_completed = true;
    this.emit("quest-completed", true);
  }

  setMembership() {
    this.member = true;
    this.emit("got-membership", true);
  }
}

function snapMoment() {
  const moment = new Date();
  return (
    moment.getFullYear() +
    "." +
    `${moment.getMonth() + 1}` +
    "." +
    moment.getDate() +
    " / " +
    moment.getHours() +
    ":" +
    moment.getMinutes() +
    ":" +
    moment.getSeconds() +
    ":" +
    moment.getMilliseconds()
  );
}

export { Member };
