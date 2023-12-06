// NORMAL JS FILE

$('#commandDiv').terminal({

  help: function () {
    this.echo(
      '\n Commands:' +
      '\n  help : see list of commands' +
      '\n  ask type_of_language_model' +
      '\n  example type_of_language_model' +
      '\n\n Types of Language Model: ' +
      '\n  - ngram' +
      '\n  - rnn' +
      '\n  - lstm' +
      '\n  - transformers' +

      '\n\n V example input V' +
      '\n\n    ask ngram' +
      '\n\n (hint: case sensitive, please type in lower case)' +
      '\n'
    );
  },

  aide: function (input) {
    this.echo(
      '\nAIDE' +
      '\n ' + requestGPT(input),
      console.log(`--POSTED requestGPT`)
    );
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