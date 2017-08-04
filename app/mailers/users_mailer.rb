class UsersMailer < ApplicationMailer
  def deleted_user(user)
    @user = user
    admins = User.where(admin: true)

    mail(
      to: admins[0].email,
      subject: "User #{user.first_name.capitalize} #{user.last_name.capitalize} has deleted the user's account."
    )
  end
end
