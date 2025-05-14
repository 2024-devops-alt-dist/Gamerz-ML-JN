import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendValidationEmail = async (email: string, username: string): Promise<void> => {
    try {
        const mailOptions = {
            from: `"Support Gamerz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎮 Votre compte a été approuvé ✅",
            text: `🎉🔥 YOLOOO ${username} ! 🔥🎉

                🚀 ALERTE GAMING ULTIME ! 🚀

                ✨ Bonne nouvelle ! Ton compte sur Gamerz a été validé avec succès ! 🎮🎊

                Tu peux maintenant te connecter et dominer le game avec la commu' ! 💪😎

                💾 Inventaire débloqué :
                ✅ Accès aux discussions 💬
                ✅ Partage de tes exploits 🏆
                ✅ Ragequit autorisé* (avec modération) 🎤💥

                🎮 Que la hype soit avec toi ! 🎮

                À très vite,
                L'équipe Gamerz ⚡👾

                PS : 🐱 La Bise au Chat (et aux gamers !) 🎮🐾`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #1e1e1e; color: #ffffff; padding: 20px; text-align: center;">
                <div style="max-width: 600px; margin: auto; background-color: #2a2a2a; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);">
                <h1 style="color: #ff6600; font-size: 28px; margin-bottom: 10px;">🎉🔥 YOLOOO ${username} ! 🔥🎉</h1>
                <h2 style="color: #007bff; font-size: 22px; margin-bottom: 15px;">🚀 ALERTE GAMING ULTIME ! 🚀</h2>

                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                    ✨ <strong>Bonne nouvelle !</strong> Ton compte sur <strong>Gamerz</strong> a été
                    <span style="color: #00ff00; font-weight: bold;">validé avec succès</span> ! 🎮🎊
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                    Tu peux maintenant te connecter et <strong>dominer le game</strong> avec la commu' ! 💪😎
                </p>

                <div style="background-color: #333333; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #ffcc00; margin-bottom: 10px;">💾 Inventaire débloqué :</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 10px 0; font-size: 16px;">✅ Accès aux discussions 💬</li>
                        <li style="margin: 10px 0; font-size: 16px;">✅ Partage de tes exploits 🏆</li>
                        <li style="margin: 10px 0; font-size: 16px;">✅ Ragequit autorisé* (avec modération) 🎤💥</li>
                    </ul>
                </div>

                <h2 style="color: #ffcc00; font-size: 22px;">🎮 Que la hype soit avec toi ! 🎮</h2>

                <p style="margin: 15px 0; font-size: 16px;">À très vite,</p>
                <p style="font-size: 18px; font-weight: bold; color: #ff6600;">L'équipe Gamerz ⚡👾</p>

                <p style="font-size: 14px; color: #aaaaaa; margin-top: 20px;">
                    PS : 🐱 La Bise au Chat (et aux gamers !) 🎮🐾
                </p>
                </div>
                </div>`,
        };

        await emailTransporter.sendMail(mailOptions);
        console.log(`✅ Email de validation envoyé à ${email}`);
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
    }
};

export const sendAdminNotificationOnRegister = async (userEmail: string, username: string): Promise<void> => {
    try {
        const mailOptions = {
            from: `"Gamerz Alert" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `🆕 Nouvel utilisateur en attente : ${username}`,
            text: `Un nouvel utilisateur s'est inscrit sur Gamerz !

Nom d'utilisateur : ${username}
Email : ${userEmail}

Connecte-toi pour le valider.`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff; padding: 30px;">
                    <div style="max-width: 600px; margin: auto; background-color: #1a1a1a; border-radius: 12px; padding: 25px; box-shadow: 0 0 20px #ff6600;">
                        <h1 style="color: #ff6600; text-align: center; font-size: 28px;">⚠️ ALERTE GAMING MAXIMALE ⚠️</h1>
                        <h2 style="color: #00ffff; text-align: center; font-size: 22px;">Un nouveau challenger approche ! 🎮</h2>

                        <div style="margin-top: 20px; padding: 15px; background-color: #262626; border-radius: 8px;">
                            <p style="font-size: 16px;"><strong>👤 Nom d'utilisateur :</strong> <span style="color: #ffcc00;">${username}</span></p>
                            <p style="font-size: 16px;"><strong>📧 Email :</strong> <span style="color: #ffcc00;">${userEmail}</span></p>
                        </div>

                        <div style="margin-top: 20px;">
                            <p style="font-size: 16px; line-height: 1.6;">
                                Ce gamer légendaire vient tout juste de s'inscrire sur <strong>Gamerz</strong> et attend d'être <span style="color: #00ff00;">validé par l'élite administrative</span> 🛡️
                            </p>
                            <p style="font-size: 16px; line-height: 1.6;">
                                Prépare les confettis, les emotes, et un bon vieux GG pour accueillir ce nouveau joueur dans la team 🔥
                            </p>
                        </div>

                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #333;" />

                        <p style="text-align: center; font-size: 14px; color: #888;">🎯 Mission : Aller dans l'admin, checker le compte, et décider du destin de ${username}.</p>
                        <p style="text-align: center; font-size: 12px; color: #555; margin-top: 10px;">Gamerz HQ © - Powered by passion and pixel dust</p>
                    </div>
                </div>
            `,
        };
        await emailTransporter.sendMail(mailOptions);
        console.log(`📧 Alerte admin envoyée pour ${userEmail}`);
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'alerte admin :", error);
    }
};