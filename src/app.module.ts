import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TriggerDevModule } from "@trigger.dev/nestjs";
import { AppController } from "./app.controller";
import IssueLabelerController from "./modules/issue-labeler/issue-labeler.controller";
import GithubModule from "./modules/github/github.module";
import GithubProvider from "./modules/github/github.provider";

@Module({
  imports: [
    // GithubModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TriggerDevModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        id: "my-nest-app",
        apiKey: config.getOrThrow("TRIGGER_API_KEY"),
        apiUrl: config.getOrThrow("TRIGGER_API_URL"),
        verbose: false,
        ioLogLocalEnabled: true,
      }),
    }),
  ],
  providers: [],
  controllers: [AppController, IssueLabelerController],
})
export class AppModule {}
