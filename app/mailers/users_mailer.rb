class UsersMailer < ApplicationMailer
  def deleted_user(user)
    @user = user
    admins = User.where(admin: true)

    mail(
      to: admins[0].email,
      subject: "User #{user.first_name.capitalize} #{user.last_name.capitalize} has deleted the user's account."
    )
  end

  def new_job_application(job_application)
    @job_application = job_application
    admins = User.where(admin: true)
    emails = ''
    admins.each do |admin|
      emails << "#{admin.email} , "
    end

    mail(
      to: emails,
      subject: "New job application for #{job_application.first_name.capitalize} #{job_application.last_name.capitalize} was just submitted"
    )
  end
end
