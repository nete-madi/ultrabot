const Discord = require('discord.js'); //implements discord.js library
const bot = new Discord.Client();

bot.on('ready',()=>{
		bot.user.setPresence({ status: 'online', game: { name: '!help for command list' } });
})

var http = require("http");
setInterval(function() {
    http.get("http://ultra-bot-.herokuapp.com");
}, 300000); //pings bot every 5 minutes to make sure it stays online


bot.on('message', msg =>{


	var prefix = "!";

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
	'Two Discord bots walk into a server... I forget the rest.',
	'What happened when the frog\'s car broke down? It got toad!',
	'Why did the hipster burn his tongue? He drank his coffee before it was cool.',
	'Two neutrons walk into a bar, and the bartender says, \"No charge for you.\"',
	'How do you leave an idiot in suspense?'
];



	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
 	const cmd = args.shift().toLowerCase();

	switch (cmd) {
  case "joke" :
		let i = Math.floor(Math.random()*jokes.length)
    msg.channel.send(jokes[i]);
    break;

  case "greet" :
    msg.channel.send("Hi, "+msg.author.toString()+"!");
    break;

	case "8ball":
		let j = answers[Math.floor(Math.random()*answers.length)];
		const ball = {//this is an embed object
		"color": 0xffaeff,
		"author": {
		"name": `Magic 8 Ball`,
		"icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/2000px-8_ball_icon.svg.png"
			},
		"fields": [
			{
				"name": "The Magic 8 Ball Says...",
				"value": `${j}.`
			}
		]
		};
		msg.channel.send({embed:ball});
		break;

	case "pick":
		const choices = msg.content.slice(prefix.length).trim().split(",");//requires that the choices be comma separated
		const picker = choices.shift().toLowerCase();

		let rand = Math.floor(Math.random()*choices.length);
		let choice = choices[rand];

		msg.channel.send("I choose:"+choice);
		break;

		case "help":
			const help = {
			"color": 0xffaeff,
			"author": {
			"name": "UltraBot Command List",
			"icon_url":`${bot.user.avatarURL}`
				},
			"fields": [
				{
					"name": "!greet",
					"value":"Say hello!"
				},
				{
					"name": "!joke",
					"value":"UltraBot will tell you a joke."
				},
				{
					"name": "!8ball",
					"value":"Consult the Magic 8 Ball gods with a question."
				},
				{
					"name": "!pick",
					"value":"Picks among a list of comma separated objects."
				},
				{
					"name": "!userinfo",
					"value":"Returns information about the user."
				}
			]
			};
			msg.channel.send({embed:help});
			break;


	case "userinfo":
		let info = {
		  "color": 0xffaeff,
			"author": {
				"name": `User Information for ${msg.author.username}.`,
				"icon_url": `${bot.user.avatarURL}`
				},
				"thumbnail":{
					"url": `${msg.author.avatarURL}`
				},
		  "fields": [
		    {
		      "name": "Username: ",
		      "value": `${msg.author.username}#${msg.author.discriminator}`
		    },
		    {
		      "name": "User ID: ",
		      "value": `${msg.author.id}`
		    },
		    {
		      "name": "Status: ",
		      "value": `${msg.author.presence.status}`,
		      "inline": true
		    }
		  ]
		};

			msg.channel.send({ embed:info });
			break;

		}//end of switch block

	});

bot.login(process.env.BOT_TOKEN);
