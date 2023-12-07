// NORMAL JS FILE
// let gptRes = ''

$('#commandDiv').terminal({

  help: function () {
    this.echo(`
      \n Type: aide "soemthing you want to ask"
      \n Hint: don't forget ""
      \n Example input: aide "What does AIDE stands for?"
      \n`
    );
  },

  aide: async function (input) {
    this.echo('(it might take up to 10 second for AIDE to process, please be patient c:)');
    let gptRes = await requestGPT(input)
    this.echo(
      '\nAIDE' +
      `\n ${gptRes} \n`,
      console.log(`--POSTED requestGPT`)
    );
    console.log(gptRes)
  },

}, { greetings: 'Welcom to AIDE Terminal\nType: aide "something you want to ask" \nType: help for more detail instruction\n' });

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

