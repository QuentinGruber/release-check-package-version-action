const core = require("@actions/core");
const { context } = require("@actions/github");
const path = require("path");

async function run() {
  if (context.payload.pull_request) {
    const { title } = context.payload.pull_request;
    if(!title.toLowerCase().includes("release")) {
      console.log("Not a release PR");
      return;
    }
    const pull_request_version = title.split("/")[1];
    let dir = process.env.GITHUB_WORKSPACE;
    const packagePath = path.join(dir, "package.json");
    console.log("Load package version from " + packagePath);
    const version = require(packagePath).version;
    if (pull_request_version !== version) {
      core.setFailed(
        "The version of the pull request is not the same as the version of the package.json"
      );
      core.setFailed(
        "The version of the pull request is: " + pull_request_version
      );
      core.setFailed("The version of the package.json is: " + version);
    }
  }
  else{
    console.log("No pull request");
  }
}

run();
