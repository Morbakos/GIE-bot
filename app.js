require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', function() {
    console.log(`Connecté en tant que ${bot.user.tag}`);
    bot.user.setActivity('le GIE', {type: 'WATCHING'});
});

bot.on('message', content => {

    var cmd = content.content.split(' ')[0];

    switch (cmd) {
        case '%modset':
            modset(content);
            break;

        case '%mm':
            missionMaking(content);
            break;        

        case '%serveur':
            serveur(content);
            break;

        case '%changelog':
            changelog(content);
            break;

        default:
            break;
    }
});

function changelog(content) {

    const embedReponse = {
        color: 0xEB4034,
        title: 'Mise à jour du modset GIE :slight_smile:',
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
                name: ':white_check_mark: Ajout',
                value: "- Project Opfor"
            },
            {
                name: ':large_orange_diamond: Mise à jour',
                value: "- RHS AFRF\n- RHS USAF\n"
            },
            {
                name: ':no_entry_sign: Suppression',
                value: "- SMA (adios :slight_smile:)\n-VSM (parce qu'on a mieux :yum:)"
            },
            {
                name: ':white_circle: Inchangés',
                value: "- 7.Event\n- 8.Interco"
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
    
    // content.channel.send("@everyone");
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