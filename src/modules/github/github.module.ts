import { Module } from "@nestjs/common";
import GithubProvider from "./github.provider";

@Module({
  providers: [GithubProvider],
  exports: [GithubProvider],
})
class GithubModule {}

export default GithubModule;
