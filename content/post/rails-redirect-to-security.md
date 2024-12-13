
+++
date = "2023-08-04T12:00:00-00:00"
title = "Open Redirects in Rails"
tags = ['software', 'ruby', 'security']
+++

Ruby On Rails makes things easy. Sometimes, too easy. That’s the problem with `redirect_to params[:url]`.

<!--more-->

Let’s say you want to send them somewhere. You write this:

```ruby
def one_method
  #
  # do stuff here
  #
  redirect_to params[:url]
end
```

It passes tests. Your team is happy. The users are happy. 

## The Problem

Imagine this: an attacker sends your user a link. The link looks legit. But it’s this:

```
https://yourapp.com/one_method?url=https://attacker-site.com
```

The user clicks. Your app sends them straight to the attacker’s site. Now, anything is possible. The attacker steals data. Phishes credentials. All because of your redirect_to.

This is an open redirect vulnerability.

## A Simple Fix

The fix is easy. Validate user input:

```ruby
def one_method
  safe_urls = ["https://trusted-site.com", "https://another-safe-site.com"]
  url = params[:url]

  if safe_urls.include?(url)
    redirect_to url
  else
    # consider logging the invalid url here
    redirect_to root_path, alert: "Invalid URL"
  end
end
```
Now, the user gets an alert.

You can also lookup the host:

```ruby
require 'uri'
# can be set in config file or environment variavbles
ALLOWED_HOSTS = ["trusted-site.com", "another-safe-site.com"]

def one_method
  
  url = params[:url]

  uri = URI.parse(url)
  if ALLOWED_HOSTS.include?(uri.host)
    redirect_to url
  else
    # consider logging url here
    redirect_to root_path, alert: "Invalid URL"
  end
rescue URI::InvalidURIError
  redirect_to root_path, alert: "Invalid URL"
end

```

Another way to avoid the pitfall is Rails' `url_for` 

```ruby
def go_somewhere
  url = params[:url]

  begin
    redirect_to url_for(url)
  rescue ArgumentError
    redirect_to root_path, alert: "Invalid URL"
  end
end
```

This catches common errors

Open redirects is small thing. But it is still a thing, that even Senior Developers miss. Don't leave it to chance. 

Remember: if your app redirects users straight to a phishing site, it’s like inviting Loki to handle customer support—chaos is guaranteed, and no one’s getting their data back.

