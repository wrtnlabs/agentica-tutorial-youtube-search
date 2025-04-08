import { Agentica } from "@agentica/core";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import typia from "typia";
import { YoutubeSearchService } from "@wrtnlabs/connector-youtube-search";

dotenv.config();

const agent: Agentica<"chatgpt"> = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({ apiKey: process.env.OPENAI_API_KEY! }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "Google Scholar Connector",
      protocol: "class",
      application: typia.llm.application<YoutubeSearchService, "chatgpt">(),
      execute: new YoutubeSearchService({
        serpApiKey: process.env.SERP_API_KEY!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
