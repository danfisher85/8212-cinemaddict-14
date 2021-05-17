import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments.slice();

    this._notify(updateType);
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update, comment) {
    this._comments = [
      comment,
      ...this._comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, commentId) {
    const count = this._comments.length;
    this._comments = this._comments.filter((comment) => comment.id !== commentId);

    if (count === this._comments.length) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._notify(updateType);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        emoji: comment.emotion,
      },
    );

    delete adaptedComment.emotion;

    return adaptedComment;
  }
}
