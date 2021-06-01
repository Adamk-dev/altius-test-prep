"# altius-test-prep" 

Ball Clock Problem:

The ball clock is a simple device that keeps track of the passing minutes by moving ball-bearings. Each minute, a rotating arm removes a ball bearing from the queue at the bottom, raises it to the top of the clock, and deposits it on a track leading to indicators displaying minutes, five-minutes, and hours. These indicators display the time between 1:00 and 12:59, but without 'a.m.' or 'p.m.' indicators. Thus 2 balls in the minute indicator, 6 balls in the five-minute indicator, and 5 balls in the hour indicator display the time 5:32.

Operation of the Ball Clock:
Every minute, the least recently used ball is removed from the queue of balls at the bottom of the clock, elevated, then deposited on the minute indicator track, which is able to hold four balls. When a fifth ball rolls onto the minute indicator track, its weight causes the track to tilt. The four balls already on the track run back down to join the queue of balls waiting at the bottom in reverse order of their original addition to the minute's track. The fifth ball, which caused the tilt, rolls on down to the five-minute indicator track. This track holds eleven balls. The twelfth ball carried over from the minutes causes the five-minute track to tilt, returning the eleven balls to the queue, again in reverse order of their addition. The twelfth ball rolls down to the hour indicator. The hour indicator also holds eleven balls but has one extra fixed ball which is always present so that counting the balls in the hour indicator will yield an hour in the range of one to twelve. The twelfth ball carried over from the five-minute indicator causes the hour indicator to tilt, returning the eleven free balls to the queue, in reverse order, before the twelfth ball itself also returns to the queue.

Problem
Programmatically represent the ball clock by ticking off each minute. Assign your tracks, remember the ordering of balls when they return to the “bottom” track. How many days does it take for the balls to be back in the original position?

Your program will be a bit different than the physical clock, start at 00:00 instead of 01:00 (means you don’t have to worry about the “always present” hour ball on the hour track).

Input
Have the user enter in a valid number between 27 - 127 that represents the total number of balls the clock will cycle through. How you ask the user to enter the number is up to you but please indicate those in your instructions.

Output
Display the ball count, the number of days, and the duration of computation in reaching your answer.

Sample Balls and the correct Day count

30 balls take 15 days
45 balls take 378 days"# altius-test-prep" 
