![](JET_Logo.png)

# JET (Jira Easy Tasks) Service
JET (Jira Easy Tasks) is a simple web utility that streamlines the process of creating Jira tickets for simple and repetitive engineering tasks. JET eliminates the need to manually fill in all the necessary Jira fields every time you create a ticket, making the task creation process efficient and hassle-free.

## Features

### Easy Ticket Creation
JET offers a simple web form where HCC engineers can quickly enter the necessary details for creating a common Jira ticket. It only requires your Red Hat email address, a quick one-line summary of the task and the selection of one of the four available common task types you're creating.

### Task Type Selection
JET has a quick selection for common Jira types. This ensures that the created tickets are labeled and named correctly, including:
 - Merge requests
 - Maintenance
 - General
 - Toil

### Integration with Jira
JET integrates with issues.redhat.com, utilizing the Jira REST API to create and store the tickets. All created tickets will be directly accessible and visible within the RHCLOUD project. Created tickets have the following details associated with them:
 - Email address (Assignee)
 - Summary (Summary)
 - Ticket Type (Summary and Label)
 
 Default values for all tasks:
  - Project Key = RHCLOUD
  - Issue Type = Task
  - Priority = Normal
  - Label = Platform-devprod

### Sequence
```mermaid
sequenceDiagram
    User->>JET: Enter issue details
    JET->>JET: Store const values
    JET-->>Jira: Pass details
    Jira->>Jira: Issue created
    Jira-->>JET: Respons response
    JET->>User: Issue ID and Link
```
