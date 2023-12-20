import { Controller, Get } from "@nestjs/common";
import { InjectGithub } from "../github/github.provider";
import { Github, events } from "@trigger.dev/github";
import { InjectTriggerDevClient } from "@trigger.dev/nestjs";
import { type TriggerClient } from "@trigger.dev/sdk";

@Controller("/github/issue-labeler")
class IssueLabelerController {
  constructor(
    // @InjectGithub() private readonly github: Github,
    @InjectTriggerDevClient() private readonly client: TriggerClient
  ) {
    const github = new Github({
      id: "github",
      token: process.env.GITHUB_TOKEN,
    });
    this.client.defineJob({
      id: "github-integration-on-issue-opened",
      name: "GitHub Integration - On Issue Opened",
      version: "0.1.0",
      enabled: true,
      integrations: { github },
      trigger: github.triggers.repo({
        event: events.onIssueOpened,
        owner: "Chia1104",
        repo: "trigger-zeabur",
      }),
      run: async (payload, io, ctx) => {
        await io.github.addIssueAssignees("add assignee", {
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          // @ts-expect-error
          issueNumber: payload.issue.number,
          assignees: ["Chia1104"],
        });

        await io.github.addIssueLabels("add label", {
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          // @ts-expect-error
          issueNumber: payload.issue.number,
          labels: ["bug"],
        });

        return { payload, ctx };
      },
    });
  }

  @Get()
  labelIssues() {
    return `Running Trigger.dev with client-id ${this.client.id}`;
  }
}

export default IssueLabelerController;
