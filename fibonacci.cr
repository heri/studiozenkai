def fibonacci(n : Int32) : Int32
    return n if n <= 1
    fibonacci(n - 1) + fibonacci(n - 2)
  end
  
  start_time = Time.local
  puts fibonacci(40)
  end_time = Time.local
  puts "Time taken: #{end_time - start_time} seconds"