class UserModel {
  constructor(data) {
    this.user_id = data.user_id;
    this.role = data.role;
    this.username = data.username;
    this.password_hash = data.password_hash;
    this.subscription_type = data.subscription_type;
    this.session_id = data.session_id;
    this.session_date = data.session_date;
  }

  static fromJSON(data) {
    return new UserModel(data);
  }
}

export default UserModel;
