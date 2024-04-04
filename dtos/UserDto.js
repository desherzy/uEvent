module.exports = class UserDto {
    id;
    login;
    email;
    profileImage;
    sessionId;
    emailConfirmed;
    notifications;

    constructor(model, sessionId) {
        this.id = model.id;
        this.login = model.login;
        this.email = model.email;
        this.profileImage = model.profile_image;
        this.sessionId = sessionId;
        this.notifications = model.notifications;
        this.emailConfirmed = model.email_confirmed;
    }
}