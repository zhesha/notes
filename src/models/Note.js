import moment from 'moment';

export default class Note {
  constructor(avatar, name, color, text, date) {
    this._text = text;
    this._date = date;
    this._name = name;
    this._avatar = avatar;
    this._color = color;
  }

  get text() {
    return this._text;
  }

  get date() {
    return moment(this._date).format('lll');
  }

  get name() {
    return this._name || 'Anonymous';
  }

  get avatar() {
    return this._avatar;
  }

  get color() {
    return this._color || '888888';
  }
}
