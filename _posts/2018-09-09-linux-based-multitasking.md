---
layout: post
title: linux-based multitasking
subtitle: this made me understand std::thread
---
For whatever reason, I've always fancied the idea of building a process manager. I have indeed built one, and her name is [Sybil](https://github.com/MattWyatt/sybil-process.manager). Sybil, however, was thrown together for a competition. When creating her, I did a lot of things that would probably be considered bad practice. Regardless, she works well. One of the largest problems I encountered when writing her, however, was the recording of output from processes. I got it to work, but, until looking into it further and writing this article, I had no idea how I did it. After quite the bit of research, and an epiphany regarding how multithreading in C++ works, I've written what appears to be a very coherent process wrapper.

## sybil's predicament
When writing Sybil, I figured I'd just spawn the process and then write its output to a buffer. Sounds easy, right? Well, in terms of code required, it is. Simply spawn the process, redirect its input to a pipe, and read the pipe. The problem, however? `read()` is a blocking call. I could only retrieve the output once the process spawned was over. That's almost completely useless for something like a server where (hopefully) it would not have to end. Sybil needed to be able to report a *continuous* stream of output, even if the process hadn't finished yet.


## sybil's solution
Clearly, if `read()` blocked the current thread, then I'd have to do it in a separate thread. Fair enough, I figured I knew how to write a multithreaded application in C++. I didn't. I had gotten the hang of creating a thread, that wasn't too hard.
```cpp
/*
 * listen for whatever reason this works, so don't touch it.
 * if you pass the sybling as a reference, instead of as the object itself,
 * then nothing gets deleted
 */
void sybling::read_thread(sybling* o) {
    std::thread reader(&sybling::read_process, o);
    reader.detach();
    o->_read_thread_running = true;
}
```
By the comments, it's clear that I had almost no idea what I was doing. Any experienced C++ developer, at this point, would probably shout, "why are you detaching the thread?!?!?!". Their question would be well-placed. Why was I detaching the thread? This is where I admit to what is probably my dumbest mistake in programming yet. For whatever reason, I thought that creating a thread didn't spawn it simultaneously. I thought that after creating a `std::thread`, you had to call either `join()` or `detach()` to make it do anything. `join()` seemed like a completely useless method to me. Why would I want to create a different thread just to have it block the main one? In hindsight, I'm not really sure how I came to this conclusion; the C++ website itself shows the behavior of threads to, very clearly, work unlike this. Regardless, this *did* indeed work. I did not know why, and I knew there was a better way that was incomprehensible to me.

## an updated solution
After I *actually* understood how thread objects work, I decided to rewrite a new and updated process handler proof-of-concept. Among the minor changes: the `process` class stores a static vector to hold all the reader threads created, `exit_processes()` must be called to join all the reader threads to ensure they're close successfully, and simple functions are supported as well. The methods for actually creating the process and redirecting the input remain the same as Sybil's methods. The read thread itself, however, differs beautifully.
```cpp
/* create the read thread and push it back */
_readers.emplace_back(std::thread([this]() {
    /* block and read every character from stdin individually
     * then push it back to the output buffer */
    char buffer;
    while (read(_pipe.oread(), &buffer, 1) > 0) {
        _output += buffer;
    }
}));
```
The following code block is heavily documented, and shows exactly the process of creating a process. (heh)
```cpp
/* create a process object with a function*/
process p([]() {
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "hello, multitasking!" << std::endl;
});

/* begin execution 
 * the process object will store the task's output
 * even if the task is not completed yet */
p.execute();


std::cout << "process created!" << std::endl;

/* perform some task in the frontend that may take a bit */
std::cout << "working on other things for a bit..." << std::endl;
std::this_thread::sleep_for(std::chrono::seconds(2));

std::cout << "done working. earlier process is finished by now.\noutput: " << std::endl;

/* grab the output of the process, even though it may not be over yet */
std::cout << p.output();

/* ensure that before we exit, we exit all the created processes */
process::exit_processes();
return 0;
```
The full project and documentation (which is just comments) can be found [here](https://github.com/MattWyatt/multitasking-concept)