
+++
date = "2023-10-06T12:00:00-00:00"
title = "Securing a Rails endpoint"
tags = ['software', 'ruby', 'security']
+++

Here is a typical Rails endpoint:
<!--more-->
```ruby

def update_user
  user = User.find_by(id: params[:id])
  
  if user.update(params[:user])
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end
```

Readable, simple, error handling. But insecure. What can we do?

## 1. **Strong Parameters**

The endpoint allows mass assignement a User record.

Safe attributes prevents this by explicity enumerating attributes that can be safely updated.

```ruby
def update_user
  user = User.find_by(id: params[:id])
  
  if user.update(user_params)
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end

def user_params
  params.require(:user).permit(:name, :email, :password)
end
```

Imagine a field titled `salary` or `super_secret_fees`, that are computed from work hours and company algorithms. Without safe attributes, the current endpoint can set a much higher salary!

## 2. **Authenticate the User**

The endpoint lacks user authentication. Any endpoint that change or delete database records must require some form of secure authentication

```ruby
#   Ensures the user is logged in and valid.
before_action :authenticate_user!

def update_user
  user = current_user
  
  if user.update(user_params)
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end
```

Without authentication, a script can iterate to change all user records.

## 3. **Authorize the Action**

The user might be authentified, but it could be a user without the required role or authorization. 

```ruby
def update_user
  user = current_user
  authorize user

  if user.update(user_params)
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end
```

In this case, the user data should be editable by its owner, the current user. In other cases, you can also allow admins or account manager to administrate data, while still making sure policies are followed

## 4. **Add Input Validation**

The user might bypass the form and send in incorrect input to crash your application, have access to the db, ie look for epxloits.

Inputs should be validated before passing them on

```ruby
def user_params
  params.require(:user).permit(:name, :email, :password).tap do |whitelisted|
    raise ArgumentError, "Invalid name" unless whitelisted[:name].match?(/\A[a-zA-Z]+\z/)
  end
end
```
An alternative to above is to use ActiveRecord validation, if the team also expects to update records through jobs or services.

## 5. **Implement Rate Limiting**

Brute force attacks are performed so your server or your database stop providing its service or leak sensitive information.

For example, if your service provides an essential service to the country's citizen, a state-actor can brute force endpoints so normal users cannot use the service, thereby disrupting essential services.

A gem like Rack::Attack prevents brute force or abuse.

```ruby
# in config/initializers/rack_attack.rb
Rack::Attack.throttle("requests by IP", limit: 5, period: 1.minute) do |req|
  req.ip if req.path == "/users/update" && req.post?
end
```

It is also possible to throttle requests by user, or other parts of the request header. If this is an issue, you can also add dedicated rate limiters in front your system.

## 6. **Sanitize Inputs**

In addition to input validation above, you can take steps so queries do not make the application fail, regardless of user inputs

Converting inputs to string such as below make sure the database doesn't throw an exception.

Also using `find_by` will let Rails fail gracefully

```ruby
def update_user
  user = User.find_by(id: params[:id].to_i)

  if user.update(user_params)
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end
```

## 7. **Restricting verbiose outputs**

`user.errors.full_messages` will tell users about business and data rules.

For example, it migth show all password rules, address requirements, invalid hostnames and more.

Send filtered error messages to prevent hackers knowing the limits of your system.

```ruby
def update_user
  user = User.find_by(id: params[:id].to_i)

  if user.update(user_params)
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.map(&:code).map(&:codebook_to_en) }, status: :unprocessable_entity
  end
end
```

Here, a codebook will translate Rails errors to human-readable messages, while making sure system details are not communicated.

## 8. **Implement CSRF Protection**

Ensure CSRF tokens are verified for API requests.

```ruby
# in ApplicationController
before_action :verify_authenticity_token

# Alternatively, for APIs:
before_action :verify_authenticity_token, unless: -> { request.format.json? }
```

## 9. **Enforce HTTPS**

non-HTTPS requests are not secure and should be rejected
```ruby
# in ApplicationController
before_action :ensure_secure_connection

def ensure_secure_connection
  redirect_to protocol: "https://", status: :moved_permanently unless request.ssl?
end
```


## 10. **Remove Sensitive Data from Logs**

Log files are typically not as well secured as db, yet they might contain sensitive data. You might have a team member who made sent logs to Kibana ES and made them viewable without requiring credentials (ie security by obsfucation)

```ruby
# in config/application.rb:
Rack::Attack.throttle("requests by IP", limit: 5, period: 1.minute) do |req|
  req.ip if req.path == "/users/update" && req.post?
end

Rails.application.config.filter_parameters += [:password, :credit_card]
```
No more passwords in log files!

*Bonust* Monitoring and alerts are not only for devops! Tools like Sentry, DataDog or New Relic allows you to detect unusual patterns such as excessive failed updates. As soon as an application is live, make sure to set these up.

## Final Secured Endpoint:

```ruby

# in config/application.rb:
Rails.application.config.filter_parameters += [:password, :credit_card]


before_action :verify_authenticity_token
before_action :authenticate_user!

def update_user
  user = User.find_by(id: params[:id].to_i)
  authorize user

  if user.update(user_params)
    render json: { success: true, message: "User updated successfully" }
  else
    render json: { success: false, errors: user.errors.map(&:code).map(&:codebook_to_en) }, status: :unprocessable_entity
  end
end

def user_params
  params.require(:user).permit(:name, :email, :password) do |whitelisted|
    raise ArgumentError, "Invalid name" unless whitelisted[:name].match?(/\A[a-zA-Z]+\z/)
  end
end

```
