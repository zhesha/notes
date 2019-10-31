import moment from 'moment';
import messages from '../config/messages.config';
import config from '../config';

export default class Note {
  constructor(avatar, name, color, text, date, x, y) {
    this._text = text;
    this._date = date;
    this._name = name;
    this._avatar = avatar;
    this._color = color;
    this._x = x;
    this._y = y;
  }

  get text() {
    return this._text || messages.default.text;
  }

  get date() {
    return moment(this._date).format(config.dateFormat);
  }

  get name() {
    return this._name || messages.default.name;
  }

  get avatar() {
    return this._avatar;
  }

  get color() {
    return this._color || messages.default.color;
  }

  get x() {
    return this._x || 0;
  }

  get y() {
    return this._y || 0;
  }

  asJSON() {
    return {
      text: this._text,
      date: this._date,
      name: this._name,
      avatar: this._avatar,
      color: this._color,
      x: this._x,
      y: this._y
    };
  }

  static fromJSON(data) {
    const { avatar, name, color, text, date, x, y } = data;
    return new Note(avatar, name, color, text, date, x, y);
  }

  static fromState(data) {
    const { gravatar, name, color, text, x, y } = data;
    const trimedText = text.trim();
    return new Note(gravatar, name, color, trimedText, new Date(), x, y);
  }
}
