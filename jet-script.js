const form = document.getElementById('jiraForm');
form.addEventListener('submit', createJiraTask);

async function createJiraTask(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const type = document.querySelector('input[name="type"]:checked').value;
  const summary = document.getElementById('summary').value;
  const url = 'https://issues.redhat.com/rest/api/2/issue';
  const payload = JSON.stringify({
    "fields": {
      "project": {
        "key": "RHCLOUD"
      },
      "issuetype": {
        "name": "Task"
      },
      "priority": {
        "name": "Normal"
      },
      "summary": `${type} | ${summary}`,
      "labels": ["platform-devprod", "merge-request", type.toLowerCase()],
      "assignee": {
        "emailAddress": email
      }
    }
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API-KEY'
      },
      body: payload
    });

    if (response.ok) {
      const data = await response.json();
      const issueId = data.key;
      const issueLink = data.self;
      alert(`Jira task created successfully!\nIssue ID: ${issueId}\nIssue Link: ${issueLink}`);
    } else {
      const error = await response.json();
      alert(`Jira task creation failed: ${error.errors.assignee}`);
    }
  } catch (error) {
    alert(`Jira task creation failed: ${error}`);
  }
}
