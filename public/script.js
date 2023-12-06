// NORMAL JS FILE
// let gptRes = ''

$('#commandDiv').terminal({

  help: function () {
    this.echo(
      '\n Type: aide "[soemthing you want to ask]"',
      '\n '
    );
  },

  aide: async function (input) {
    let gptRes = await requestGPT(input)
    this.echo(
      '\nAIDE' +
      '\n ' + gptRes,
      '\n',
      console.log(`--POSTED requestGPT`)
    );
    console.log(gptRes)
  },

}, { greetings: 'Welcome. Type \'help\' for command list' });

async function requestGPT(input) {
  console.log(`--resuptGPT started --input: ${input}`)
  const response = await fetch('/submit', {
    method: 'POST',
    // we are doing a post request
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input })
  });

  if (response.ok) {
    console.log("--GPT response OK");

    const jsonData = await response.json();
    const gptResponse = jsonData.gpt;
    console.log(gptResponse);


    return gptResponse
  } else {
    return "Error in submitting data."
  }
}

