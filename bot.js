const Discord = require('discord.js'); //implements discord.js library
const bot = new Discord.Client();

bot.on('ready',()=>{
		bot.user.setPresence({ status: 'online', game: { name: 'with some code!' } });
})


bot.on('message', msg =>{//object of type message, named "messsage"

	var prefix = ".";

	if(msg.content.startsWith(prefix)) return;
	if(msg.author === bot.user) return;//This is a check to make sure that the message is coming from a user so the bot does not respond to itself.

		var answers = ['It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes, definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy, try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    'Don\'t count on it',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful'
];//array size 20, index begins at 0
	
	  var jokes = [
      "Two neutrons walk into a bar, and the bartender says, \"No charge for you.\"",
      "What happens when a frog's car breaks down? It gets toad away!",
      "Why did the hipster burn his tongue? He drank his coffee before it was cool.",
      "Two bots walk into a Discord server...I forget the rest."
    ];


	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
 	const cmd = args.shift().toLowerCase();

	if(cmd === 'joke'){
		let i = Math.floor(Math.random()*jokes.length);
		msg.channel.send(jokes[i]);
	}

	else if(cmd === 'greet'){
		msg.channel.send("Hi, "+msg.author.toString()+"!");
	}

	else if(cmd.startsWith("8ball")){
		let i = answers[Math.floor(Math.random()*answers.length)];
		const embed = {//this is an embed object
  "color": 0xffaeff,
  "author": {
    "name": `Magic 8 Ball`,
    "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/2000px-8_ball_icon.svg.png"
  },
  "fields": [
    {
      "name": "The Magic 8 Ball Says...",
      "value": `${i}.`
    }
  ]
};
msg.channel.send({ embed });
	}


	else if(cmd === 'pick'){
		//Implement a pick command.Takes a list of items after !pick and randomly picks one.
		const choices = msg.content.slice(prefix.length).trim().split(",");//requires that the choices be comma separated
	 	const picker = choices.shift().toLowerCase();

		let rand = Math.floor(Math.random()*choices.length);

		let choice = choices[rand];

		msg.channel.send("I choose:"+choice);
	}


	});

bot.login(process.env.BOT_TOKEN);//utilizes login token, config.token is used instead of the actual token
