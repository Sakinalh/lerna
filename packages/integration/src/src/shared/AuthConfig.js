const baseCFG = {
  Common: {
    "Auth": {
      "identityPoolId": "xx-xxxx-x:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "region": "xx-xxxx-x",
      "userPoolId": "xx-xxxx-x_xxxxxxxxx",
      "userPoolWebClientId": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
      "authenticationFlowType": "USER_SRP_AUTH"
    }
  }
};

switch (document.domain) {
  default:
    baseCFG.Common.Auth.identityPoolId = "eu-west-1:bb00586a-6c03-49d3-a2ed-e4dcb8826354";
    baseCFG.Common.Auth.region = baseCFG.Common.Auth.identityPoolId.split(":")[0];
    baseCFG.Common.Auth.userPoolId = "eu-west-1_usNi68Yhg";
    baseCFG.Common.Auth.userPoolWebClientId = "35qsrhjqa8tr6u28qtkdggctjq";
}

export default baseCFG;