const form = document.getElementById('jiraForm');
addEventListener('submit', createJiraTask);

async function createJiraTask(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const type = document.querySelector('input[name="type"]:checked').value;
  const summary = document.getElementById('summary').value;
  const url = 'http://localhost:10000';
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
        "name": username
      }
    }
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
	'mode': 'no-cors',
      },
      body: payload
    });

    if (response.ok) {
    const data = await response.json();
    const issueId = data.key;
    const issueLink = data.self;
    const modal = document.getElementById('modal');
	const modalMessage = document.getElementById('modal-message');
	modalMessage.value = `Jira task created successfully!\nIssue ID: ${issueId}\nIssue Link: ${issueLink}`;
	modal.style.display = 'block';

	const closeButton = document.getElementsByClassName('close')[0];
	closeButton.addEventListener('click', closeModal);

	function closeModal() {
 	modal.style.display = 'none';
	}

	modal.addEventListener('click', function (event) {
  		if (event.target === modal) {
    	modal.style.display = 'none';
  	}
});
    } else {
      const error = await response.json();
      alert(`Jira task creation failed: ${error.errors.assignee}`);
    }
  } catch (error) {
    alert(`Jira task creation failed: ${error}`);
  }
}
