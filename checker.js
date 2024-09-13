const Imap = require('imap');
const { simpleParser } = require('mailparser');

function loginToHotmail(email_address = "annamariaromero@hotmail.com", password = "Teresa48!") {
    return new Promise((resolve, reject) => {
        const imap = new Imap({
            user: email_address,
            password: password,
            host: 'imap-mail.outlook.com',
            port: 993,
            tls: true
        });

        imap.once('ready', function () {
            imap.openBox('INBOX', true, function (err, box) {
                if (err) throw err;

                const fetch = imap.seq.fetch(box.messages.total + ':*', {
                    bodies: '',
                    markSeen: false
                });

                fetch.on('message', function (msg) {
                    msg.on('body', function (stream) {
                        simpleParser(stream, (err, parsed) => {
                            if (err) throw err;
                            console.log("Success Login")
                        });
                    });
                });

                fetch.once('end', function () {
                    imap.end();
                    reject('Verification code not found');
                });
            });
        });

        imap.once('error', function (err) {
            reject(err);
        });

        imap.connect();
    });
}
