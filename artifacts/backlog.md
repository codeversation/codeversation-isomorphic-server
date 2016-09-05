# Codeversation
[[ Alex Aralis, Patricia Chun, Jeremy Lehman, Zach Perry ]]

## Problem Statement 
There are many obstacles to code debugging. Codeversation is a website that facilitates live collaboration on code snippets with instant feedback in the form of evaluation.  The history of a codeversation will be conveniently exposed using Git diffs and branching to show who changed what and in what order.

## Background Information 
Many sites offer complex, cumbersome ways of tracking projects with Git or other SVC software. Codeversation will be different because it does not aim to track huge software repos, with multiple files and directories. Instead Codeversation is targeted at short code “snippets”. Because of the reduced scope a codeversation can be lightweight and fast, simple and easy for anyone to intuitively understand. Codeversation is for anyone who wants to collaboratively debug, improve, or learn about code.

### Audience: 
At this point in time, it can be difficult to get live help with your code without having someone sitting right next to you to guide you. With our platform, anyone will be able to get help with their program as they code it.

### Similar Applications: 
Stackoverflow has a commenting and code assistance platform, but no live editing. Another program called Collabedit has code syntax highlighting and remote collaboration, but no way to receive help with your code. Although these applications perform some of the tasks we want for our platform, neither does it all.

### Existing Limitations: 
Currently, there are platforms for group work, compilation, online coding, and help with your code. But there is nothing that combines these aspects. Our platform will bridge this gap to allow users to get real-time feedback on their code online, and track the changes they’ve made, or other users have made, to better understand solutions. 

# Requirements (Backlog) 

## Functional
1. As a user, I would like to post programming-related questions.
- As a user, I would like to have a specific username when I post my question.
- As a user, I would like to see things that other users have posted.
- As a user, I would like to edit another user’s code by commenting.
- As a user, I would like to delete my post.
- As a user, I would like to be able to compile my code in the browser.
- As a user, I would like to see the changes in the code as it is edited.
- As a user, I would like to see nested comments (if time allows).
- As a user, I would like to log in to save my information and post history (if time allows).
- As a user, I would like to see and make comments about the code.
- As a user, I would like to use any programming language I prefer.
- As a user, I would like to share my question via a web link.
- As a user, I would like to have onboarding for the app.
- As a user, I would like to anonymously browse posts and comments.
- As a user, I would like to save other user’s posts and comments.
- As a user, I would like to flag comments and posts for inappropriate content.
- As a user, I would like to select an comment or post as a solution.
- As a user, I would like a dashboard/front page of popular posts (if time allows).
- As a user, I would like to tag my post.
- As a user, I would like to see other posts related to mine.
- As a user, I would like to choose tags I am interested in.
- As a user, I would like to block other users.
- As a user, I would like to have private Conversations.
- As a user, I would like there to be specific moderators.
- As a user, I can change the theme
- As a user, I can get email updates (if time allows)

## Non-Functional
1. Must be able to be used on Android (if time allows)
- Must be able to be used on iOS (if time allows)
- Must be deployed on production server
- Must use Oauth integration with github for authentication (if time allows)
- Integrate with stack overflow (if time allows)
- Must be run on an Isomorphic server (server side rendering).

