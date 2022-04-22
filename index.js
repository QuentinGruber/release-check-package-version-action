const core = require("@actions/core");
const { context } = require("@actions/github");

async function run() {
  const { title } = context.payload.pull_request;
  const pull_request_version = title.split("/")[1];
  const {version} = require(`${process.env.GITHUB_WORKSPACE}/package.json`)
  if(pull_request_version !== version){
    core.setFailed("The version of the pull request is not the same as the version of the package.json");
    core.setFailed("The version of the pull request is: " + pull_request_version);
    core.setFailed("The version of the package.json is: " + version);
    core.setFailed(`package.json fetched from ${process.env.GITHUB_WORKSPACE}/package.json`);
  }
}


run();
