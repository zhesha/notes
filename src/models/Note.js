import moment from 'moment';
import messages from '../config/messages.config';
import config from '../config';

export default class Note {
  constructor(avatar, name, color, text, date) {
    this._text = text;
    this._date = date;
    this._name = name;
    this._avatar = avatar;
    this._color = color;
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

  asJSON() {
    return {
      text: this._text,
      date: this._date,
      name: this._name,
      avatar: this._avatar,
      color: this._color
    };
  }

  static fromJSON(data) {
    const { avatar, name, color, text, date } = data;
    return new Note(avatar, name, color, text, date);
  }
}
