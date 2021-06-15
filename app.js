require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
// const NOM_MISSION = /\[GIE\]\[(\d+|\d+\-\d+)\]\w+\[\w+\]-\[(MR|MD)\]\-v\d+.+/gm; // GIE-NBJOUEURSMAX-Nom_mission-MM-MR-vX.map
const NOM_MISSION = /GIE-\d+-\w+-\w+-(MR|MD)-v\d\..+\.pbo/mi
const dl = require('./download');

bot.login(TOKEN);

bot.on('ready', function () {
    console.log(`Connecté en tant que ${bot.user.tag}`);
    bot.user.setActivity('le GIE || #help', { type: 'WATCHING' });
});

bot.on('message', message => {

    if (message.author.bot) {
        return;
    }

    /** DEV */
    if (message.channel.id == process.env.CHANNEL_TEST && message.author.username == "Morbakos" && message.attachments.first()) {

        if (NOM_MISSION.exec(message.attachments.first().name)) {
            // console.log(message.attachments.first());
            console.log("Regex OK");

            var missionName = message.attachments.first().name.split('-');
            missionName = missionName[2] + '-' + missionName[5].split('.')[0];
            if (!dl.download(message.attachments.first().url, missionName)) {
                message.author.send(`Bonjour ${message.author.username}. Il y a eu une erreur lors du téléchargement de ta mission. merci de réessayer.`);
            }

        } else {
            console.log("Regex pas ok");
        }
        return;
    }

    var begin = message.content.substring(0, 1);
	if (begin != process.env.PREFIX) {
		return;
	}

	if (message.channel.id == "567050320753197094" && !(message.content.startsWith(process.env.PREFIX)) && !(message.member.roles.cache.some(role => role.name.toLowerCase() === "admin"))) {
        if (message.channel.id == "567050320753197094" && !(message.content.startsWith(process.env.PREFIX)) && !(message.member.roles.cache.some(role => role.name === "admin"))) {
            message.delete({ timeout: 1 });
            message.author.send(`Bonjour ${message.author.username}. J'ai supprimé ton message dans le canal mission afin d'éviter le flood dans ce channel. Je t'invites à reposter ton message dans le channel approprié.Ton message était:\n\`\`\`${message.content}\`\`\``);
            console.log(`[WARNING] Suppression du message de ${message.author.username} dans le channel ${message.channel.name}`);
            return;
        }        
    }

	console.log("done");

	var cmd = message.content.split(' ')[0].substring(1);
	switch (cmd) {
		case 'modset':
			modset(message);
			break;

		case 'mm':
			missionMaking(message);
			break;

		case 'serveur':
			serveur(message);
			break;

		/*case 'changelog':
				message.delete({timeout: 0});
				changelog(message);
				break;*/

		case 'mission':
			message.delete({ timeout: 1 });
			mission(message);
			break;

		case 'help':
			message.delete({ timeout: 1 });
			help(message);
			break;

		case 'h&m':
			message.delete({ timeout:1 });
			hm(message);
			break;

		default:
			message.channel.send('Aucune commande trouvée. Êtes-vous sûr de l\'avoir bien écrite ?');
			break;
	}
});

function help(message) {

    var description = `Salut ${message.author.username}! Voici les infos sur les commandes disponibles :slight_smile:`

    const embedReponse = {
        color: 0xEB4034,
        title: 'Commandes de GIE-staff',
        url: 'https://gie.polygames.net/',
        author: {
            name: 'GIE',
            icon_url: bot.user.avatarURL(),
            url: 'https://gie.polygames.net',
        },
        description: description,
        thumbnail: {
            url: bot.user.avatarURL(),
        },
        fields: [
            {
                name: '#modset',
                value: "Toutes les infos concernant le modset du GIE"
            },
            {
                name: "#mm",
                value: "Un mini site made by Pipper pour apprendre à faire des missions"
            },
            {
                name: "#serveur",
                value: "Les infos sur nos serveurs"
            },
            {
                name: "#mission",
                value: "Annoncer la prochaine mission"
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'GIE-Staff by Morbakos',
            icon_url: bot.user.avatarURL(),
        },
    };

    message.channel.send({ embed: embedReponse });
};

function mission(message) {

    // Split message 
    var content = message.content.substring(("#mission ".length)).split(',');

    if (content.length != 6) {
        message.author.send('Il manque des informations pour la mission, la commande est la suivante:\n`#mission nomDeLaMission, nombreDeJoueurs, typeDeMort, camo, stuffIntegre, lienGDoc`');
        return;
    }

    if (content[5].startsWith("<")) {
        content[5] = content[5].substring(1);
    }
    if (content[5].endsWith(">")) {
        content[5] = content[5].substring(0, (content[5].length - 1));
    }

    var elem = {
        nom: content[0].trim(),
        nbJoueurs: content[1].trim(),
        typeMort: content[2].trim(),
        camo: content[3].trim(),
        stuffIntegre: content[4].trim(),
        doc: content[5].trim()
    };
    var description = `Salut @everyone! Voici les infos sur la prochaine mission :slight_smile:`

    const embedReponse = {
        color: 0xEB4034,
        title: 'Mission',
        url: elem.doc,
        author: {
            name: 'GIE',
            icon_url: bot.user.avatarURL(),
            url: 'https://gie.polygames.net',
        },
        description: description,
        thumbnail: {
            url: bot.user.avatarURL(),
        },
        fields: [
            {
                name: 'Nom',
                value: elem.nom,
                inline: true
            },
            {
                name: 'Nombre de joueurs',
                value: elem.nbJoueurs,
                inline: true
            },
            {
                name: 'Type de mort',
                value: elem.typeMort,
                inline: true
            },
            {
                name: 'Camouflage',
                value: elem.camo,
                inline: true
            },
            {
                name: 'Stuff intégré',
                value: elem.stuffIntegre,
                inline: true
            },
            {
                name: 'GDoc',
                value: "[" + elem.nom + "](" + elem.doc + ")",
                inline: true
            },
            {
                name: 'Un soucis ?',
                value: "N'hésites pas à demander de l'aide dans les channels appropriés, les membres et les staffs t'aideront du mieux qu'ils le peuvent :yum:"
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'GIE-Staff by Morbakos',
            icon_url: bot.user.avatarURL(),
        },
    };
    message.channel.send('@everyone');
    message.channel.send({ embed: embedReponse });
}

function changelog(content) {

    const embedReponse = {
        color: 0xEB4034,
        title: 'Mise à jour du modset GIE prenant effet immédiatement :slight_smile:',
        url: 'https://sites.google.com/view/mmgie/accueil',
        author: {
            name: 'GIE',
            icon_url: bot.user.avatarURL(),
            url: 'https://gie.polygames.net',
        },
        thumbnail: {
            url: bot.user.avatarURL(),
        },
        fields: [
            {
                name: ':large_orange_diamond: Mise à jour',
                value: "La quasi totalité de nos mods ont été mis à jours, la liste serait trop longue pour les citer. Cependant, dans les mods notable, nous avons @ace (qui est maintenant avec la version refaite du médical)"
            },
            {
                name: ':no_entry_sign: Suppression',
                value: "- ADV - Splint\n- ADV - CPR"
            },
            {
                name: ':white_circle: Inchangés',
                value: "- 7.Event\n- 8.Interco\n- 9. Test"
            },
            {
                name: 'Poids',
                value: "La mise à jour fait environ 38 Go"
            },
            {
                name: ':warning: **ATTENTION** :warning:',
                value: "La totalité des mods ayant été renommés afin d'améliorer le suivis, vous avez 2 options:\n- 1) Tout retélécharger\n- 2) Renommer les mods à l'identiques que sur ArmASync, de manière à n'avoir que les fichiers modifiés à télécharger."
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'GIE-Staff by Morbakos',
            icon_url: bot.user.avatarURL(),
        },
    };

    content.channel.send("@everyone");
    content.channel.send({ embed: embedReponse });

}

function missionMaking(content) {

    var description = `Salut ${content.author.username}! Voici les infos sur les infos pour le Mission Making :slight_smile:`

    const embedReponse = {
        color: 0xEB4034,
        title: 'Le Mission Making au GIE',
        url: 'https://sites.google.com/view/mmgie/accueil',
        author: {
            name: 'GIE',
            icon_url: bot.user.avatarURL(),
            url: 'https://gie.polygames.net',
        },
        description: description,
        thumbnail: {
            url: bot.user.avatarURL(),
        },
        fields: [
            {
                name: 'Ressources',
                value: "Un grand merci à Pipper et aux personnes qui ont contribuer à créer toutes ces ressource :smile:\nhttps://sites.google.com/view/mmgie/accueil"
            },
            {
                name: 'Un soucis ?',
                value: "N'hésites pas à demander de l'aide dans les channels appropriés, les membres et les staffs t'aideront du mieux qu'ils le peuvent :yum:"
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'GIE-Staff by Morbakos',
            icon_url: bot.user.avatarURL(),
        },
    };

    content.channel.send({ embed: embedReponse });

}

function serveur(content) {

    var description = `Salut ${content.author.username}! Voici les infos sur le(s) serveur(s) GIE :slight_smile:`

    const embedReponse = {
        color: 0xEB4034,
        title: 'Serveur(s) du GIE',
        url: 'https://gie.polygames.net/',
        author: {
            name: 'GIE',
            icon_url: bot.user.avatarURL(),
            url: 'https://gie.polygames.net',
        },
        description: description,
        thumbnail: {
            url: bot.user.avatarURL(),
        },
        fields: [
            {
                name: 'Serveur Milsim',
                value: "https://gie.polygames.net/serveur-milsim/rules"
            },
            {
                name: "ip",
                value: "serveur02.team-gie.com",
                inline: true
            },
            {
                name: "port",
                value: "2302",
                inline: true
            },
            {
                name: "modset",
                value: "GIE-base",
                inline: true
            },
            {
                name: "Nouveau joueur ?",
                value: "Tu peux aller jeter un oeil à nos formations ici: https://gie.polygames.net/fiches-connaissances/formations"
            },
            {
                name: 'Un soucis avec le serveur ?',
                value: "N'hésites pas à demander de l'aide dans les channels appropriés, les membres et les staffs t'aideront du mieux qu'ils le peuvent :yum:"
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'GIE-Staff by Morbakos',
            icon_url: bot.user.avatarURL(),
        },
    };

    content.channel.send({ embed: embedReponse });

}

function modset(content) {

    var description = `Salut ${content.author.username}! Voici les infos sur le modset GIE :slight_smile:`

    const embedReponse = {
        color: 0xEB4034,
        title: 'Modset du GIE',
        url: 'https://gie.polygames.net/serveur-milsim/modset-a3s',
        author: {
            name: 'GIE',
            icon_url: bot.user.avatarURL(),
            url: 'https://gie.polygames.net',
        },
        description: description,
        thumbnail: {
            url: bot.user.avatarURL(),
        },
        fields: [
            {
                name: 'Comment installer les mods ?',
                value: "Grâce à Pipper, on a un joli tuto :slight_smile:\nhttps://gie.polygames.net/serveur-milsim/modset-a3s"
            },
            {
                name: 'Comment vérifier que mes mods sont à jours ?',
                value: 'Pas de panique, ArmA Sync se charge de tout :slight_smile:'
            },
            {
                name: 'Un soucis avec le modset ?',
                value: "N'hésites pas à demander de l'aide dans les channels appropriés, les membres et les staffs t'aideront du mieux qu'ils le peuvent :yum:"
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'GIE-Staff by Morbakos',
            icon_url: bot.user.avatarURL(),
        },
    };

    content.channel.send({ embed: embedReponse });

}

function hm(message) {
    const member = bot.guilds.cache.get(message.guild.id).members.cache.find(u => u.id == message.author.id);
    const role = message.guild.roles.cache.find(r => r.id == 847172972359581717);

    member.roles.add(role)
        .then(console.log(`Role H&M added to ${message.author.username}`))
        .catch(console.error);
}