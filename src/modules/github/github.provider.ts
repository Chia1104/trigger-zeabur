import { type FactoryProvider } from "@nestjs/common";
import { Github } from "@trigger.dev/github";
import { Inject } from "@nestjs/common";

export const GITHUB_PROVIDER = "GITHUB_PROVIDER";

export const InjectGithub = () => Inject(GITHUB_PROVIDER);

export default {
  provide: GITHUB_PROVIDER,
  useFactory: () => {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN environment variable is not set");
    }
    return new Github({
      id: "github",
      token: process.env.GITHUB_TOKEN,
    });
  },
} satisfies FactoryProvider;
