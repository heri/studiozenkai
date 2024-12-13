+++
date = "2022-09-13T12:00:00-00:00"
title = "eval : a security catastrope in waiting"
tags = ['software', 'ruby', 'security']
+++

eval is one of Ruby's most powerful methods. It’s also one of its most dangerous. When you use eval, you’re telling Ruby to treat a string as code and execute it. This opens the door to flexibility — but also to catastrophe.

<!--more-->

In Rails, you might find eval used in controllers, views, or even models. Sometimes, teams reach for it to solve challenging business requests in what is deemed "a simple way". Let’s explore why this is dangerous and how to prevent it.


```ruby
def execute_dynamic
  command = params[:command]
  eval(command)  # Executes whatever the user provides
end
```

A team can add `eval` for:

* Dynamic Behavior: Business Teams tell developers they have a technical background after their coding crash course and want views to behave dynamically, e.g. to output dynamic reports. They present it often as a win-win scenario, where business get powerful features, and developers ship with less time.
* Quick Prototyping: Developers might reach for eval during a rush, intending to "clean it up later."
* Lack of Awareness: Some may not fully understand the risks or inherit legacy codebases that already use eval.

## The Dangers of eval

1. Code Injection

When you use eval, you’re effectively letting attackers run arbitrary code. Imagine this input:
```ruby
params[:command] = "rm -rf /"
```
A bit cliché, but you see the issue. This destroys all data. Other commands compromise servers, or expose sensitive information.

2. Performance Issues

eval slows your application because it forces Ruby to recompile code at runtime. Overuse cripple performance.

3. Hard-to-Debug Code

Code that relies on eval is harder to read, test, and debug. A nightmare for future maintainers!

## How do you avoid eval?

You can refactor to use safer, more explicit alternatives:

 Instead of this:
```ruby
def execute_dynamic
  eval(params[:command])
end
```
 Do this:
```ruby
def execute_dynamic
  commands = {
    'hello' => -> { puts 'Hello, world!' },
    'goodbye' => -> { puts 'Goodbye, world!' }
  }

  command = commands[params[:command]]
  command.call if command
end
```

If you absolutely must process user input, sanitize it is an option:
```ruby
def safe_eval(expression)
  safe_methods = %w[+ - * /]
  raise "Unsafe expression" unless expression.match?(/^[0-9#{safe_methods.join}]+$/)

  eval(expression)
end
```
This limits the kind of input users can provide.

Personally, I also find dynamic templates [such as a Liquid](https://shopify.github.io/liquid/) a great compromise. Liquid can do string, array and number transformation, supports operators/conditions and iterations. Liquid will NOT execute a command, call a library or query the db, but that is the point. All you have to do is put a system for business people to edit or upload liquid templates.

When done, enable strong RuboCop rules to prevent eval from sneaking back into your repo:
```ruby
# .rubocop.yml
Lint/Eval:
  Enabled: true
```
Your CI pipeline will then flag any future use of eval.

But it is not just eval. Make sure to establish a culture of strong security reviews. Add security scanners.

Ad don't forget, eval is like giving your app a loaded gun. It might do the job, but it’s far too easy to shoot yourself — or worse, your users !
