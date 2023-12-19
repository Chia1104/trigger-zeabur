import { Module } from "@nestjs/common";
import GithubModule from "../github/github.module";
import githubProvider from "../github/github.provider";
import IssueLabelerService from "./issue-labeler.service";
import IssueLabelerController from "./issue-labeler.controller";

@Module({
  imports: [GithubModule],
  providers: [githubProvider, IssueLabelerService],
  controllers: [IssueLabelerController],
})
class IssueLabelerModule {}

export default IssueLabelerModule;
