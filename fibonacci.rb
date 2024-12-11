def fibonacci(n)
    return n if n <= 1
    fibonacci(n - 1) + fibonacci(n - 2)
  end
  
  start_time = Time.now
  puts fibonacci(40)
  end_time = Time.now
  puts "Time taken: #{end_time - start_time} seconds"