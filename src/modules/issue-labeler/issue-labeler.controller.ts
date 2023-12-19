import { Controller, Get } from "@nestjs/common";
import IssueLabelerService from "./issue-labeler.service";

@Controller("/github/issue-labeler")
class IssueLabelerController {
  constructor(private readonly issueLabelerService: IssueLabelerService) {}

  @Get()
  labelIssues() {
    return this.issueLabelerService.run();
  }
}

export default IssueLabelerController;
