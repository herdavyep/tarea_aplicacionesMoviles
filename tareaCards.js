var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¡Hola!');
        session.endDialog();
        session.beginDialog('/menu');
    }
]);

bot.dialog('/menu', [
    
    function (session, results, next) {
        builder.Prompts.choice(session, 'Vamos a ver diferentes formas de implementar tarjetas en un bot, escoge una opcion', 'animationCard|audioCard|heroCard|thumbnailCard|receiptCard|signInCard|videoCard|Ninguna', {listStyle: builder.ListStyle.button});
    },
    function (session, results) {
        session.conversationData.eleccion = results.response.entity;
        switch (session.conversationData.eleccion) {
            case 'animationCard':
            session.beginDialog('/animation');
            break;

            case 'audioCard':
            session.beginDialog('/audio');
            break;

            case 'heroCard':
            session.beginDialog('/hero');
            break;

            case 'thumbnailCard':
            session.beginDialog('/thumbnail');
            break;
            
            case 'receiptCard':
            session.beginDialog('/receipt');
            break;
                        
            case 'signInCard':
            session.beginDialog('/signin');
            break;
                        
            case 'videoCard':
            session.beginDialog('/video');
            break;  
                                    
            case 'Ninguna':
            session.endDialog('¡Adios!');
            break;               
        
            default:
                break;
        }
    },
    function (session, results) {
        builder.Prompts.choice(session, '¿escoger otra opcion?', 'Si|No', {listStyle: builder.ListStyle.button});
    },
    function (session, results) {
        session.conversationData.SioNo = results.response.entity;
        
        switch (session.conversationData.SioNo) {
            case 'Si':
            session.beginDialog('/menu');
            break;

            case 'No':
            session.endConversation('¡Hasta luego!');
            break;

            default:
                break;
        }
    }
]);

bot.dialog('/animation', [
    function (session) {
        var animationCard = new builder.AnimationCard(session)
        .title('Bart Simpson')
        .subtitle('Animation Card')
        .image(builder.CardImage.create(session))
        .media([
            { url: 'https://media.giphy.com/media/b9KYjaHZeG4Cc/giphy.gif' }
        ]);
        
    var msj = new builder.Message(session).addAttachment(animationCard);
    session.send(msj);
    session.endDialog();

    }
]);

bot.dialog('/audio', [
    function (session) {
        var audioCard = new builder.AudioCard(session)
        .title('El rey de la selva')
        .subtitle('Rugido del leon')
        .text('grrrrr wwwrrrrr')
        .image(builder.CardImage.create(session, 'http://www.que.es/archivos/201303/leon_msn-640x640x80.jpg'))
        .media([
            { url: 'http://resumbrae.com/ub/dms423_f04/22/lion.wav' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.gifmania.com/Gif-Animados-Animales/Imagenes-Mamiferos/Leones/Leon-Rugiendo-Negro-67980.gif', 'Ver mas')
        ]);
        
    var msj = new builder.Message(session).addAttachment(audioCard);
    session.send(msj);
    session.endDialog();

    }
]);

bot.dialog('/hero', [
    function (session) {
        var heroCard = new builder.HeroCard(session)
            .title('Superman')
            .subtitle('El Hombre de Acero')
            .text('todo lo relacionado con este gran super heroe')
            .images([
                builder.CardImage.create(session, 'https://vignette.wikia.nocookie.net/superman/images/b/b1/Superman_Action_976_Gary_Frank.png/revision/latest/scale-to-width-down/288?cb=20170501140424')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://es.wikipedia.org/wiki/Superman', 'Ir wikipedia')
            ]);

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(heroCard);
        session.send(msj);
        session.endDialog();

    }
]);

bot.dialog('/thumbnail', [
    function (session) {
        var thumbnailCard = new builder.ThumbnailCard(session)
        .title('Soluciones Inmobiliarias G y Asociados')
        .subtitle('Con nosostros su patrimonio esta en las mejores manos')
        .text('gestionamos y asesoramos a los propietarios de bienes inmuebles y compradores, para solucionar sus necesidades. Contamos con el mejor plan de comercialización y gran variedad de propiedades para ofrecer a nuestros clientes.')
        .images([
            builder.CardImage.create(session, 'https://firebasestorage.googleapis.com/v0/b/crash-b6b47.appspot.com/o/logodispositivomovil.png?alt=media&token=905c5a07-1c6a-483e-8523-ec37102445ce')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://solucionesinmobiliariasgyasociados.com/', 'Vamos alla ')
        ]);


        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(thumbnailCard);
        session.send(msj);
        session.endDialog();

    }
]);

bot.dialog('/receipt', [
    function (session) {
        var receiptCard = new builder.ReceiptCard(session)
        .title('Juan Manuel Santos')
        .facts([
            builder.Fact.create(session, '1990', 'Factura Nº'),
            builder.Fact.create(session, '$ 100.000', 'Efectivo')
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 38.450', 'Sub de Atun de 30cm')
                .quantity(368)
                .image(builder.CardImage.create(session, 'https://fortunedotcom.files.wordpress.com/2016/02/subway-rotisserie-style-chicken-footlong.jpg')),
            builder.ReceiptItem.create(session, '$ 4.500', 'Gaseosa de 500ml')
                .quantity(720)
                .image(builder.CardImage.create(session, 'http://orig14.deviantart.net/506f/f/2009/242/0/4/fast_food___coca_cola_by_helmuc.jpg'))
        ])
        .tax('$ 7.500')
        .total('$ 40.950')
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.subwaycolombia.com/esp/', 'mas en subway.com')
                .image('https://www.visafranchise.com/wp-content/uploads/2017/05/Subway_Logo_OG.png')
        ]);


        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(receiptCard);
        session.send(msj);
        session.endDialog();

    }
]);

bot.dialog('/signin', [
    function (session) {
        var signInCard = new builder.SigninCard(session)
        .text('Crea una cuenta en bitbucket')
        .button('Crer Cuenta', 'https://bitbucket.org/account/signup/');
    
        
        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(signInCard);
        session.send(msj);
        session.endDialog();
        
        
       

    }
    
   
]);

bot.dialog('/video', [
    function (session) {
        var videoCard = new builder.VideoCard(session)
        .title('Dragon Ball Super')
        .subtitle('Capitulo 113')
        .text(' Goku pelea con las guerreras sayayin.')
        .image(builder.CardImage.create(session, 'http://dragonball.sullca.com/wp-content/uploads/2015/07/Dragon-Ball-Super-online.jpg'))
        .media([
            { url: 'https://firebasestorage.googleapis.com/v0/b/crash-b6b47.appspot.com/o/Dragon%20ball%20super%20avance%20capitulo%20113%20completo.mp4?alt=media&token=41eb2918-dcc3-47bc-a23e-690f8600c312' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.animeyt.tv/', 'ver mas en animeyt.tv')
        ]);


        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(videoCard);
        session.send(msj);
        session.endDialog();

    }
]);