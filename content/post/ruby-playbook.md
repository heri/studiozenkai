+++
date = "2022-02-01T12:00:00-00:00"
title = "Ruby Playbook"

+++

I was introduced to the idea of playbook, which is basically a recipe to win a case. It can be in a team sports situation, such as how to score in American football in a given situation. It can be used by a salesperson, such as how to win a commercial contract.

I imagined what would be my Ruby Engineering playbook:

* Focus on hard projects that move the needle in the long-term, or alternatively easy wins (less than a day to implement+deploy)
* Do not reinvent the wheel. Research different approaches before trying to come up with your design. Reuse when possible
* Have a log(n) or faster implementation, as if you had a CPU from last century
* Succinctness is underrated ! Remove as much as possible, Introduce only what's needed to make it work, as if keystrokes were a limited resource, and copy/paste did not exist.
* You should be able to explain your design or algorithm orally to another person, without them able to see any code
* Do not create side-effects in other people's work. Assume future maintainers won't be smart so make your implementation idiot-proof
* Before committing, ask if it is the best you can commit
* Increase test cooverage
* Always run linting / test suite before commit

Note : this is a WIP