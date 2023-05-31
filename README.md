The project that represents the final work of the training in the Belgrade Institute of Technology

DESCRIPTION

Client web app system for tracking job interviews. 
The system needs to track information about Companies, Candidates and Interviews.

A single Candidate can have an Interview scheduled with one or more Companies. 
Once the Candidate is involved in an Interview with the sample Company, it can go through several
phases. After each phase, a new report is entered into the system.

Each Interview Report must have a flag if the Candidate has passed/not passed the current
phase of the Interview.
Only if the Candidate has passed the current phase, a report for the next phase can be added.

Candidates and Interview Reports overview

-List of Candidates (landing page)and Candidate Reports Page

Administrative Panel

-Report List and Submit Report Page

IMPLEMENTATION

Frontend: React framework 

Backend: 
Reports API
As for the interview report API, the local web server IS used.
https://github.com/nenadbugaric/interviews-reports-api-mock/ 

