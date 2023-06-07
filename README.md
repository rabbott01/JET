![](JET_Logo.png)

# JET (Jira Easy Tasks) Service
JET (Jira Easy Tasks) is a simple web utility that streamlines the process of creating Jira tickets for simple and repetitive engineering tasks. It provides an intuitive web form where you can enter your email, summary, select a ticket type, and create Jira tickets with ease. JET eliminates the need to manually fill in the ticket details every time, making the task creation process efficient and hassle-free.

## Features

### Easy Ticket Creation
JET offers a simple web form where HCC engineers can quickly enter the necessary details for creating a common Jira ticket. It only requires your Red Hat email address, a quick one-line summary of the task and the selection of one of the four available common task types you're creating.

### Task Type Selection
JET has a quick selection for common Jira types. This ensures that the created tickets are labled and named correctly, including:
 - Merge requests
 - Maintenance
 - General
 - Toil

### Integration with Jira
JET integrates with issues.redhat.com, utilizing the Jira REST API to create and store the tickets. All created tickets will be directly accessible and visible within the RHCLOUD project. Created tickets have the followig details associated with them:
 - Email address (Assignee)
 - Summary (Summary)
 - Ticket Type (Summary and Label)
 
 Default values for all tasks:
  - Project Key = RHCLOUD
  - Issue Type = Task
  - Priiority = Normal
  - Label = Platform-devprod

