const core = require("@actions/core");
const { getOctokit, context } = require("@actions/github");
const fs = require("fs");

async function run() {
  const repo_token = core.getInput("repo-token");
  const github = getOctokit(repo_token);
  // Get informations from the context of the action
  const { title } = context.payload.pull_request;
  const pull_request_version = title.split(" ")[1];
  const {version} = require("/github/workspace/package.json")
  if(pull_request_version !== version){
    core.setFailed("The version of the pull request is not the same as the version of the package.json");
  }
}


run();
